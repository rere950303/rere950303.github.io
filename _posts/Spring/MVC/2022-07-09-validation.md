---
title: "[Spring][MVC] Validation"
last\_modified\_at: 2022-07-09T 9:37 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/MVC
tags:
  - Validation
---
## 들어가며
검증기를 추가하는 과정을 기록하기 위한 포스팅

## 고민하게 된 계기
- `spring-boot-starter-validation` 의존성을 추가하게 되면 `LocalValidatorFactoryBean`(`SpringValidatorAdapter` 상속)을 `DataBinder`의 `validators`에 추가해 준다.
- `RequestMappingHandlerAdapter`에서 `RequestResponseBodyMethodProcessor`(`HandlerMethodArgumentResolver` 구현체)를 이용하여 핸들러의 매개변수를 만들고 `DataBinder`에 등록된 검증기로 검증을 시도하게 된다.
- 단순한 검증의 경우 `javax.validation.ConstraintValidator`를 구현하여 자신만의 검증 어노테이션을 만들 수 있다.
- 하지만 애플리케이션 로직이 필요한 검증의 경우 어떻게 설계하면 좋을지에 대해 고민을 하게 되었다.

## Bean Validation 커스텀하기
```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneValidator.class)
@Documented
public @interface Phone {

    String message() default "invalid Phone";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

```
```java
public class PhoneValidator implements ConstraintValidator<Phone, String> {

    private static final Pattern pattern = Pattern.compile("\\d{3}-\\d{4}-\\d{4}");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return pattern.matcher(value).matches();
    }
}
```
- `SpringValidatorAdapter` 어댑터는 `javax.validation.Validator`를 구현한 `org.hibernate.validator.internal.engine.ValidatorImpl`를 가지고 있다.
- 즉 Bean Validation 표준 인터페이스를 구현한 하이버네이트에 대한 어댑터 역할을 해준다.
- 여기서 어노테이션을 통한 검증이 이루어진다.

## 검증기 추가하기
```java
public class PasswordValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return ValidationDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationDTO dto = (ValidationDTO) target;

        if (!dto.getPassword().equals(dto.getPasswordConfirm())) {
            errors.reject("passwordMatch", "비밀번호가 일치하지 않습니다.");
        }
    }
}
```
```java
@RestController
public class ValidationController {

    ...

    @InitBinder
    public void init(WebDataBinder dataBinder) {
        dataBinder.addValidators(new PasswordValidator());
    }
}
```
- 위와 같이 설계하면 `HandlerMethodArgumentResolver`에서 `WebDataBinderFactory`는 총 2개의 검증기를 포함한 `WebDataBinder`를 생성하게 된다.
- 이후 해당 `WebDataBinder`로 `for`문을 돌면서 여러 개의 검증기를 통해 검증을 진행한다.
- 만약 검증에서 오류가 발생하면 `MethodArgumentNotValidException` 예외를 던진다.
- 핵심 로직은 다음과 같다.

```java
// RequestResponseBodyMethodProcessor (HandlerMethodArgumentResolver 구현체)
@Override
public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,
                              NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {

    parameter = parameter.nestedIfOptional();
    Object arg = readWithMessageConverters(webRequest, parameter, parameter.getNestedGenericParameterType());
    String name = Conventions.getVariableNameForParameter(parameter);

    if (binderFactory != null) {
        WebDataBinder binder = binderFactory.createBinder(webRequest, arg, name);
        if (arg != null) {
            validateIfApplicable(binder, parameter);
            if (binder.getBindingResult().hasErrors() && isBindExceptionRequired(binder, parameter)) {
                throw new MethodArgumentNotValidException(parameter, binder.getBindingResult());
            }
        }
        if (mavContainer != null) {
            mavContainer.addAttribute(BindingResult.MODEL_KEY_PREFIX + name, binder.getBindingResult());
        }
    }

    return adaptArgumentIfNecessary(arg, parameter);
}
```

## 테스트 코드
```java
class ValidationControllerTest {

    MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(new ValidationController())
                .setControllerAdvice(new ControllerAdvice())
                .alwaysDo(print())
                .build();
    }

    @Test
    public void validation_phoneNumFormatNotMatch() throws Exception {
        String json = getJson(ValidationDTO.builder().phoneNum("1234").password("123").passwordConfirm("123").build());

        mockMvc.perform(get("/validation")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void validation_passwordNotMatch() throws Exception {
        String json = getJson(ValidationDTO.builder().phoneNum("010-2815-2145").password("123").passwordConfirm("321").build());

        mockMvc.perform(get("/validation")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void validation_isOk() throws Exception {
        String json = getJson(ValidationDTO.builder().phoneNum("010-2815-2145").password("123").passwordConfirm("123").build());

        mockMvc.perform(get("/validation")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());
    }
}
```

## 고찰
- 위와 같은 방법으로 간단한 검증의 경우 Bean Validation을, 로직이 필요한 경우 새로운 검증기 등록으로 해결할 수 있다.
- 이를 통해 서비스 계층에는 순수한 서비스 로직만 설계가 가능해지고 본격적인 서비스 로직이 시작되기 전, 즉 핸들러 호출전에 필요한 모든 검증을 진행함으로써 순수한 서비스 계층 유지가 가능해진다.