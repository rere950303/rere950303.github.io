---
title: "[Spring][Core] SpEL, AOP를 통한 메서드 시큐리티 구현"
last\_modified\_at: 2022-07-10T 6:09 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Core
tags:
  - SpEL
  - AOP
---
## 들어가며
SpEL 표현식과 AOP를 통한 메서드 시큐리티를 구현하는 과정을 기록하기 위한 포스팅

## 고민하게 된 계기
1. 기존에 직접 구현한 AOP 메서드 시큐리티의 경우 서로 다른 엔티티를 위해 여러 개의 `Advice`를 개발해야 한다는 단점이 존재했다.
2. 따라서 SpEL 표현식을 이용하여 추상화된 메서드 시큐리티로 조금 더 범용성을 갖는 설계를 고민하게 되었다.

## 접근 방법
- 엔티티의 수정, 삭제, 변경은 주인만 가능하다는 시나리오 상정
- 먼저 특정 엔티티의 `ownerId`와 현재 로그인한 `memberId`를 핸들러의 매개변수로 넘겨받는다. (이와 관련한 로직은 `ArgumentResolver`, `ResqusetParam`, `PathVariable` 등이 존재할 수 있다.)
- `ownerId`와 `memberId`를 비교하여 접근 가능 여부를 판단한다.

## SpEL 표현식
SpEL은 Spring Expression Language의 줄임말로 스프링의 객체들의 정보를 질의하거나 조작하여 어떤 값을 표현할 수 있는 강력한 표현 언어다. 객체들의 정보는 레퍼런스로 연관되어 있는 객체 그래프를 탐색하여 얻어지므로 런타임 때 SpEL의 표현식 값이 결정(Resolve)된다. 참고로 객체 그래프는 런타임 때 객체 간의 연관 관계를 통해 그려지는 그래프를 의미하는 말이다.
주로 `@Value` 어노테이션과 함께 프로퍼티 설정에 사용되거나 Spring Security에서 어노테이션 기반 메서드 시큐리티 등에 사용된다.

## 사용 코드
```java
@RestController
public class AuthorizeController {

    @GetMapping("/preauthorize1/{memberId}")
    @PreAuthorize("#entity1.id == #memberId")
    public String preAuthorize1(@RequestBody Entity1 entity1, @PathVariable Long memberId) {
        return "preAuthorize";
    }

    @GetMapping("/preauthorize2/{memberId}")
    @PreAuthorize("#entity2.id == #memberId")
    public String preAuthorize2(@RequestBody Entity2 entity2, @PathVariable Long memberId) {
        return "preAuthorize";
    }
}
```
- `@PreAuthorize` 어노테이션은 직접 커스텀 한 것이다.
- `#` 키워드를 통해 SpEL 표현식에 변수를 설정한다.

```java
@Slf4j
@Aspect
public class AccessCheckAspect {

    private static final ExpressionParser expressionParser = new SpelExpressionParser();

    @Before("@annotation(annotation)")
    public void preAuthorize(JoinPoint joinPoint, PreAuthorize annotation) {
        Expression expression = expressionParser.parseExpression(annotation.value());
        StandardEvaluationContext evaluationContext = getEvaluationContext(joinPoint, annotation.value());
        boolean canAccess = expression.getValue(evaluationContext, Boolean.class);

        if (!canAccess) {
            throw new AccessDeniedException();
        }
    }

    private StandardEvaluationContext getEvaluationContext(JoinPoint joinPoint, String SpELExpression) {
        StandardEvaluationContext evaluationContext = new StandardEvaluationContext();
        setVariables(evaluationContext, joinPoint, SpELExpression);

        return evaluationContext;
    }

    private void setVariables(StandardEvaluationContext evaluationContext, JoinPoint joinPoint, String SpELExpression) {
        String[] parameterNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames();
        Object[] args = joinPoint.getArgs();
        HashMap<String, Object> map = new HashMap<>();

        for (int i = 0; i < parameterNames.length; i++) {
            String parameterName = parameterNames[i];
            Object arg = args[i];

            if (!SpELExpression.contains(parameterName)) {
                throw new SpELExpressionException();
            }
            map.put(parameterName, arg);
        }

        evaluationContext.setVariables(map);
    }
}
```
- `@annotation` 기반 포인트컷을 설정한다. 어노테이션 값을 이용하여 SpEL 표현식을 넘겨준다.
- `JoinPoint`을 이용하여 메서드의 파라미터 이름과 인자 값을 `Map`으로 하여 `StandardEvaluationContext`의 변수를 설정한다.
- 이때 잘못된 SpEL 표현식을 사용한 경우 컴파일 오류가 아닌 런타임 오류가 발생하므로 안전한 개발을 위해 SpELExpression과 파라미터 이름을 비교하여 `SpELExpressionException`을 던지도록 설계한다.
- 표현식을 평가하여 `Boolean` 타입으로 결과를 받는다.

## 테스트 코드
```java
@SpringBootTest
@Import(AccessCheckAspect.class)
class AuthorizeControllerTest {

    MockMvc mockMvc;

    @Autowired
    AuthorizeController authorizeController;

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders
                .standaloneSetup(authorizeController)
                .setControllerAdvice(new ControllerAdvice())
                .alwaysDo(print())
                .build();
    }

    @Test
    public void preAuthorize1_isOk() throws Exception {
        String json = getJson(Entity1.builder().id(1L).build());

        mockMvc.perform(get("/preauthorize1/{memberId}", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void preAuthorize1_throwAccessDeniedException() throws Exception {
        String json = getJson(Entity1.builder().id(1L).build());

        mockMvc.perform(get("/preauthorize1/{memberId}", "2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(result -> assertThat(result.getResolvedException()).isInstanceOf(AccessDeniedException.class))
                .andExpect(status().isForbidden());
    }

    @Test
    public void preAuthorize2_isOK() throws Exception {
        String json = getJson(Entity2.builder().id(1L).build());

        mockMvc.perform(get("/preauthorize2/{memberId}", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void preAuthorize2_throwAccessDeniedException() throws Exception {
        String json = getJson(Entity2.builder().id(1L).build());

        mockMvc.perform(get("/preauthorize2/{memberId}", "2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(result -> assertThat(result.getResolvedException()).isInstanceOf(AccessDeniedException.class))
                .andExpect(status().isForbidden());
    }
}
```
- AOP를 적용하기 위해서는 빈 후처리기의 도움을 받아야 하므로 컨테이너를 활용하여 테스트를 진행한다.
- `AuthorizeController`를 직접 생성해서 `MockMvc`를 만들면 프록시 객체를 이용할 수 없으므로 `@Autowired`를 통해 `Advice`가 적용된 프록시 객체를 주입받는다.

## 고찰
- 그동안 아무 생각 없이 사용했던 `MethodSecurityInterceptor`를 직접 구현해 보면서 동작 과정을 익힐 수 있었다.
- SpEL 표현식 처음에는 낯설었지만 스프링 공식 문서를 통해 공부하면서 조금은 익숙해질 수 있었다.
- 위와 같은 방법 외 더 좋은 방법이 분명히 있을 것이다. 앞으로 개발을 하면서 개선사항이 발견되면 해당 사항을 업데이트할 예정이다.
