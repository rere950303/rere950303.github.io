---
title: "[Spring][MVC] SpringMVC-part2"
last\_modified\_at: 2021-09-28T 10:30 +09:00
header:
  overlay\_color: "#333"
MVC_1:
    - url: /assets/images/post/Spring/MVC/part2/1.png
      image_path: /assets/images/post/Spring/MVC/part2/1.png
    - url: /assets/images/post/Spring/MVC/part2/2.png
      image_path: /assets/images/post/Spring/MVC/part2/2.png
MVC_2:
    - url: /assets/images/post/Spring/MVC/part2/3.png
      image_path: /assets/images/post/Spring/MVC/part2/3.png
    - url: /assets/images/post/Spring/MVC/part2/4.png
      image_path: /assets/images/post/Spring/MVC/part2/4.png
    - url: /assets/images/post/Spring/MVC/part2/5.png
      image_path: /assets/images/post/Spring/MVC/part2/5.png
    - url: /assets/images/post/Spring/MVC/part2/6.png
      image_path: /assets/images/post/Spring/MVC/part2/6.png
MVC_3:
    - url: /assets/images/post/Spring/MVC/part2/7.png
      image_path: /assets/images/post/Spring/MVC/part2/7.png
MVC_4:
    - url: /assets/images/post/Spring/MVC/part2/8.png
      image_path: /assets/images/post/Spring/MVC/part2/8.png
MVC_5:
    - url: /assets/images/post/Spring/MVC/part2/9.png
      image_path: /assets/images/post/Spring/MVC/part2/9.png
categories:
  - Spring/MVC
tags:
  - MVC
  - Spring
---
## 들어가며 
해당 게시글은 인프런 김영한 강사님의 [스프링 MVC 2편 - 백엔드 웹 개발 활용 기술][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 메시지, 국제화
### 메시지, 국제화 소개
- 메시지: 여러 화면에 보이는 상품명, 가격, 수량 등 `label` 에 있는 단어를 변경하려면 다음 화면들을 다 찾아가면서 모두 변경해야 한다. 화면 수가 적으면 문제가 되지 않지만 화면이 수십개 이상이라면 수십개의 파일을 모두 고쳐야 한다. 왜냐하면 해당 HTML 파일에 메시지가 하드코딩 되어 있기 때문이다.
—\> 이런 다양한 메시지를 한 곳에서 관리하도록 하는 기능을 메시지 기능이라 한다.
`messages.properteis`


```yaml
item=상품 
item.id=상품 ID 
item.itemName=상품명 
item.price=가격 
item.quantity=수량
```

`addForm.html`
```html
<label for="itemName" th:text="#{item.itemName}"></label>
```

`editForm.html`
```html
<label for="itemName" th:text="#{item.itemName}"></label>
```
- 국제화: 메시지에서 설명한 메시지 파일( `messages.properteis` )을 각 나라별로 별도로 관리하면 서비스를 국제화 할 수 있다.
—\> `messages_en.propertis`, `messages_ko.propertis` 와 같이 영어를 사용하는 사람이면 `messages_en.propertis` 를 사용하고, 한국어를 사용하는 사람이면 `messages_ko.propertis` 를 사용하게 개발하면 된다. 한국에서 접근한 것인지 영어에서 접근한 것인지는 인식하는 방법은 HTTP `accept-language` 해더 값을
사용하거나 사용자가 직접 언어를 선택하도록 하고, 쿠키 등을 사용해서 처리하면 된다.

### 스프링 메시지 소스 설정
- 메시지 관리 기능을 사용하려면 스프링이 제공하는 `MessageSource` 를 스프링 빈으로 등록하면 되는데, `MessageSource` 는 인터페이스이다. 따라서 구현체인 `ResourceBundleMessageSource` 를 스프링 빈으로 등록하면 된다.


```java
@Bean
public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasenames("messages", "errors");
    messageSource.setDefaultEncoding("utf-8");
    return messageSource;
}
```
- `basenames` : 설정 파일의 이름을 지정한다.
	- `messages` 로 지정하면 `messages.properties` 파일을 읽어서 사용한다.
	- 파일의 위치는 `/resources/messages.properties` 에 두면 된다.
	- 여러 파일을 한번에 지정할 수 있다. 여기서는 `messages` , `errors` 둘을 지정했다.
- 스프링 부트를 사용하면 스프링 부트가 `MessageSource` 를 자동으로 스프링 빈으로 등록한다.
- 스프링 부트를 사용하면 다음과 같이 메시지 소스를 설정할 수 있다.


`application.properties`
```yaml
spring.messages.basename=messages,config.i18n.messages
```
- `MessageSource` 를 스프링 빈으로 등록하지 않고, 스프링 부트와 관련된 별도의 설정을 하지 않으면 `messages` 라는 이름으로 기본 등록된다. 따라서 `messages_en.properties` , `messages_ko.properties` , `messages.properties`(디폴트 )파일만 등록하면 자동으로 인식된다.

### 스프링 메시지 소스 사용
- `MessageSource` 인터페이스


```java
@Bean
public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasenames("messages", "errors");
    messageSource.setDefaultEncoding("utf-8");
    return messageSource;
}
```

```java
@SpringBootTest
public class MessageSourceTest {
    @Autowired
    MessageSource ms;

    @Test
    void helloMessage() {
        String result = ms.getMessage("hello", null, null);
        assertThat(result).isEqualTo("안녕");
    }
}
```
—\> 가장 단순한 테스트는 메시지 코드로 `hello` 를 입력하고 나머지 값은 `null` 을 입력했다. `locale` 정보가 없으면 `basename` 에서 설정한 기본 이름 메시지 파일을 조회한다. `basename` 으로 `messages` 를 지정 했으므로 `messages.properties` 파일에서 데이터 조회한다.

- 메시지가 없는 경우, 기본 메시지

```java
@Test
void notFoundMessageCode() {
    assertThatThrownBy(() -> ms.getMessage("no_code", null, null))
            .isInstanceOf(NoSuchMessageException.class);
}

@Test
void notFoundMessageCodeDefaultMessage() {
    String result = ms.getMessage("no_code", null, "기본 메시지", null);
    assertThat(result).isEqualTo("기본 메시지");
}
```
—\> 메시지가 없는 경우에는 `NoSuchMessageException` 이 발생한다.
메시지가 없어도 기본 메시지( `defaultMessage` )를 사용하면 기본 메시지가 반환된다.
- 매개변수 사용

```java
@Test
void argumentMessage() {
    String result = ms.getMessage("hello.name", new Object[]{"Spring"}, null);
    assertThat(result).isEqualTo("안녕 Spring");
}
```
—\> `hello.name=안녕 {0}` 에서 `Spring` 단어를 매개변수로 전달: `안녕 Spring`
- 국제화 파일 선택

```java
@Test
void enLang() {
    assertThat(ms.getMessage("hello", null, Locale.ENGLISH)).isEqualTo("hello");
}
```
—\> `ms.getMessage("hello", null, Locale.ENGLISH)` : `locale` 정보가 `Locale.ENGLISH` 이므로 `messages_en` 을 찾아서 사용

### 웹 애플리케이션에 메시지 적용하기
`messages.properties`
```yaml
label.item=상품 label.item.id=상품 ID label.item.itemName=상품명 label.item.price=가격 label.item.quantity=수량
page.items=상품 목록 page.item=상품 상세 page.addItem=상품 등록 page.updateItem=상품 수정  button.save=저장 button.cancel=취소
```

 타임리프 메시지 적용: 타임리프의 메시지 표현식 `#{...}` 를 사용하면 스프링의 메시지를 편리하게 조회할 수 있다. 예를 들어서 방금 등록한 상품이라는 이름을 조회하려면 `#{label.item}` 이라고 하면 된다.

렌더링 전
```html
<div th:text="#{label.item}"></h2>
```
렌더링 후
```html
<div>상품</h2>
```
- 페이지 이름에 적용

```html
<h2 th:text="#{page.addItem}">상품 등록</h2>
```
- 레이블에 적용

```html
<label for="itemName" th:text="#{label.item.itemName}">상품명</label>
```
- 버튼에 적용

```html
<button type="submit" th:text="#{button.save}">저장</button>
```
- 파라미터는 다음과 같이 사용할 수 있다.

```yaml
hello.name=안녕 {0}
```

```html
<p th:text="#{hello.name(${item.itemName})}"></p>
```


### 웹 애플리케이션에 국제화 적용하기
`messages_en.properties`
```yaml
label.item=Item
label.item=Item
label.item.id=Item ID
label.item.itemName=Item Name
label.item.price=price
label.item.quantity=quantity
page.items=Item List
page.item=Item Detai
page.addItem=Item Add
page.updateItem=Item Update
button.save=Save
button.cancel=Cancel
```
스프링도 `Locale` 정보를 알아야 언어를 선택할 수 있는데, 스프링은 언어 선택시 기본으로 `Accept-Language` 헤더의 값을 사용한다.

- `LocaleResolver`: 스프링은 `Locale` 선택 방식을 변경할 수 있도록 `LocaleResolver` 라는 인터페이스를 제공하는데, 스프링 부트는 기본으로 `Accept-Language` 를 활용하는 `AcceptHeaderLocaleResolver` 를 사용한다.

```java
public interface LocaleResolver {
    Locale resolveLocale(HttpServletRequest request);
    void setLocale(HttpServletRequest request, @Nullable HttpServletResponse response, @Nullable Locale locale);
}
```
—\> 만약 `Locale` 선택 방식을 변경하려면 `LocaleResolver` 의 구현체를 변경해서 쿠키나 세션 기반의 `Locale` 선택 기능을 사용할 수 있다. 예를 들어서 고객이 직접 `Locale` 을 선택하도록 하는 것이다.

## 검증1 - Validation
### 클라이언트 검증, 서버 검증
- 클라이언트 검증은 조작할 수 있으므로 보안에 취약하다.
- 서버만으로 검증하면, 즉각적인 고객 사용성이 부족해진다.
- 둘을 적절히 섞어서 사용하되, 최종적으로 서버 검증은 필수
- API 방식을 사용하면 API 스펙을 잘 정의해서 검증 오류를 API 응답 결과에 잘 남겨주어야 함
- 예를 들어 검증에 실패한 경우 고객에게 다시 상품 등록 폼을 보여주고, 어떤 값을 잘못 입력했는지 친절하게 알려주어야 한다.

### 검증 직접 처리 - 개발

```java
@PostMapping("/add")
public String addItem(@ModelAttribute Item item, RedirectAttributes redirectAttributes, Model model) {

    //검증 오루 결과를 보관
    Map<String, String> errors = new HashMap<>();

    //검증 로직
    if (!StringUtils.hasText(item.getItemName())) {
        errors.put("itemName", "상품 이름은 필수입니다.");
    }
    if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 10000000) {
        errors.put("price", "가격은 1000 ~ 1000000 까지 허용합니다.");
    }
    if (item.getQuantity() == null || item.getQuantity() > 9999) {
        errors.put("quantity", "수량은 최대 9999까지 허용합니다.");
    }

    //특정 필드가 아닌 복합 룰 검증
    if (item.getPrice() != null && item.getQuantity() != null) {
        int resultPrice = item.getPrice() * item.getQuantity();

        if (resultPrice < 10000) {
            errors.put("globalError", "가격 * 수량의 합은 10000원 이상이어야 합니다. 현재 값 = " + resultPrice);
        }
    }

    //검증에 실패하면 다시 입력 폼으로
    if (!errors.isEmpty()) {
        log.info("errors = {} ", errors);
        model.addAttribute("errors", errors);

        return "validation/v1/addForm";
    }

    //성공 로직
    ...
}
```

```html
<div th:if="${errors?.containsKey('globalError')}">
<p class="field-error" th:text="${errors['globalError']}">전체 오류 메시지</p>
</div>
```

```html
<input type="text" id="itemName" th:field="*{itemName}" th:class="${errors?.containsKey('itemName')} ? 'form-control field-error' : 'form-control'" class="form-control" placeholder="이름을 입력하세요">
```

- Safe Navigation Operator: `errors?.` 은 `errors` 가 `null` 일때 `NullPointerException` 이 발생하는 대신, `null` 을 반환하는 문법이다. `th:if` 에서 `null` 은 실패로 처리되므로 오류 메시지가 출력되지 않는다.
- 남은 문제점
	- 뷰 템플릿에서 중복 처리가 많다. 뭔가 비슷하다.
	- 타입 오류 처리가 안된다. `Item` 의 `price` , `quantity` 같은 숫자 필드는 타입이 `Integer` 이므로 문자 타입으로 설정하는 것이 불가능하다. 그런데 이러한 오류는 스프링MVC에서 컨트롤러에 진입하기도 전에 예외가 발생하기 때문에, 컨트롤러가 호출되지도 않고, 400 예외가 발생하면서 오류 페이지를 띄워준다.
	- 만약 컨트롤러가 호출된다고 가정해도 `Item` 의 `price` 는 `Integer` 이므로 문자를 보관할 수가 없다. 결국 고객이 입력한 값도 어딘가에 별도로 관리가 되어야 한다.

### BindingResult1(스프링이 제공하는 검증 오류 처리)

```java
@PostMapping("/add")
public String addItemV1(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {

    //검증 로직
    if (!StringUtils.hasText(item.getItemName())) {
        bindingResult.addError(new FieldError("item", "itemName", "상품 이름은 필수입니다."));
    }
    if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 10000000) {
        bindingResult.addError(new FieldError("item", "price", "가격은 1000 ~ 1000000 까지 허용합니다."));
    }
    if (item.getQuantity() == null || item.getQuantity() > 9999) {
        bindingResult.addError(new FieldError("item", "quantity", "수량은 최대 9999까지 허용합니다."));
    }

    //특정 필드가 아닌 복합 룰 검증
    if (item.getPrice() != null && item.getQuantity() != null) {
        int resultPrice = item.getPrice() * item.getQuantity();

        if (resultPrice < 10000) {
            bindingResult.addError(new ObjectError("item", "가격 * 수량의 합은 10000원 이상이어야 합니다. 현재 값 = " + resultPrice));
        }
    }

    //검증에 실패하면 다시 입력 폼으로
    if (bindingResult.hasErrors()) {
        log.info("errors = {} ", bindingResult);

        return "validation/v2/addForm";
    }

    //성공 로직
    ...
}
```
`BindingResult bindingResult` 파라미터의 위치는 `@ModelAttribute Item item` 다음에 와야 한다. `BindingResult` 는 `Model`에 자동으로 포함된다.
- FieldError 생성자 요약

```java
public FieldError(String objectName, String field, String defaultMessage) {}
```
- `objectName`: `@ModelAttribute` 이름
	- `field` : 오류가 발생한 필드 이름
	- `defaultMessage` : 오류 기본 메시지
- ObjectError 생성자 요약

```java
public ObjectError(String objectName, String defaultMessage) {}
```
- 특정 필드를 넘어서는 오류가 있으면 `ObjectError` 객체를 생성해서 `bindingResult` 에 담아두면 된다.
	- `objectName`: `@ModelAttribute` 의 이름
	- `defaultMessage`: 오류 기본 메시지
- 타임리프 스프링 검증 오류 통합 기능
	- 타임리프는 스프링의 `BindingResult` 를 활용해서 편리하게 검증 오류를 표현하는 기능을 제공한다.
	- `#fields`: `#fields` 로 `BindingResult` 가 제공하는 검증 오류에 접근할 수 있다.
	- `th:errors`: 해당 필드에 오류가 있는 경우에 태그를 출력한다. `th:if` 의 편의 버전이다.
	- `th:errorclass`: `th:field` 에서 지정한 필드에 오류가 있으면 `class` 정보를 추가한다.
- 글로벌 오류 처리

```html
<div th:if="${#fields.hasGlobalErrors()}">
      <p class="field-error" th:each="err : ${#fields.globalErrors()}" th:text="${err}">전체 오류 메시지</p> 
</div>
```
- 필드 오류 처리

```html
<input type="text" id="itemName" th:field="*{itemName}" th:errorclass="field-error" class="form-control" placeholder="이름을 입력하세요">
<div class="field-error" th:errors="*{itemName}">
상품명 오류
</div>
```


### BindingResult2
- `BindingResult` 가 있으면 `@ModelAttribute` 에 데이터 바인딩 시 오류가 발생해도 컨트롤러가 호출된다.
- BindingResult에 검증 오류를 적용하는 3가지 방법
	- @ModelAttribute 의 객체에 타입 오류 등으로 바인딩이 실패하는 경우 스프링이 FieldError 생성해서 BindingResult 에 넣어준다.
	- 개발자가 직접 넣어준다.
	- `Validator` 사용 -\> 이것은 뒤에서 설명

### FieldError, ObjectError(사용자가 입력한 오류값 유지)

```java
@PostMapping("/add")
public String addItemV2(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {

    //검증 로직
    if (!StringUtils.hasText(item.getItemName())) {
        bindingResult.addError(new FieldError("item", "itemName", item.getItemName(), false, null, null, "상품 이름은 필수입니다."));
    }
    if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 10000000) {
        bindingResult.addError(new FieldError("item", "price", item.getPrice(), false, null, null, "가격은 1000 ~ 1000000 까지 허용합니다."));
    }
    if (item.getQuantity() == null || item.getQuantity() > 9999) {
        bindingResult.addError(new FieldError("item", "quantity", item.getQuantity(), false, null, null, "수량은 최대 9999까지 허용합니다."));
    }

    //특정 필드가 아닌 복합 룰 검증
    if (item.getPrice() != null && item.getQuantity() != null) {
        int resultPrice = item.getPrice() * item.getQuantity();

        if (resultPrice < 10000) {
            bindingResult.addError(new ObjectError("item", null, null, "가격 * 수량의 합은 10000원 이상이어야 합니다. 현재 값 = " + resultPrice));
        }
    }

    //검증에 실패하면 다시 입력 폼으로
    if (bindingResult.hasErrors()) {
        log.info("errors = {} ", bindingResult);

        return "validation/v2/addForm";
    }

    //성공 로직
    ...
}
```

- `FieldError 생성자`(두 가지 생성자를 제공)

```java
public FieldError(String objectName, String field, String defaultMessage);

public FieldError(String objectName, String field, @Nullable Object
        rejectedValue, boolean bindingFailure, @Nullable String[] codes, @Nullable bject[] arguments, @Nullable String defaultMessage)
```
- `objectName`: 오류가 발생한 객체 이름
	- `field`: 오류 필드
	- `rejectedValue`: 사용자가 입력한 값(거절된 값)
	- `bindingFailure`: 타입 오류 같은 바인딩 실패인지, 검증 실패인지 구분 값
	- `codes`: 메시지 코드
	- `arguments`: 메시지에서 사용하는 인자
	- `defaultMessage`: 기본 오류 메시지
- 타임리프의 사용자 입력 값 유지: `th:field="*{price}"` 타임리프의 `th:field` 는 매우 똑똑하게 동작하는데, 정상 상황에는 모델 객체의 값을 사용하지만, 오류가 발생하면 `FieldError` 에서 보관한 값을 사용해서 값을 출력한다.

### 오류 코드와 메시지 처리1
`FieldError` , `ObjectError` 의 생성자는 `errorCode` , `arguments` 를 제공한다. 이것은 오류 발생시 오류 코드로 메시지를 찾기 위해 사용된다.
`application.properties`
```yaml
spring.messages.basename=messages,errors
```
`src/main/resources/errors.properties`
```yaml
required.item.itemName=상품 이름은 필수입니다. 
range.item.price=가격은 {0} ~ {1} 까지 허용합니다. 
max.item.quantity=수량은 최대 {0} 까지 허용합니다. 
totalPriceMin=가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}
```

`errors_en.properties`파일을 생성하면 오류 메시지도 국제화 처리를 할 수 있다.

```java
@PostMapping("/add")
public String addItemV3(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {

    log.info("objectName={}", bindingResult.getObjectName());
    log.info("target={}", bindingResult.getTarget());

    //검증 로직
    if (!StringUtils.hasText(item.getItemName())) {
        bindingResult.addError(new FieldError("item", "itemName", item.getItemName(), false, new String[]{"required.item.itemName"}, null, null));
    }
    if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 10000000) {
        bindingResult.addError(new FieldError("item", "price", item.getPrice(), false, new String[]{"range.item.price"}, new Object[]{1000, 1000000}, null));
    }
    if (item.getQuantity() == null || item.getQuantity() > 9999) {
        bindingResult.addError(new FieldError("item", "quantity", item.getQuantity(), false, new String[]{"max.item.quantity"}, new Object[]{9999}, null));
    }

    //특정 필드가 아닌 복합 룰 검증
    if (item.getPrice() != null && item.getQuantity() != null) {
        int resultPrice = item.getPrice() * item.getQuantity();

        if (resultPrice < 10000) {
            bindingResult.addError(new ObjectError("item", new String[]{"totalPriceMin"}, new Object[]{10000, resultPrice}, null));
        }
    }

    //검증에 실패하면 다시 입력 폼으로
    if (bindingResult.hasErrors()) {
        return "validation/v2/addForm";
    }

    //성공 로직
    ...
}
```
- `codes`: `required.item.itemName` 를 사용해서 메시지 코드를 지정한다. 메시지 코드는 하나가 아니라 배열로 여러 값을 전달할 수 있는데, 순서대로 매칭해서 처음 매칭되는 메시지가 사용된다.
- `arguments`: `Object[]{1000, 1000000}` 를 사용해서 코드의 `{0}` , `{1}` 로 치환할 값을 전달한다.

### 오류 코드와 메시지 처리2
 컨트롤러에서 `BindingResult` 는 검증해야 할 객체인 `target` 바로 다음에 온다. 따라서 `BindingResult` 는 이미 본인이 검증해야 할 객체인 `target` 을 알고 있다.
- `BindingResult` 가 제공하는 `rejectValue()` , `reject()` 를 사용하면 `FieldError` , `ObjectError` 를 직접 생성하지 않고, 깔끔하게 검증 오류를 다룰 수 있다.

```java
@PostMapping("/add")
public String addItemV4(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {

    log.info("objectName={}", bindingResult.getObjectName());
    log.info("target={}", bindingResult.getTarget());

    if (!StringUtils.hasText(item.getItemName())) {
        bindingResult.rejectValue("itemName", "required");
    }
    if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 10000000) {
        bindingResult.rejectValue("price", "range", new Object[]{1000, 1000000}, null);
    }
    if (item.getQuantity() == null || item.getQuantity() > 9999) {
        bindingResult.rejectValue("quantity", "max", new Object[]{9999}, null);
    }

    //특정 필드가 아닌 복합 룰 검증
    if (item.getPrice() != null && item.getQuantity() != null) {
        int resultPrice = item.getPrice() * item.getQuantity();

        if (resultPrice < 10000) {
            bindingResult.reject("totalPriceMin", new Object[]{10000, resultPrice}, null);
        }
    }

    //검증에 실패하면 다시 입력 폼으로
    if (bindingResult.hasErrors()) {
        return "validation/v2/addForm";
    }

    //성공 로직
    ...
}
```
- `rejectValue()`

```java
void rejectValue(@Nullable String field, String errorCode, @Nullable Object[] errorArgs, @Nullable String defaultMessage);
```
- `field` : 오류 필드명
	- `errorCode` : 오류 코드(이 오류 코드는 메시지에 등록된 코드가 아니다. 뒤에서 설명할 `messageResolver`를 위한 오류 코드이다.)
	- `errorArgs` : 오류 메시지에서 `{0}` 을 치환하기 위한 값
	- `defaultMessage` : 오류 메시지를 찾을 수 없을 때 사용하는 기본 메시지
- 축약된 오류 코드: `FieldError()` 를 직접 다룰 때는 오류 코드를 `range.item.price` 와 같이 모두 입력했다. 그런데 `rejectValue()` 를 사용하고 부터는 오류 코드를 `range` 로 간단하게 입력했다. 이 부분을 이해하려면 `MessageCodesResolver` 를 이해해야 한다.
- `reject()`

```java
void reject(String errorCode, @Nullable Object[] errorArgs, @Nullable String defaultMessage);
```

### 오류 코드와 메시지 처리3
단순하게 만들면 범용성이 좋아서 여러곳에서 사용할 수 있지만, 메시지를 세밀하게 작성하기 어렵다. 반대로 너무 자세하게 만들면 범용성이 떨어진다. 가장 좋은 방법은 범용성으로 사용하다가, 세밀하게 작성해야 하는 경우에는 세밀한 내용이 적용되도록 메시지에 단계를 두는 방법이다.

```yaml
#Level1
required.item.itemName: 상품 이름은 필수 입니다.
#Level2
required: 필수 값 입니다.
```
—\> 오류 메시지에 `required.item.itemName` 와 같이 객체명과 필드명을 조합한 세밀한 메시지 코드가 있으면 이 메시지를 높은 우선순위로 사용하는 것이다.

### 오류 코드와 메시지 처리4(`MessageCodesResolver`)

```java
public class MessageCodesResolverTest {

    MessageCodesResolver codesResolver = new DefaultMessageCodesResolver();

    @Test
    void messageCodesResolverObject() {
        String[] messageCodes = codesResolver.resolveMessageCodes("required", "item");
        assertThat(messageCodes).containsExactly("required.item", "required");
    }

    @Test
    void messageCodesResolverField() {
        String[] messageCodes = codesResolver.resolveMessageCodes("required", "item", "itemName", String.class);
        assertThat(messageCodes).containsExactly(
                "required.item.itemName",
                "required.itemName",
                "required.java.lang.String",
                "required"
        );
    }
}
```
- `MessageCodesResolver`
	- 검증 오류 코드로 메시지 코드들을 생성한다.
	- `MessageCodesResolver` 인터페이스이고 `DefaultMessageCodesResolver` 는 기본 구현체이다.
	- 주로 다음과 함께 사용 `ObjectError` , `FieldError`
- DefaultMessageCodesResolver의 기본 메시지 생성 규칙
  - 객체 오류

    ```yaml
    객체 오류의 경우 다음 순서로 2가지 생성 
    1.: code + "." + object name 
    2.: code
    예) 오류 코드: required, object name: item 
    1.: required.item
    2.: required
    ```
  - 필드 오류

    ```yaml
    필드 오류의 경우 다음 순서로4가지 메시지 코드 생성
    1.: code + "." + object name + "." + field
    2.: code + "." + field
    3.: code + "." + field type
    4.: code
    예) 오류 코드: typeMismatch, object name "user", field "age", field type: int 
    1. "typeMismatch.user.age"
    2. "typeMismatch.age"
    3. "typeMismatch.int"
    4. "typeMismatch"
    ```

- 동작 방식
	- `rejectValue()` , `reject()` 는 내부에서 `MessageCodesResolver` 를 사용한다. 여기에서 메시지 코드들을 생성한다.
	- `FieldError` , `ObjectError` 의 생성자를 보면, 오류 코드를 하나가 아니라 여러 오류 코드를 가질 수 있다. `MessageCodesResolver` 를 통해서 생성된 순서대로 오류 코드를 보관한다.
- 오류 메시지 출력: 타임리프 화면을 렌더링 할 때 `th:errors` 가 실행된다. 만약 이때 오류가 있다면 생성된 오류 메시지 코드를 순서대로 돌아가면서 메시지를 찾는다. 그리고 없으면 디폴트 메시지를 출력한다.

### 오류 코드와 메시지 처리5
- 검증 오류 코드는 다음과 같이 2가지로 나눌 수 있다.
	- 개발자가 직접 설정한 오류 코드 -\> `rejectValue()` 를 직접 호출
	- 스프링이 직접 검증 오류에 추가한 경우(주로 타입 정보가 맞지 않음)
- `price` 필드에 문자 `"A"`를 입력

```yaml
codes[typeMismatch.item.price,typeMismatch.price,typeMismatch.java.lang.Integer,typeMismatch]
```
- 아직 errors.properties 에 메시지 코드가 없기 때문에 스프링이 생성한 기본 메시지가 출력된다.
- `error.properties` 에 다음 내용을 추가

```yaml
typeMismatch.java.lang.Integer=숫자를 입력해주세요. typeMismatch=타입 오류입니다.
```

### Validator 분리1
컨트롤러에서 검증 로직이 차지하는 부분은 매우 크다. 이런 경우 별도의 클래스로 역할을 분리하는 것이 좋다. 그리고 이렇게 분리한 검증 로직을 재사용 할 수도 있다.

```java
@Component
public class ItemValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Item.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Item item = (Item) target;

        if (!StringUtils.hasText(item.getItemName())) {
            errors.rejectValue("itemName", "required");
        }
        if (item.getPrice() == null || item.getPrice() < 1000 || item.getPrice() > 10000000) {
            errors.rejectValue("price", "range", new Object[]{1000, 1000000}, null);
        }
        if (item.getQuantity() == null || item.getQuantity() > 9999) {
            errors.rejectValue("quantity", "max", new Object[]{9999}, null);
        }

        //특정 필드가 아닌 복합 룰 검증
        if (item.getPrice() != null && item.getQuantity() != null) {
            int resultPrice = item.getPrice() * item.getQuantity();

            if (resultPrice < 10000) {
                errors.reject("totalPriceMin", new Object[]{10000, resultPrice}, null);
            }
        }
    }
}
```

```java
@PostMapping("/add")
public String addItemV5(@ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {

    itemValidator.validate(item, bindingResult);

    //검증에 실패하면 다시 입력 폼으로
    if (bindingResult.hasErrors()) {
        return "validation/v2/addForm";
    }

    //성공 로직
    ...
}
```

### Validator 분리2
스프링이 `Validator` 인터페이스를 별도로 제공하는 이유는 체계적으로 검증 기능을 도입하기 위해서다. 그런데 앞에서는 검증기를 직접 불러서 사용했고, 이렇게 사용해도 된다. 그런데 `Validator` 인터페이스를 사용해서 검증기를 만들면 스프링의 추가적인 도움을 받을 수 있다.
- `WebDataBinder`를 통해서 사용하기: `WebDataBinder` 는 스프링의 파라미터 바인딩의 역할을 해주고 검증 기능도 내부에 포함한다.

```java
@InitBinder
public void init(WebDataBinder dataBinder) {
    log.info("init binder {}", dataBinder);
    dataBinder.addValidators(itemValidator);
}
```
- `@Validated` 적용

```java
@PostMapping("/add")
public String addItemV6(@Validated @ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {

    //검증에 실패하면 다시 입력 폼으로
    if (bindingResult.hasErrors()) {
        return "validation/v2/addForm";
    }

    //성공 로직
    ...
}
```
- 동작 방식: `@Validated` 는 검증기를 실행하라는 애노테이션이다. 이 애노테이션이 붙으면 앞서 `WebDataBinder` 에 등록한 검증기를 찾아서 실행한다. 그런데 여러 검증기를 등록한다면 그 중에 어떤 검증기가 실행되어야 할지 구분이 필요하다. 이때 `supports()` 가 사용된다. 여기서는 `supports(Item.class)` 호출되고, 결과가 `true` 이므로 `ItemValidator` 의 `validate()` 가 호출된다.
- 글로벌 설정 - 모든 컨트롤러에 다 적용

```java
@SpringBootApplication
public class ItemServiceApplication implements WebMvcConfigurer {
    public static void main(String[] args) {
        SpringApplication.run(ItemServiceApplication.class, args);
    }

    @Override
    public Validator getValidator() {
        return new ItemValidator();
    }
}
```

## 검증2 - Bean Validation
특히 특정 필드에 대한 검증 로직은 대부분 빈 값인지 아닌지, 특정 크기를 넘는지 아닌지와 같이 매우 일반적인 로직이다.
```java
public class Item {
    private Long id;
    @NotBlank
    private String itemName;
    @NotNull
    @Range(min = 1000, max = 1000000)
    private Integer price;
    @NotNull
    @Max(9999)
    private Integer quantity;
    //...
}
```
- `Bean Validation`: `Bean Validation`은 특정한 구현체가 아니라 Bean Validation 2.0(JSR-380)이라는 기술 표준이다. 쉽게 이야기해서 검증 애노테이션과 여러 인터페이스의 모음이다. 마치 JPA가 표준 기술이고 그 구현체로 하이버네이트가 있는 것과 같다. Bean Validation을 구현한 기술중에 일반적으로 사용하는 구현체는 하이버네이트 Validator이다. 이름이 하이버네이트가 붙어서 그렇지 ORM과는 관련이 없다.

### Bean Validation - 시작
`build.gradle`

```yaml
implementation 'org.springframework.boot:spring-boot-starter-validation'
```
- Jakarta Bean Validation
	- `jakarta.validation-api` : Bean Validation 인터페이스
	- `hibernate-validator` 구현체
    
```java
@Data
public class Item {
    private Long id;
    @NotBlank
    private String itemName;
    @NotNull
    @Range(min = 1000, max = 1000000)
    private Integer price;
    @NotNull
    @Max(9999)
    private Integer quantity;

    public Item() {
    }

    public Item(String itemName, Integer price, Integer quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
}
```
- 검증 애노테이션
	- `@NotBlank` : 빈값 + 공백만 있는 경우를 허용하지 않는다.
	- `@NotNull` : `null` 을 허용하지 않는다.
	- `@Range(min = 1000, max = 1000000)` : 범위 안의 값이어야 한다.
	- `@Max(9999)` : 최대 9999까지만 허용한다.
- `javax.validation` 으로 시작하면 특정 구현에 관계없이 제공되는 표준 인터페이스이고, `org.hibernate.validator` 로 시작하면 하이버네이트 `validator` 구현체를 사용할 때만 제공되는 검증 기능이다. 실무에서 대부분 하이버네이트 `validator`를 사용하므로 자유롭게 사용해도 된다.

```java
public class BeanValidationTest {
    @Test
    void beanValidation() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Item item = new Item();
        item.setItemName(" "); //공백
        item.setPrice(0);
        item.setQuantity(10000);
        Set<ConstraintViolation<Item>> violations = validator.validate(item);
        for (ConstraintViolation<Item> violation : violations) {
            System.out.println("violation=" + violation);
            System.out.println("violation.message=" + violation.getMessage());
        }
    }
}
```
- 검증기 생성

```java
ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
Validator validator = factory.getValidator();
```
- 검증 실행

```java
Set<ConstraintViolation<Item>> violations = validator.validate(item);
```

### Bean Validation - 스프링 적용

```java
@Slf4j
@Controller
@RequestMapping("/validation/v3/items")
@RequiredArgsConstructor
public class ValidationItemControllerV3 {
    private final ItemRepository itemRepository;

    @PostMapping("/add")
    public String addItem(@Validated @ModelAttribute Item item, BindingResult
            bindingResult, RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            log.info("errors={}", bindingResult);
            return "validation/v3/addForm";
        }
        //성공 로직
        ...
    }
}
```
- 스프링 부트가 `spring-boot-starter-validation` 라이브러리를 넣으면 자동으로 Bean Validator를 인지하고 스프링에 통합한다.
- `LocalValidatorFactoryBean` 을 글로벌 Validator로 등록한다. 이 Validator는 `@NotNull` 같은 애노테이션을 보고 검증을 수행한다. 이렇게 글로벌 Validator가 적용되어 있기 때문에, `@Valid` ,`@Validated` 만 적용하면 된다. 검증 오류가 발생하면, `FieldError` , `ObjectError` 를 생성해서 `BindingResult` 에 담아준다.
- 다음과 같이 직접 글로벌 Validator를 직접 등록하면 스프링 부트는 `Bean Validator`를 글로벌 Validator 로 등록하지 않는다. 따라서 애노테이션 기반의 빈 검증기가 동작하지 않는다.

```java
@SpringBootApplication
public class ItemServiceApplication implements WebMvcConfigurer {
    // 글로벌 검증기 추가
    @Override
    public Validator getValidator() {
        return new ItemValidator();
    }
    // ...
}
```
- 검증시 `@Validated` `@Valid` 둘다 사용가능하다. `javax.validation.@Valid` 를 사용하려면 `build.gradle` 의존관계 추가가 필요하다. (이전에 추가했다.) `@Validated`는 스프링 전용 검증 애노테이션이고, `@Valid`는 자바 표준 검증 애노테이션이다. 둘 중 아무거나 사용해도 동일하게 작동하지만, `@Validated` 는 내부에 groups 라는 기능을 포함하고 있다. 이 부분은 조금 뒤에 다시 설명하겠다.
- 검증 순서
	1. `@ModelAttribute` 각각의 필드에 타입 변환 시도
		1. 성공하면 다음으로
		2. 실패하면 `typeMismatch` 로 `FieldError` 추가
	2. `Validator` 적용(변환에 성공한 필드만 Bean Validation 적용)

### Bean Validation - 에러 코드
Bean Validation을 적용하고 `bindingResult` 에 등록된 검증 오류 코드를 보자. 오류 코드가 애노테이션 이름으로 등록된다. 마치 `typeMismatch` 와 유사하다. `NotBlank` 라는 오류 코드를 기반으로 `MessageCodesResolver` 를 통해 다양한 메시지 코드가 순서대로 생성된다.
- `@NotBlank`
	- NotBlank.item.itemName
	- NotBlank.itemName
	- NotBlank.java.lang.String
	- NotBlank
- @Range
	- Range.item.price
	- Range.price
	- Range.java.lang.Integer
	- Range

`errors.properties`

```yaml
NotBlank={0} 공백X 
Range={0}, {2} ~ {1} 허용 
Max={0}, 최대 {1}
```
{0} 은 필드명이고, {1} , {2} ...은 각 애노테이션 마다 다르다.
- BeanValidation 메시지 찾는 순서
	1. 생성된 메시지 코드 순서대로 `messageSource` 에서 메시지 찾기
	2. 애노테이션의 `message` 속성 사용 -\> `@NotBlank(message = "공백! {0}"`
	3. 라이브러리가 제공하는 기본 값 사용 -\> 공백일 수 없습니다.

### Bean Validation - 오브젝트 오류

```java
@Data
@ScriptAssert(lang = "javascript", script = "_this.price * _this.quantity >= 10000")
public class Item {
    //...
}
```
- 메시지 코드: `ScriptAssert.item`, `ScriptAssert`
- 그런데 실제 사용해보면 제약이 많고 복잡하다. 그리고 실무에서는 검증 기능이 해당 객체의 범위를 넘어서는 경우들도 종종 등장하는데, 그런 경우 대응이 어렵다.
- 따라서 오브젝트 오류(글로벌 오류)의 경우 `@ScriptAssert` 을 억지로 사용하는 것 보다는 다음과 같이 오브젝트 오류 관련 부분만 직접 자바 코드로 작성하는 것을 권장한다.

```java
@PostMapping("/add")
public String addItem(@Validated @ModelAttribute Item item, BindingResult bindingResult, RedirectAttributes redirectAttributes) {
    //특정 필드 예외가 아닌 전체 예외
    if (item.getPrice() != null && item.getQuantity() != null) {
        int resultPrice = item.getPrice() * item.getQuantity();
        if (resultPrice < 10000) {
            bindingResult.reject("totalPriceMin", new Object[]{10000,
                    resultPrice}, null);
        }
    }
    if (bindingResult.hasErrors()) {
        log.info("errors={}", bindingResult);
        return "validation/v3/addForm";
    }
    //성공 로직
    ...
}
```

### Bean Validation - 한계
- 수정 요구사항 적용: 수정시에는 `Item` 에서 `id` 값이 필수이고, `quantity` 도 무제한으로 적용할 수 있다.
- 결과적으로 `item` 은 등록과 수정에서 검증 조건의 충돌이 발생하고, 등록과 수정은 같은 BeanValidation 을 적용할 수 없다. 이 문제를 어떻게 해결할 수 있을까?

### Bean Validation - groups
동일한 모델 객체를 등록할 때와 수정할 때 각각 다르게 검증하는 방법을 알아보자.
- 방법 2가지
	- BeanValidation의 groups 기능을 사용한다.(groups를 사용하려면 `@Validated` 를 사용해야 한다.)
	- Item을 직접 사용하지 않고, ItemSaveForm, ItemUpdateForm 같은 폼 전송을 위한 별도의 모델 객체를 만들어서 사용한다.
- BeanValidation groups 기능 사용: 등록시에 검증할 기능과 수정시에 검증할 기능을 각각 그룹으로 나누어 적용할 수 있다.<br>

저장용 groups 생성

```java
package hello.itemservice.domain.item;

public interface SaveCheck {
}
```

수정용 groups 생성
```java
package hello.itemservice.domain.item;

public interface UpdateCheck {
}
```

```java
@Data
public class Item {
    @NotNull(groups = UpdateCheck.class) //수정시에만 적용 
    private Long id;
    @NotBlank(groups = {SaveCheck.class, UpdateCheck.class})
    private String itemName;
    @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
    @Range(min = 1000, max = 1000000, groups = {SaveCheck.class,
            UpdateCheck.class})
    private Integer price;

    @NotNull(groups = {SaveCheck.class, UpdateCheck.class})
    @Max(value = 9999, groups = SaveCheck.class) //등록시에만 적용 
    private Integer quantity;
    public Item() {
    }

    public Item(String itemName, Integer price, Integer quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
}
```

저장 로직에 SaveCheck Groups 적용
```java
@PostMapping("/add")
public String addItemV2(@Validated(SaveCheck.class) @ModelAttribute Item item,
                        BindingResult bindingResult, RedirectAttributes redirectAttributes) {
    //...
}
```

수정 로직에 UpdateCheck Groups 적용
```java
@PostMapping("/{itemId}/edit")
public String editV2(@PathVariable Long itemId, @Validated(UpdateCheck.class),
                     @ModelAttribute Item item, BindingResult bindingResult) {
    //...
}
```

### Form 전송 객체 분리
실무에서는 회원 등록시 회원과 관련된 데이터만 전달받는 것이 아니라, 약관 정보도 추가로 받는 등 `Item` 과 관계없는 수 많은 부가 데이터가 넘어온다. 그래서 보통 `Item` 을 직접 전달받는 것이 아니라, 복잡한 폼의 데이터를 컨트롤러까지 전달할 별도의 객체를 만들어서 전달한다. 예를 들면 `ItemSaveForm` 이라는 폼을 전달받는 전용 객체를 만들어서 `@ModelAttribute` 로 사용한다. 이것을 통해 컨트롤러에서 폼 데이터를 전달 받고, 이후 컨트롤러에서 필요한 데이터를 사용해서 `Item` 을 생성한다.

- ITEM 저장용 폼

```java
@Data
public class ItemUpdateForm {
    @NotNull
    private Long id;
    @NotBlank
    private String itemName;
    @NotNull
    @Range(min = 1000, max = 1000000)
    private Integer price;
    //수정에서는 수량은 자유롭게 변경할 수 있다. 
    private Integer quantity;
}
```
- ITEM 수정용 폼

```java
@Data
public class ItemUpdateForm {
    @NotNull
    private Long id;
    @NotBlank
    private String itemName;
    @NotNull
    @Range(min = 1000, max = 1000000)
    private Integer price;
    //수정에서는 수량은 자유롭게 변경할 수 있다. 
    private Integer quantity;
}
```
- 폼 객체 바인딩

```java
@PostMapping("/add")
public String addItem(@Validated @ModelAttribute("item") ItemSaveForm form,
                      BindingResult bindingResult, RedirectAttributes redirectAttributes) {...}

@PostMapping("/{itemId}/edit")
public String edit(@PathVariable Long itemId, @Validated,
                   @ModelAttribute("item") ItemUpdateForm form, BindingResult bindingResult) {...}
```

### Bean Validation - HTTP 메시지 컨버터
`@Valid` , `@Validated` 는 `HttpMessageConverter` ( `@RequestBody` )에도 적용할 수 있다. 
```java
@Slf4j
@RestController
@RequestMapping("/validation/api/items")
public class ValidationItemApiController {
    @PostMapping("/add")
    public Object addItem(@RequestBody @Validated ItemSaveForm form,
                          BindingResult bindingResult) {
        log.info("API 컨트롤러 호출");
        if (bindingResult.hasErrors()) {
            log.info("검증 오류 발생 errors={}", bindingResult);
            return bindingResult.getAllErrors();
        }
        log.info("성공 로직 실행");
        return form;
    }
}
```
- API의 경우 3가지 경우를 나누어 생각해야 한다.
	- 성공 요청: 성공
	- 실패 요청: JSON을 객체로 생성하는 것 자체가 실패함(컨트롤러 호출 X), 물론 Validator도 실행되지 않는다.
	- 검증 오류 요청: JSON을 객체로 생성하는 것은 성공했고, 검증에서 실패함
- `@ModelAttribute` vs `@RequestBody`: HTTP 요청 파리미터를 처리하는 `@ModelAttribute` 는 각각의 필드 단위로 세밀하게 적용된다. 그래서 특정 필드에 타입이 맞지 않는 오류가 발생해도 나머지 필드는 정상 처리할 수 있었다. `HttpMessageConverter` 는 `@ModelAttribute` 와 다르게 각각의 필드 단위로 적용되는 것이 아니라, 전체 객체 단위로 적용된다. 따라서 메시지 컨버터의 작동이 성공해서 `Item` 객체를 만들어야 `@Valid` , `@Validated` 가 적용된다.

## 로그인 처리1 - 쿠키, 세션
### 로그인 처리하기 - 쿠키 사용
- 서버에서 로그인에 성공하면 HTTP 응답에 쿠키를 담아서 브라우저에 전달하자. 그러면 브라우저는 앞으로 해당 쿠키를 지속해서 보내준다.
- 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지
- **세션 쿠키**: 만료 날짜를 생략하면 브라우저 종료시 까지만 유지

{% include gallery id="MVC_1" layout = "half"%}

LoginController - login()
```java
@PostMapping("/login")
public String login(@Valid @ModelAttribute LoginForm form, BindingResult
        bindingResult, HttpServletResponse response) {
    if (bindingResult.hasErrors()) {
        return "login/loginForm";
    }
    Member loginMember = loginService.login(form.getLoginId(),
            form.getPassword());
    log.info("login? {}", loginMember);
    if (loginMember == null) {
        bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
        return "login/loginForm";
    }
    //로그인 성공 처리
    //쿠키에 시간 정보를 주지 않으면 세션 쿠키(브라우저 종료시 모두 종료)
    Cookie idCookie = new Cookie("memberId",
            String.valueOf(loginMember.getId()));
    response.addCookie(idCookie);
    return "redirect:/";
}
```

홈 - 로그인 처리
```java
@GetMapping("/")
public String homeLogin(@CookieValue(name = "memberId", required = false) Long memberId, Model model) {
    if (memberId == null) {
        return "home";
    }
    //로그인
    Member loginMember = memberRepository.findById(memberId);
    if (loginMember == null) {
        return "home";
    }
    model.addAttribute("member", loginMember);
    return "loginHome";
}
```
- `@CookieValue` 를 사용하면 편리하게 쿠키를 조회할 수 있다.
- 로그인 하지 않은 사용자도 홈에 접근할 수 있기 때문에 `required = false` 를 사용한다.

### 로그아웃 기능
- 세션 쿠키이므로 웹 브라우저 종료시
- 서버에서 해당 쿠키의 종료 날짜를 0으로 지정

```java
@PostMapping("/logout")
public String logout(HttpServletResponse response) {
    expireCookie(response, "memberId");
    return "redirect:/";
}

private void expireCookie(HttpServletResponse response, String cookieName) {
    Cookie cookie = new Cookie(cookieName, null);
    cookie.setMaxAge(0);
    response.addCookie(cookie);
}
```

### 쿠키와 보안 문제
- 보안 문제
	- 클라이언트가 쿠키를 강제로 변경하면 다른 사용자가 된다.
	- `Cookie: memberId=1` -\> `Cookie: memberId=2` (다른 사용자의 이름이 보임)
	- 쿠키에 보관된 정보는 훔쳐갈 수 있다.
	- 해커가 쿠키를 한번 훔쳐가면 평생 사용할 수 있다.
- 대안
	- 쿠키에 중요한 값을 노출하지 않고, 사용자 별로 예측 불가능한 임의의 토큰(랜덤 값)을 노출하고, 서버에서 토큰과 사용자 id를 매핑해서 인식한다. 그리고 서버에서 토큰을 관리한다.
	- 해커가 토큰을 털어가도 시간이 지나면 사용할 수 없도록 서버에서 해당 토큰의 만료시간을 짧게(예: 30분) 유지한다. 또는 해킹이 의심되는 경우 서버에서 해당 토큰을 강제로 제거하면 된다.

### 로그인 처리하기 - 세션 동작 방식

{% include gallery id="MVC_2" layout = "half"%}

서버에 중요한 정보를 보관하고 연결을 유지하는 방법을 세션이라 한다.

- 클라이언트와 서버는 결국 쿠키로 연결이 되어야 한다.
	- 서버는 클라이언트에 `mySessionId` 라는 이름으로 세션ID 만 쿠키에 담아서 전달한다.
	- 클라이언트는 쿠키 저장소에 `mySessionId` 쿠키를 보관한다.
- 오직 추정 불가능한 세션 ID만 쿠키를 통해 클라이언트에 전달한다.
- 클라이언트는 요청시 항상 `mySessionId` 쿠키를 전달한다.
- 서버에서는 클라이언트가 전달한 `mySessionId` 쿠키 정보로 세션 저장소를 조회해서 로그인시 보관한 세션 정보를 사용한다.

### 로그인 처리하기 - 서블릿 HTTP 세션1
서블릿은 세션을 위해 `HttpSession` 이라는 기능을 제공한다.
- HttpSession 소개: 서블릿을 통해 `HttpSession` 을 생성하면 다음과 같은 쿠키를 생성한다. 쿠키 이름이 `JSESSIONID` 이고, 값은 추정 불가능한 랜덤 값이다.
`Cookie: JSESSIONID=5B78E23B513F50164D6FDD8C97B0AD05`

```java
public class SessionConst {
    public static final String LOGIN_MEMBER = "loginMember";
}
```

```java
@PostMapping("/login")
public String loginV3(@Valid @ModelAttribute LoginForm form, BindingResult
        bindingResult, HttpServletRequest request) {
    if (bindingResult.hasErrors()) {
        return "login/loginForm";
    }
    Member loginMember = loginService.login(form.getLoginId(),
            form.getPassword());
    log.info("login? {}", loginMember);
    if (loginMember == null) {
        bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
        return "login/loginForm";
    }
    //로그인 성공 처리
    //세션이 있으면 있는 세션 반환, 없으면 신규 세션 생성
    HttpSession session = request.getSession(); //세션에 로그인 회원 정보 보관
    session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
    return "redirect:/";
}
```
- `request.getSession(true)`: 세션이 있으면 기존 세션을 반환한다. 세션이 없으면 새로운 세션을 생성해서 반환한다.
- `request.getSession(false)`: 세션이 있으면 기존 세션을 반환한다. 세션이 없으면 새로운 세션을 생성하지 않는다. `null` 을 반환한다.

```java
@PostMapping("/logout")
public String logoutV3(HttpServletRequest request) {
    //세션을 삭제한다.
    HttpSession session = request.getSession(false);
    if (session != null) {
        session.invalidate();
    }
    return "redirect:/";
}
```

```java
@GetMapping("/")
public String homeLoginV3(HttpServletRequest request, Model model) {
    //세션이 없으면 home
    HttpSession session = request.getSession(false);
    if (session == null) {
        return "home";
    }
    Member loginMember = (Member)
            session.getAttribute(SessionConst.LOGIN_MEMBER);
    //세션에 회원 데이터가 없으면 home 
    if (loginMember == null) {
        return "home";
    }
    //세션이 유지되면 로그인으로 이동 
    model.addAttribute("member", loginMember);
    return "loginHome";
}
```
—\> JSESSIONID 쿠키 값으로 찾은 사용자 session객체에는 `attributes map` 이라는 저장공간을 가진다. 여기서 `SessionConst.LOGIN_MEMBER` 와`loginMember`를 각각 key와 value형태로 저장하게 된다.

### 로그인 처리하기 - 서블릿 HTTP 세션2
- `@SessionAttribute`: `@SessionAttribute(name = "loginMember", required = false) Member loginMember`

```java
@GetMapping("/")
public String homeLoginV3Spring(@SessionAttribute(name = SessionConst.LOGIN_MEMBER, required = false) Member loginMember, Model model) {
    //세션에 회원 데이터가 없으면 home
    if (loginMember == null) {
        return "home";
    }
    //세션이 유지되면 로그인으로 이동
    model.addAttribute("member", loginMember);
    return "loginHome";
}
```

- TrackingModes: 로그인을 처음 시도하면 URL이 다름과 같이 `jsessionid` 를 포함하고 있는 것을 확인할 수 있다.
`[http://localhost:8080/;jsessionid=F59911518B921DF62D09F0DF8F83F872]`
- 서버 입장에서 웹 브라우저가 쿠키를 지원하는지 하지 않는지 최초에는 판단하지 못하므로, 쿠키 값도 전달하고, URL에 `jsessionid` 도 함께 전달한다.
- URL 전달 방식을 끄고 항상 쿠키를 통해서만 세션을 유지하고 싶으면 다음 옵션을 넣어주면 된다. 이렇게 하면 URL에 `jsessionid` 가 노출되지 않는다.
`application.propteris`

```yaml
server.servlet.session.tracking-modes=cookie
```

### 세션 정보와 타임아웃 설정

```java
@Slf4j
@RestController
public class SessionInfoController {
    @GetMapping("/session-info")
    public String sessionInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return "세션이 없습니다.";
        }
        //세션 데이터 출력
        session.getAttributeNames().asIterator()
                .forEachRemaining(name -> log.info("session name={}, value={}", name, session.getAttribute(name)));

        log.info("sessionId={}", session.getId());
        log.info("maxInactiveInterval={}", session.getMaxInactiveInterval());
        log.info("creationTime={}", new Date(session.getCreationTime()));
        log.info("lastAccessedTime={}", new Date(session.getLastAccessedTime()));
        log.info("isNew={}", session.isNew());
        return "세션 출력";
    }
}
```
- `sessionId` : 세션Id, `JSESSIONID` 의 값이다. 예) `34B14F008AA3527C9F8ED620EFD7A4E1`
- `maxInactiveInterval` : 세션의 유효 시간, 예) 1800초, (30분)
- `creationTime` : 세션 생성일시
- `lastAccessedTime` :세션과 연결된 사용자가 최근에 서버에 접근한 시간, 클라이언트에서 서버로 `sessionId` ( `JSESSIONID` )를 요청한 경우에 갱신된다.
- `isNew` : 새로 생성된 세션인지, 아니면 이미 과거에 만들어졌고, 클라이언트에서 서버로 `sessionId` ( `JSESSIONID` )를 요청해서 조회된 세션인지 여부

#### 세션 타임아웃 설정
세션은 사용자가 로그아웃을 직접 호출해서 session.invalidate() 가 호출 되는 경우에 삭제된다. 그런데 대부분의 사용자는 로그아웃을 선택하지 않고, 그냥 웹 브라우저를 종료한다. 문제는 HTTP가 비 연결성(ConnectionLess)이므로 서버 입장에서는 해당 사용자가 웹 브라우저를 종료한 것인지 아닌지를 인식할 수 없다. 따라서 서버에서 세션 데이터를 언제 삭제해야 하는지 판단하기가 어렵다. 이 경우 남아있는 세션을 무한정 보관하면 다음과 같은 문제가 발생할 수 있다. 
- 세션과 관련된 쿠키( `JSESSIONID` )를 탈취 당했을 경우 오랜 시간이 지나도 해당 쿠키로 악의적인 요청을 할 수 있다.
- 세션은 기본적으로 메모리에 생성된다. 메모리의 크기가 무한하지 않기 때문에 꼭 필요한 경우만 생성해서 사용해야 한다. 10만명의 사용자가 로그인하면 10만게의 세션이 생성되는 것이다.

#### 세션의 종료 시점
세션 생성 시점이 아니라 사용자가 서버에 최근에 요청한 시간을 기준으로 30분 정도를 유지해주는 것이다. 이렇게 하면 사용자가 서비스를 사용하고 있으면, 세션의 생존 시간이 30분으로 계속 늘어나게 된다. 따라서 30분 마다 로그인해야 하는 번거로움이 사라진다. `HttpSession` 은 이 방식을 사용한다.
- 세션 타임아웃 설정
`application.properties
`

```yaml
server.servlet.session.timeout=60
```
- 특정 세션 단위로 시간 설정

```java
session.setMaxInactiveInterval(1800); //1800초
```


## 로그인 처리2 - 필터, 인터셉터
### 서블릿 필터 - 소개
- 공통 관심 사항: 요구사항을 보면 로그인 한 사용자만 상품 관리 페이지에 들어갈 수 있어야 한다. 앞에서 로그인을 하지 않은 사용자에게는 상품 관리 버튼이 보이지 않기 때문에 문제가 없어 보인다. 그런데 문제는 로그인 하지 않은 사용자도 다음 URL을 직접 호출하면 상품 관리 화면에 들어갈 수 있다는 점이다.
- 상품 관리 컨트롤러에서 로그인 여부를 체크하는 로직을 하나하나 작성하면 되겠지만, 등록, 수정, 삭제, 조회 등등 상품관리의 모든 컨트롤러 로직에 공통으로 로그인 여부를 확인해야 한다. 더 큰 문제는 향후 로그인과 관련된 로직이 변경될 때 이다. 작성한 모든 로직을 다 수정해야 할 수 있다.
- 이렇게 애플리케이션 여러 로직에서 공통으로 관심이 있는 있는 것을 공통 관심사(cross-cutting concern)라고 한다. 여기서는 등록, 수정, 삭제, 조회 등등 여러 로직에서 공통으로 인증에 대해서 관심을 가지고 있다.
- 이러한 공통 관심사는 스프링의 AOP로도 해결할 수 있지만, 웹과 관련된 공통 관심사는 지금부터 설명할 **서블릿 필터** 또는 **스프링 인터셉터**를 사용하는 것이 좋다. 웹과 관련된 공통 관심사를 처리할 때는 HTTP의 헤더나 URL의 정보들이 필요한데, 서블릿 필터나 스프링 인터셉터는 `HttpServletRequest` 를 제공한다.
- 필터 흐름: HTTP 요청 -\>WAS-\> 필터 -\> 서블릿 -\> 컨트롤러(스프링을 사용하는 경우 여기서 말하는 서블릿은 스프링의 디스패처 서블릿으로 생각하면 된다.)
- 필터 제한
	- HTTP 요청 -\> WAS -\> 필터 -\> 서블릿 -\> 컨트롤러 //로그인 사용자
	- HTTP 요청 -\> WAS -\> 필터(적절하지 않은 요청이라 판단, 서블릿 호출X) //비 로그인 사용자
- 필터 체인: HTTP 요청 -\>WAS-\> 필터1-\> 필터2-\> 필터3-\> 서블릿 -\> 컨트롤러

```java
public interface Filter {
    default void init(FilterConfig filterConfig) throws ServletException {
    }

    void doFilter(ServletRequest request, ServletResponse response,
                  FilterChain chain) throws IOException, ServletException;

    default void destroy() {
    }
}
```
- 필터 인터페이스를 구현하고 등록하면 서블릿 컨테이너가 필터를 싱글톤 객체로 생성하고, 관리한다.
	- `init()`: 필터 초기화 메서드, 서블릿 컨테이너가 생성될 때 호출된다.
	- `doFilter()`: 고객의 요청이 올 때 마다 해당 메서드가 호출된다. 필터의 로직을 구현하면 된다.
	- `destroy()`: 필터 종료 메서드, 서블릿 컨테이너가 종료될 때 호출된다.

### 서블릿 필터 - 요청 로그
```java
@Slf4j
public class LogFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("log filter init");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        String uuid = UUID.randomUUID().toString();
        try {
            log.info("REQUEST  [{}][{}]", uuid, requestURI);
            chain.doFilter(request, response);
        } catch (Exception e) {
            throw e;
        } finally {
            log.info("RESPONSE [{}][{}]", uuid, requestURI);
        }
    }

    @Override
    public void destroy() {
        log.info("log filter destroy");
    }
}
```
- `chain.doFilter(request, response)`:  다음 필터가 있으면 필터를 호출하고, 필터가 없으면 서블릿을 호출한다. 만약 이 로직을 호출하지 않으면 다음 단계로 진행되지 않는다.

```java
@Configuration
public class WebConfig {
    @Bean
    public FilterRegistrationBean logFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new LogFilter());
        filterRegistrationBean.setOrder(1);
        filterRegistrationBean.addUrlPatterns("/*");
        return filterRegistrationBean;
    }
}
```
- `setFilter(new LogFilter())` : 등록할 필터를 지정한다.
- `setOrder(1)` : 필터는 체인으로 동작한다. 따라서 순서가 필요하다. 낮을 수록 먼저 동작한다.
- `addUrlPatterns("/*")` : 필터를 적용할 URL 패턴을 지정한다. 한번에 여러 패턴을 지정할 수 있다.

### 서블릿 필터 - 인증 체크
```java
@Slf4j
public class LoginCheckFilter implements Filter {
    private static final String[] whitelist = {"/", "/members/add", "/login", "/logout", "/css/*"};

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        try {
            log.info("인증 체크 필터 시작 {}", requestURI);
            if (isLoginCheckPath(requestURI)) {
                log.info("인증 체크 로직 실행 {}", requestURI);
                HttpSession session = httpRequest.getSession(false);
                if (session == null || session.getAttribute(SessionConst.LOGIN_MEMBER) == null) {
                    log.info("미인증 사용자 요청 {}", requestURI);
                    //로그인으로 redirect
                    httpResponse.sendRedirect("/login?redirectURL=" + requestURI);
                    return; //여기가 중요, 미인증 사용자는 다음으로 진행하지 않고 끝!
                }
            }
            chain.doFilter(request, response);
        } catch (Exception e) {
            throw e; //예외 로깅 가능 하지만, 톰캣까지 예외를 보내주어야 함
        } finally {
            log.info("인증 체크 필터 종료 {}", requestURI);
        }
    }

    /**
     * 화이트 리스트의 경우 인증 체크X
     */
    private boolean isLoginCheckPath(String requestURI) {
        return !PatternMatchUtils.simpleMatch(whitelist, requestURI);
    }
}
```

### 스프링 인터셉터 - 소개
스프링 인터셉터도 서블릿 필터와 같이 웹과 관련된 공통 관심 사항을 효과적으로 해결할 수 있는 기술이다. 서블릿 필터가 서블릿이 제공하는 기술이라면, 스프링 인터셉터는 스프링 MVC가 제공하는 기술이다. 둘다 웹과 관련된 공통 관심 사항을 처리하지만, 적용되는 순서와 범위, 그리고 사용방법이 다르다.
- 스프링 인터셉터 흐름: HTTP 요청 -\>WAS-\> 필터 -\> 서블릿 -\> 스프링 인터셉터 -\> 컨트롤러
- 스프링 인터셉터는 디스패처 서블릿과 컨트롤러 사이에서 컨트롤러 호출 직전에 호출 된다.
- 스프링 인터셉터는 스프링 MVC가 제공하는 기능이기 때문에 결국 디스패처 서블릿 이후에 등장하게 된다. 스프링 MVC의 시작점이 디스패처 서블릿이라고 생각해보면 이해가 될 것이다.
- 스프링 인터셉터 제한
	- HTTP 요청 -\> WAS -\> 필터 -\> 서블릿 -\> 스프링 인터셉터 -\> 컨트롤러 //로그인 사용자
	- HTTP 요청 -\> WAS -\> 필터 -\> 서블릿 -\> 스프링 인터셉터(적절하지 않은 요청이라 판단, 컨트롤러 호출 X) // 비 로그인 사용자
- 스프링 인터셉터 체인: HTTP 요청 -\> WAS -\> 필터 -\> 서블릿 -\> 인터셉터1 -\> 인터셉터2 -\> 컨트롤러
- 스프링 인터셉터 인터페이스(`HandlerInterceptor`)
```java
public interface HandlerInterceptor {
    default boolean preHandle(HttpServletRequest request, HttpServletResponse
            response, Object handler) throws Exception {
    }

    default void postHandle(HttpServletRequest request, HttpServletResponse
            response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    default void afterCompletion(HttpServletRequest request, HttpServletResponse
            response, Object handler, @Nullable Exception ex) throws xception {
    }
}
```
- 인터셉터는 컨트롤러 호출 전( `preHandle` ), 호출 후( `postHandle` ), 요청 완료 이후( `afterCompletion` )와 같이 단계적으로 잘 세분화 되어 있다.
- `preHandle` : 컨트롤러 호출 전에 호출된다. (더 정확히는 핸들러 어댑터 호출 전에 호출된다.) `preHandle` 의 응답값이 `true` 이면 다음으로 진행하고, `false` 이면 더는 진행하지 않는다. `false`인 경우 나머지 인터셉터는 물론이고, 핸들러 어댑터도 호출되지 않는다. 그림에서 1번에서 끝이 나버린다.
- `postHandle` : 컨트롤러 호출 후에 호출된다. (더 정확히는 핸들러 어댑터 호출 후에 호출된다.)
- `afterCompletion` : 뷰가 렌더링 된 이후에 호출된다.
- 예외가 발생시
	- `preHandle` : 컨트롤러 호출 전에 호출된다.
	- `postHandle` : 컨트롤러에서 예외가 발생하면 `postHandle` 은 호출되지 않는다.
	- `afterCompletion` : afterCompletion 은 항상 호출된다. 이 경우 예외( `ex` )를 파라미터로 받아서 어떤 예외가 발생했는지 로그로 출력할 수 있다.
	- 예외가 발생하면 `postHandle()` 는 호출되지 않으므로 예외와 무관하게 공통 처리를 하려면 `afterCompletion()` 을 사용해야 한다.
    
```java
@Slf4j
public class LogInterceptor implements HandlerInterceptor {
    public static final String LOG_ID = "logId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse
            response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        String uuid = UUID.randomUUID().toString();
        request.setAttribute(LOG_ID, uuid);
        
        //@RequestMapping: HandlerMethod
        //정적 리소스: ResourceHttpRequestHandler
        if (handler instanceof HandlerMethod) {
            HandlerMethod hm = (HandlerMethod) handler; //호출할 컨트롤러 메서드의 모든 정보가 포함되어 있다.
        }
        log.info("REQUEST  [{}][{}][{}]", uuid, requestURI, handler);
        return true; //false 진행X 
        }

        @Override
        public void postHandle (HttpServletRequest request, HttpServletResponse
        response, Object handler, ModelAndView modelAndView) throws Exception {
            log.info("postHandle [{}]", modelAndView);
        }

        @Override
        public void afterCompletion (HttpServletRequest request, HttpServletResponse
        response, Object handler, Exception ex) throws Exception {
            String requestURI = request.getRequestURI();
            String logId = (String) request.getAttribute(LOG_ID);
            log.info("RESPONSE [{}][{}]", logId, requestURI);
            if (ex != null) {
                log.error("afterCompletion error!!", ex);
            }
        }
    }
}
```
- `true` 면 정상 호출이다. 다음 인터셉터나 컨트롤러가 호출된다.
- `HandlerMethod`: 핸들러 정보는 어떤 핸들러 매핑을 사용하는가에 따라 달라진다. 스프링을 사용하면 일반적으로 `@Controller` , `@RequestMapping` 을 활용한 핸들러 매핑을 사용하는데, 이 경우 핸들러 정보로 `HandlerMethod` 가 넘어온다.
- WebConfig - 인터셉터 등록

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }
    //...
}
```

### 스프링 인터셉터 - 인증 체크
```java
@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse
            response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        log.info("인증 체크 인터셉터 실행 {}", requestURI);
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SessionConst.LOGIN_MEMBER) == null) {
            log.info("미인증 사용자 요청");
            //로그인으로 redirect
            response.sendRedirect("/login?redirectURL=" + requestURI);
            return false;
        }
        return true;
    }
}
```
- 인증이라는 것은 컨트롤러 호출 전에만 호출되면 된다. 따라서 `preHandle` 만 구현하면 된다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(2)
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/", "/members/add", "/login", "/logout",
                        "/css/**", "/*.ico", "/error"
                );
    }
        //...
}
```
- 서블릿 필터와 비교해서 스프링 인터셉터가 개발자 입장에서 훨씬 편리하다는 것을 코드로 이해했을 것이다. 특별한 문제가 없다면 인터셉터를 사용하는 것이 좋다.

### ArgumentResolver 활용
```java
@GetMapping("/")
public String homeLoginV3ArgumentResolver(@Login Member loginMember, Model model) {
    //세션에 회원 데이터가 없으면 home
    if (loginMember == null) {
        return "home";
    }
    //세션이 유지되면 로그인으로 이동
    model.addAttribute("member", loginMember);
    return "loginHome";
}
```
- `@Login` 애노테이션이 있으면 직접 만든 `ArgumentResolver` 가 동작해서 자동으로 세션에 있는 로그인 회원을 찾아주고, 만약 세션에 없다면 `null` 을 반환하도록 개발해보자.

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface Login {
}
```
- `@Target(ElementType.PARAMETER)` : 파라미터에만 사용
- `@Retention(RetentionPolicy.RUNTIME)` : 리플렉션 등을 활용할 수 있도록 런타임까지 애노테이션 정보가 남아있음

```java
@Slf4j
public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        log.info("supportsParameter 실행");
        boolean hasLoginAnnotation = parameter.hasParameterAnnotation(Login.class);
        boolean hasMemberType = Member.class.isAssignableFrom(parameter.getParameterType());
        return hasLoginAnnotation && hasMemberType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) throws Exception {
        log.info("resolveArgument 실행");
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        HttpSession session = request.getSession(false);
        if (session == null) {
            return null;
        }
        return session.getAttribute(SessionConst.LOGIN_MEMBER);
    }
}
```
- `supportsParameter()` : `@Login` 애노테이션이 있으면서 `Member` 타입이면 해당 `ArgumentResolver` 가 사용된다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberArgumentResolver());
    }
    //...
}
```
- 앞서 개발한 `LoginMemberArgumentResolver` 를 등록하자.

## 예외 처리와 오류 페이지
### 서블릿 예외 처리 - 시작
- 서블릿은 다음 2가지 방식으로 예외 처리를 지원한다.
	- `Exception` (예외)
	- `response.sendError(HTTP 상태 코드, 오류 메시지)`
- 자바 직접 실행: 자바의 메인 메서드를 직접 실행하는 경우 `main` 이라는 이름의 쓰레드가 실행된다. 실행 도중에 예외를 잡지 못하고 처음 실행한 `main()` 메서드를 넘어서 예외가 던져지면, 예외 정보를 남기고 해당 쓰레드는 종료된다.
- 웹 애플리케이션: 웹 애플리케이션은 사용자 요청별로 별도의 쓰레드가 할당되고, 서블릿 컨테이너 안에서 실행된다. 애플리케이션에서 예외가 발생했는데, 어디선가 try \~ catch로 예외를 잡아서 처리하면 아무런 문제가 없다. 그런데 만약에 애플리케이션에서 예외를 잡지 못하고, 서블릿 밖으로 까지 예외가 전달되면 어떻게 동작할까?
`WAS(여기까지 전파) <- 필터 <- 서블릿 <- 인터셉터 <- 컨트롤러(예외발생)`
- 결국 톰캣 같은 WAS 까지 예외가 전달된다.

{% include gallery id="MVC_3" %}

```java
@Slf4j
@Controller
public class ServletExController {
    @GetMapping("/error-ex")
    public void errorEx() {
        throw new RuntimeException("예외 발생!");
    }
}
```
- `Exception` 의 경우 서버 내부에서 처리할 수 없는 오류가 발생한 것으로 생각해서 HTTP 상태 코드 500을 반환한다.(`HTTP Status 500 – Internal Server Error`)
- 오류가 발생했을 때 `HttpServletResponse` 가 제공하는 `sendError` 라는 메서드를 사용해도 된다. 이것을 호출한다고 당장 예외가 발생하는 것은 아니지만, 서블릿 컨테이너에게 오류가 발생했다는 점을 전달할 수 있다. 이 메서드를 사용하면 HTTP 상태 코드와 오류 메시지도 추가할 수 있다.

```java
@GetMapping("/error-404")
public void error404(HttpServletResponse response) throws IOException {
    response.sendError(404, "404 오류!");
}

@GetMapping("/error-500")
public void error500(HttpServletResponse response) throws IOException {
    response.sendError(500);
}
```
- sendError 흐름: WAS(sendError 호출 기록 확인) \<- 필터 \<- 서블릿 \<- 인터셉터 \<- 컨트롤러(response.sendError())
- `response.sendError()` 를 호출하면 `response` 내부에는 오류가 발생했다는 상태를 저장해둔다. 그리고 서블릿 컨테이너는 고객에게 응답 전에 `response` 에 `sendError()` 가 호출되었는지 확인한다. 그리고 호출되었다면 설정한 오류 코드에 맞추어 기본 오류 페이지를 보여준다.

### 서블릿 예외 처리 - 오류 화면 제공
스프링 부트를 통해서 서블릿 컨테이너를 실행하기 때문에, 스프링 부트가 제공하는 기능을
사용해서 서블릿 오류 페이지를 등록하면 된다.
```java
@Component
public class WebServerCustomizer implements
        WebServerFactoryCustomizer<ConfigurableWebServerFactory> {
    @Override
    public void customize(ConfigurableWebServerFactory factory) {
        ErrorPage errorPage404 = new ErrorPage(HttpStatus.NOT_FOUND, "/error-page/404");
        ErrorPage errorPage500 = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error-page/500");
        ErrorPage errorPageEx = new ErrorPage(RuntimeException.class, "/error-page/500");
        factory.addErrorPages(errorPage404, errorPage500, errorPageEx);
    }
}
```
- `response.sendError(404)` : `errorPage404` 호출
- `response.sendError(500)` : `errorPage500` 호출
- `RuntimeException` 또는 그 자식 타입의 예외: `errorPageEx` 호출

```java
@Slf4j
@Controller
public class ErrorPageController {
    @RequestMapping("/error-page/404")
    public String errorPage404(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 404");
        return "error-page/404";
    }

    @RequestMapping("/error-page/500")
    public String errorPage500(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 500");
        return "error-page/500";
    }
}
```

### 서블릿 예외 처리 - 오류 페이지 작동 원리
서블릿은 `Exception` (예외)가 발생해서 서블릿 밖으로 전달되거나 또는 `response.sendError()` 가 호출 되었을 때 설정된 오류 페이지를 찾는다.
- 예외 발생 흐름: WAS(여기까지 전파) \<- 필터 \<- 서블릿 \<- 인터셉터 \<- 컨트롤러(예외발생)
- sendError 흐름: WAS(sendError 호출 기록 확인) \<- 필터 \<- 서블릿 \<- 인터셉터 \<- 컨트롤러 (response.sendError())
- WAS는 해당 예외를 처리하는 오류 페이지 정보를 확인한다.(`new ErrorPage(RuntimeException.class, "/error-page/500")`)
- WAS는 오류 페이지를 출력하기 위해 `/error-page/500` 를 다시 요청한다.
- 오류 페이지 요청 흐름: WAS `/error-page/500` 다시 요청 -\> 필터 -\> 서블릿 -\> 인터셉터 -\> 컨트롤러(/error-page/ 500) -\> View

#### 오류 정보 추가
WAS는 오류 페이지를 단순히 다시 요청만 하는 것이 아니라, 오류 정보를 `request` 의 `attribute` 에 추가해서 넘겨준다. 필요하면 오류 페이지에서 이렇게 전달된 오류 정보를 사용할 수 있다.
```java
@Slf4j
@Controller
public class ErrorPageController {
    //RequestDispatcher 상수로 정의되어 있음
    public static final String ERROR_EXCEPTION = "javax.servlet.error.exception";
    public static final String ERROR_EXCEPTION_TYPE = "javax.servlet.error.exception_type";
    public static final String ERROR_MESSAGE = "javax.servlet.error.message";
    public static final String ERROR_REQUEST_URI = "javax.servlet.error.request_uri";
    public static final String ERROR_SERVLET_NAME = "javax.servlet.error.servlet_name";
    public static final String ERROR_STATUS_CODE = "javax.servlet.error.status_code";

    @RequestMapping("/error-page/404")
    public String errorPage404(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 404");
        printErrorInfo(request);
        return "error-page/404";
    }

    @RequestMapping("/error-page/500")
    public String errorPage500(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 500");
        printErrorInfo(request);
        return "error-page/500";
    }

    private void printErrorInfo(HttpServletRequest request) {
        log.info("ERROR_EXCEPTION: ex=", request.getAttribute(ERROR_EXCEPTION));
        log.info("ERROR_EXCEPTION_TYPE: {}", request.getAttribute(ERROR_EXCEPTION_TYPE));
        log.info("ERROR_MESSAGE: {}", request.getAttribute(ERROR_MESSAGE));
        log.info("ERROR_REQUEST_URI: {}", request.getAttribute(ERROR_REQUEST_URI));
        log.info("ERROR_SERVLET_NAME: {}", request.getAttribute(ERROR_SERVLET_NAME));
        log.info("ERROR_STATUS_CODE: {}", request.getAttribute(ERROR_STATUS_CODE));
        log.info("dispatchType={}", request.getDispatcherType());
    }
}
```

### 서블릿 예외 처리 - 필터
오류가 발생하면 오류 페이지를 출력하기 위해 WAS 내부에서 다시 한번 호출이 발생한다. 이때 필터, 서블릿, 인터셉터도 모두 다시 호출된다. 서버 내부에서 오류 페이지를 호출한다고 해서 해당 필터나 인터셉트가 한번 더 호출되는 것은 매우 비효율적이다. 결국 클라이언트로 부터 발생한 정상 요청인지, 아니면 오류 페이지를 출력하기 위한 내부 요청인지 구분할 수 있어야 한다. 서블릿은 이런 문제를 해결하기 위해 `DispatcherType` 이라는 추가 정보를 제공한다.
`javax.servlet.DispatcherType`
```java
public enum DispatcherType {
      FORWARD,
      INCLUDE,
      REQUEST,
      ASYNC,
      ERROR
}
```
- REQUEST : 클라이언트 요청
- ERROR : 오류 요청

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public FilterRegistrationBean logFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new LogFilter());
        filterRegistrationBean.setOrder(1);
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setDispatcherTypes(DispatcherType.REQUEST, DispatcherType.ERROR);
        return filterRegistrationBean;
    }
}
```
이렇게 두 가지를 모두 넣으면 클라이언트 요청은 물론이고, 오류 페이지 요청에서도 필터가 호출된다. 아무것도 넣지 않으면 기본 값이 `DispatcherType.REQUEST` 이다.

### 서블릿 예외 처리 - 인터셉터
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/css/**", "/*.ico"
                        , "/error", "/error-page/**" //오류 페이지 경로
                );
    }
}
```
- 인터셉터는 다음과 같이 요청 경로에 따라서 추가하거나 제외하기 쉽게 되어 있기 때문에, 이러한 설정을 사용해서 오류 페이지 경로를 excludePathPatterns 를 사용해서 빼주면 된다.

### 스프링 부트 - 오류 페이지1
- `ErrorPage` 를 자동으로 등록한다. 이때 `/error` 라는 경로로 기본 오류 페이지를 설정한다.
  - `new ErrorPage("/error")` , 상태코드와 예외를 설정하지 않으면 기본 오류 페이지로 사용된다.
  - 서블릿 밖으로 예외가 발생하거나, `response.sendError(...)` 가 호출되면 모든 오류는 `/error` 를 호출하게 된다.
- `BasicErrorController` 라는 스프링 컨트롤러를 자동으로 등록한다. `ErrorPage` 에서 등록한 `/error` 를 매핑해서 처리하는 컨트롤러다.
- 개발자는 오류 페이지 화면만 `BasicErrorController` 가 제공하는 룰과 우선순위에 따라서 등록하면 된다. 정적 HTML이면 정적 리소스, 뷰 템플릿을 사용해서 동적으로 오류 화면을 만들고 싶으면 뷰 템플릿 경로에 오류 페이지 파일을 만들어서 넣어두기만 하면 된다.
- 뷰 선택 우선순위
  1. 뷰템플릿
      - `resources/templates/error/500.html`
      - `resources/templates/error/5xx.html`
  2. 정적리소스
      - `resources/static/error/400.html`
      - `resources/static/error/404.html`
      - `resources/static/error/4xx.html`
  3. 적용 대상이 없을 때 뷰 이름(`error`)
      - `resources/templates/error.html`
  
### 스프링 부트 - 오류 페이지2
`BasicErrorController` 컨트롤러는 다음 정보를 model에 담아서 뷰에 전달한다. 뷰 템플릿은 이 값을 활용해서 출력할 수 있다.
```yaml
* timestamp: Fri Feb 05 00:00:00 KST 2021
* status: 400
* error: Bad Request
* exception: org.springframework.validation.BindException * trace: 예외 trace
* message: Validation failed for object='data'. Error count: 1 * errors: Errors(BindingResult)
* path: 클라이언트 요청 경로 (`/hello`)
```

```html
<ul>
    <li>오류 정보</li>
    <ul>
        <li th:text="|timestamp: ${timestamp}|"></li>
        <li th:text="|path: ${path}|"></li>
        <li th:text="|status: ${status}|"></li>
        <li th:text="|message: ${message}|"></li>
        <li th:text="|error: ${error}|"></li>
        <li th:text="|exception: ${exception}|"></li>
        <li th:text="|errors: ${errors}|"></li>
        <li th:text="|trace: ${trace}|"></li>
    </ul>
    </li>
</ul>
```
- 스프링 부트 오류 관련 옵션
  - `server.error.whitelabel.enabled=true` : 오류 처리 화면을 못 찾을 시, 스프링 whitelabel 오류 페이지 적용
  - `server.error.path=/error` : 오류 페이지 경로, 스프링이 자동 등록하는 서블릿 글로벌 오류 페이지 경로와 `BasicErrorController` 오류 컨트롤러 경로에 함께 사용된다.

## API 예외 처리
### API 예외 처리 - 시작
- 오류 페이지는 단순히 고객에게 오류 화면을 보여주고 끝이지만, API는 각 오류 상황에 맞는 오류 응답 스펙을 정하고, JSON으로 데이터를 내려주어야 한다.

```java
@Slf4j
@RestController
public class ApiExceptionController {
    @GetMapping("/api/members/{id}")
    public MemberDto getMember(@PathVariable("id") String id) {

        if (id.equals("ex")) {
            throw new RuntimeException("잘못된 사용자");
        }
        return new MemberDto(id, "hello " + id);
    }

    @Data
    @AllArgsConstructor
    static class MemberDto {
        private String memberId;
        private String name;
    }
}
```

`http://localhost:8080/api/members/ex`
```html
<!DOCTYPE HTML>
<html>

<head>

</head>

<body>
    ...
</body>
  ```
- API를 요청했는데, 정상의 경우 API로 JSON 형식으로 데이터가 정상 반환된다. 그런데 오류가 발생하면 우리가 미리 만들어둔 오류 페이지 HTML이 반환된다. 이것은 기대하는 바가 아니다. 클라이언트는 정상 요청이든, 오류 요청이든 JSON이 반환되기를 기대한다. 문제를 해결하려면 오류 페이지 컨트롤러도 JSON 응답을 할 수 있도록 수정해야 한다.

```java
@RequestMapping(value = "/error-page/500", produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<Map<String, Object>> errorPage500Api(HttpServletRequest request, HttpServletResponse response) {
    log.info("API errorPage 500");
    Map<String, Object> result = new HashMap<>();
    Exception ex = (Exception) request.getAttribute(ERROR_EXCEPTION);
    result.put("status", request.getAttribute(ERROR_STATUS_CODE));
    result.put("message", ex.getMessage());
    Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
    return new ResponseEntity(result, HttpStatus.valueOf(statusCode));
}
```
`http://localhost:8080/api/members/ex`
```yaml
{
    "message": "잘못된 사용자",
    "status": 500
}
```

### API 예외 처리 - 스프링 부트 기본 오류 처리
API 예외 처리도 스프링 부트가 제공하는 기본 오류 방식을 사용할 수 있다. 스프링 부트가 제공하는 BasicErrorController 코드를 보자.
```java
@RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
}

@RequestMapping
public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
}
```
- `errorHtml()` : `produces = MediaType.TEXT_HTML_VALUE` : 클라이언트 요청의 Accept 해더 값이 `text/html` 인 경우에는 `errorHtml()` 을 호출해서 view를 제공한다.
- `error()` : 그외 경우에 호출되고 `ResponseEntity` 로 HTTP Body에 JSON 데이터를 반환한다.

```yaml
{
"timestamp": "2021-04-28T00:00:00.000+00:00", "status": 500,
"error": "Internal Server Error",
"exception": "java.lang.RuntimeException",
"trace": "java.lang.RuntimeException: 잘못된 사용자\n\tat...",
"message": "잘못된 사용자",
"path": "/api/members/ex"
}
```
- Html 페이지 vs API 오류: `BasicErrorController` 를 확장하면 JSON 메시지도 변경할 수 있다. 그런데 API 오류는 조금 뒤에 설명할 `@ExceptionHandler` 가 제공하는 기능을 사용하는 것이 더 나은 방법이므로 지금은 `BasicErrorController` 를 확장해서 JSON 오류 메시지를 변경할 수 있다 정도로만 이해해두자. 스프링 부트가 제공하는 `BasicErrorController` 는 HTML 페이지를 제공하는 경우에는 매우 편리하다. 4xx, 5xx 등등 모두 잘 처리해준다. 그런데 API 오류 처리는 다른 차원의 이야기이다. API 마다, 각각의 컨트롤러나 예외마다 서로 다른 응답 결과를 출력해야 할 수도 있다. 예를 들어서 회원과 관련된 API에서 예외가 발생할 때 응답과, 상품과 관련된 API에서 발생하는 예외에 따라 그 결과가 달라질 수 있다. 결과적으로 매우 세밀하고 복잡하다. 따라서 이 방법은 HTML 화면을 처리할 때 사용하고, API는 오류 처리는 뒤에서 설명할 `@ExceptionHandler` 를 사용하자.

### API 예외 처리 - HandlerExceptionResolver 시작
예외가 발생해서 서블릿을 넘어 WAS까지 예외가 전달되면 HTTP 상태코드가 500으로 처리된다. 발생하는 예외에 따라서 400, 404 등등 다른 상태코드도 처리하고 싶다. 오류 메시지, 형식등을 API마다 다르게 처리하고 싶다.

- HandlerExceptionResolver: 스프링 MVC는 컨트롤러(핸들러) 밖으로 예외가 던져진 경우 예외를 해결하고, 동작을 새로 정의할 수 있는 방법을 제공한다. 컨트롤러 밖으로 던져진 예외를 해결하고, 동작 방식을 변경하고 싶으면 `HandlerExceptionResolver` 를 사용하면 된다. 줄여서 `ExceptionResolver` 라 한다. `ExceptionResolver` 로 예외를 해결해도 `postHandle()` 은 호출되지 않는다.

{% include gallery id="MVC_4" %}


- `HandlerExceptionResolver - 인터페이스`

```java
public interface HandlerExceptionResolver {
    ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response,
            Object handler, Exception ex);
}
```
```java
@Slf4j
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {
        try {
            if (ex instanceof IllegalArgumentException) {
                log.info("IllegalArgumentException resolver to 400");
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
                return new ModelAndView();
            }
        } catch (IOException e) {
            log.error("resolver ex", e);
        }
        return null;
    }
}
```
- `WebMvcConfigurer` 를 통해 등록

```java
@Override
public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
    resolvers.add(new MyHandlerExceptionResolver());
}
```
- `ExceptionResolver` 가 `ModelAndView` 를 반환하는 이유는 마치 try, catch를 하듯이, `Exception` 을 처리해서 정상 흐름 처럼 변경하는 것이 목적이다. 이름 그대로 `Exception` 을 Resolver(해결)하는 것이 목적이다.
- 여기서는 `IllegalArgumentException` 이 발생하면 `response.sendError(400)` 를 호출해서 HTTP 상태 코드를 400으로 지정하고, 빈 `ModelAndView` 를 반환한다.
- 반환 값에 따른 동작 방식: `HandlerExceptionResolver` 의 반환 값에 따른 `DispatcherServlet` 의 동작 방식은 다음과 같다.
- 빈 ModelAndView: `new ModelAndView()` 처럼 빈 `ModelAndView` 를 반환하면 뷰를 렌더링 하지 않고, 정상 흐름으로 서블릿이 리턴된다.
- ModelAndView 지정: `ModelAndView` 에 `View` , `Model` 등의 정보를 지정해서 반환하면 뷰를 렌더링 한다.
- null: `null` 을 반환하면, 다음 `ExceptionResolver` 를 찾아서 실행한다. 만약 처리할 수 있는 `ExceptionResolver` 가 없으면 예외 처리가 안되고, 기존에 발생한 예외를 서블릿 밖으로 던진다.

### API 예외 처리 - HandlerExceptionResolver 활용
예외가 발생하면 WAS까지 예외가 던져지고, WAS에서 오류 페이지 정보를 찾아서 다시 `/error` 를 호출하는 과정은 생각해보면 너무 복잡하다. `ExceptionResolver` 를 활용하면 예외가 발생했을 때 이런 복잡한 과정 없이 여기에서 문제를 깔끔하게 해결할 수 있다.
```java
public class UserException extends RuntimeException {
}
```
```java
@Slf4j
public class UserHandlerExceptionResolver implements HandlerExceptionResolver {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {
        try {
            if (ex instanceof UserException) {
                log.info("UserException resolver to 400");
                String acceptHeader = request.getHeader("accept");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                if ("application/json".equals(acceptHeader)) {
                    Map<String, Object> errorResult = new HashMap<>();
                    errorResult.put("ex", ex.getClass());
                    errorResult.put("message", ex.getMessage());
                    String result =
                            objectMapper.writeValueAsString(errorResult);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("utf-8");
                    response.getWriter().write(result);
                    return new ModelAndView();
                } else {
                    //TEXT/HTML
                    return new ModelAndView("error/500");
                }
            }
        } catch (IOException e) {
            log.error("resolver ex", e);
        }
        return null;
    }
}
```
`ACCEPT : application/json`
```yaml
{
    "ex": "hello.exception.exception.UserException", 
    "message": "사용자 오류"
}
```
—\> `ExceptionResolver` 를 사용하면 컨트롤러에서 예외가 발생해도 `ExceptionResolver` 에서 예외를 처리해버린다. 따라서 예외가 발생해도 서블릿 컨테이너까지 예외가 전달되지 않고, 스프링 MVC에서 예외 처리는 끝이 난다.

### API 예외 처리 - 스프링이 제공하는 ExceptionResolver1
- 스프링 부트가 기본으로 제공하는 `ExceptionResolver` 는 다음과 같다. `HandlerExceptionResolverComposite` 에 다음 순서로 등록
   1. `ExceptionHandlerExceptionResolver`
   2. `ResponseStatusExceptionResolver`
   3. `DefaultHandlerExceptionResolver` -> 우선 순위가 가장 낮다.
- `ResponseStatusExceptionResolver`: `@ResponseStatus` 가 달려있는 예외, `ResponseStatusException` 예외

```java
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "잘못된 요청 오류")
public class BadRequestException extends RuntimeException {
}
```
- `BadRequestException` 예외가 컨트롤러 밖으로 넘어가면 `ResponseStatusExceptionResolver` 예외가 해당 애노테이션을 확인해서 오류 코드를 `HttpStatus.BAD_REQUEST` (400)으로 변경하고, 메시지도 담는다.
- `ResponseStatusExceptionResolver` 코드를 확인해보면 결국 `response.sendError(statusCode, resolvedReason)` 를 호출하는 것을 확인할 수 있다. `sendError(400)` 를 호출했기 때문에 WAS에서 다시 오류 페이지( `/error` )를 내부 요청한다.
- `reason` 을 `MessageSource` 에서 찾는 기능도 제공한다. `reason = "error.bad"`
- ResponseStatusException: `@ResponseStatus` 는 개발자가 직접 변경할 수 없는 예외에는 적용할 수 없다. (애노테이션을 직접 넣어야 하는데, 내가 코드를 수정할 수 없는 라이브러리의 예외 코드 같은 곳에는 적용할 수 없다.) 추가로 애노테이션을 사용하기 때문에 조건에 따라 동적으로 변경하는 것도 어렵다. 이때는 `ResponseStatusException` 예외를 사용하면 된다.

```java
@GetMapping("/api/response-status-ex2")
public String responseStatusEx2() {
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "error.bad", new IllegalArgumentException());
}
```

### API 예외 처리 - 스프링이 제공하는 ExceptionResolver2
- `DefaultHandlerExceptionResolver`: 스프링 내부에서 발생하는 스프링 예외를 해결한다. 대표적으로 파라미터 바인딩 시점에 타입이 맞지 않으면 내부에서 `TypeMismatchException` 이 발생하는데, 이 경우 예외가 발생했기 때문에 그냥 두면 서블릿 컨테이너까지 오류가 올라가고, 결과적으로 500 오류가 발생한다. 그런데 파라미터 바인딩은 대부분 클라이언트가 HTTP 요청 정보를 잘못 호출해서 발생하는 문제이다. HTTP 에서는 이런 경우 HTTP 상태 코드 400을 사용하도록 되어 있다.
- `DefaultHandlerExceptionResolver.handleTypeMismatch` 를 보면 다음과 같은 코드를 확인할 수 있다. `response.sendError(HttpServletResponse.SC_BAD_REQUEST)` (400) 결국 `response.sendError()` 를 통해서 문제를 해결한다. `sendError(400)` 를 호출했기 때문에 WAS에서 다시 오류 페이지( `/error` )를 내부 요청한다.

### API 예외 처리 - @ExceptionHandler
지금까지 살펴본 `BasicErrorController` 를 사용하거나 `HandlerExceptionResolver` 를 직접 구현하는 방식으로 API 예외를 다루기는 쉽지 않다.
- API 예외처리의 어려운 점
  - `HandlerExceptionResolver` 를 떠올려 보면 `ModelAndView` 를 반환해야 했다. 이것은 API 응답에는 필요하지 않다.
  - API 응답을 위해서 `HttpServletResponse` 에 직접 응답 데이터를 넣어주었다. 이것은 매우 불편하다. 스프링 컨트롤러에 비유하면 마치 과거 서블릿을 사용하던 시절로 돌아간 것 같다.
  - 특정 컨트롤러에서만 발생하는 예외를 별도로 처리하기 어렵다. 예를 들어서 회원을 처리하는 컨트롤러에서 발생하는 `RuntimeException` 예외와 상품을 관리하는 컨트롤러에서 발생하는 동일한 `RuntimeException` 예외를 서로 다른 방식으로 처리하고 싶다면 어떻게 해야할까?
- `@ExceptionHandler`: 스프링은 API 예외 처리 문제를 해결하기 위해 `@ExceptionHandler` 라는 애노테이션을 사용하는 매우 편리한 예외 처리 기능을 제공하는데, 이것이 바로 `ExceptionHandlerExceptionResolver` 이다. 스프링은 `ExceptionHandlerExceptionResolver` 를 기본으로 제공하고, 기본으로 제공하는 `ExceptionResolver` 중에 우선순위도 가장 높다. 실무에서 API 예외 처리는 대부분 이 기능을 사용한다.

```java
@Slf4j
@RestController
public class ApiExceptionV2Controller {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResult> userExHandle(UserException e) {
        log.error("[exceptionHandle] ex", e);
        ErrorResult errorResult = new ErrorResult("USER-EX", e.getMessage());
        return new ResponseEntity<>(errorResult, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult exHandle(Exception e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("EX", "내부 오류");
    }
    
    /...
}
```
- `@ExceptionHandler` 애노테이션을 선언하고, 해당 컨트롤러에서 처리하고 싶은 예외를 지정해주면 된다. 해당 컨트롤러에서 예외가 발생하면 이 메서드가 호출된다. 참고로 지정한 예외 또는 그 예외의 자식 클래스는 모두 잡을 수 있다.
- 실행 흐름
  1. 컨트롤러를 호출한 결과 `IllegalArgumentException` 예외가 컨트롤러 밖으로 던져진다.
  2. 예외가 발생했으로 `ExceptionResolver` 가 작동한다. 가장 우선순위가 높은 `ExceptionHandlerExceptionResolver` 가 실행된다. 
  3. `ExceptionHandlerExceptionResolver` 는 해당 컨트롤러에 `IllegalArgumentException` 을 처리할 수 있는 `@ExceptionHandler` 가 있는지 확인한다.
  4. `illegalExHandle()` 를 실행한다. `@RestController` 이므로 `illegalExHandle()` 에도 `@ResponseBody` 가 적용된다. 따라서 HTTP 컨버터가 사용되고, 응답이 JSON으로 반환된다.
  5. `@ResponseStatus(HttpStatus.BAD_REQUEST)` 를 지정했으므로 HTTP 상태 코드 400으로 응답한다.

### API 예외 처리 - @ControllerAdvice
 `@ExceptionHandler` 를 사용해서 예외를 깔끔하게 처리할 수 있게 되었지만, 정상 코드와 예외 처리 코드가 하나의 컨트롤러에 섞여 있다. `@ControllerAdvice` 또는 `@RestControllerAdvice` 를 사용하면 둘을 분리할 수 있다.
```java
@Slf4j
@RestControllerAdvice
public class ExControllerAdvice {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResult illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResult> userExHandle(UserException e) {
        log.error("[exceptionHandle] ex", e);
        ErrorResult errorResult = new ErrorResult("USER-EX", e.getMessage());
        return new ResponseEntity<>(errorResult, HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    public ErrorResult exHandle(Exception e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("EX", "내부 오류");
    }
}
```
- @ControllerAdvice
  - `@ControllerAdvice` 는 대상으로 지정한 여러 컨트롤러에 `@ExceptionHandler` , `@InitBinder` 기능을 부여해주는 역할을 한다.
  - `@ControllerAdvice` 에 대상을 지정하지 않으면 모든 컨트롤러에 적용된다. (글로벌 적용)
  - `@RestControllerAdvice` 는 `@ControllerAdvice` 와 같고, `@ResponseBody` 가 추가되어 있다.
- 대상 컨트롤러 지정 방법
  - `@ControllerAdvice(annotations = RestController.class)`
  - `@ControllerAdvice("org.example.controllers")`
  - `@ControllerAdvice(assignableTypes = {ControllerInterface.class, AbstractController.class})`

## 스프링 타입 컨버터
### 타입 컨버터 - Converter
- HTTP 요청 파라미터는 모두 문자로 처리된다. 따라서 요청 파라미터를 자바에서 다른 타입으로 변환해서 사용하고 싶으면 다음과 같이 숫자 타입으로 변환하는 과정을 거쳐야 한다. `Integer intValue = Integer.valueOf(data)`
- 스프링이 제공하는 `@RequestParam` 을 사용하면 이 문자 10을 `Integer` 타입의 숫자 10으로 편리하게 받을 수 있다. 이것은 스프링이 중간에서 타입을 변환해주었기 때문이다.
- 스프링의 타입 변환 적용 예
  - 스프링 MVC 요청 파라미터(`@RequestParam` , `@ModelAttribute` , `@PathVariable`)
  - `@Value` 등으로 YML 정보 읽기
  - XML에 넣은 스프링 빈 정보를 변환
  - 뷰를 렌더링 할 때
- 컨버터 인터페이스

```java
package org.springframework.core.convert.converter;

public interface Converter<S, T> {
    T convert(S source);
}
```
- 스프링은 확장 가능한 컨버터 인터페이스를 제공한다. 개발자는 스프링에 추가적인 타입 변환이 필요하면 이 컨버터 인터페이스를 구현해서 등록하면 된다.

### 컨버전 서비스 - ConversionService
타입 컨버터를 하나하나 직접 찾아서 타입 변환에 사용하는 것은 매우 불편하다. 그래서 스프링은 개별 컨버터를 모아두고 그것들을 묶어서 편리하게 사용할 수 있는 기능을 제공하는데, 이것이 바로 컨버전 서비스( `ConversionService` )이다.

```java
public interface ConversionService {
    boolean canConvert(@Nullable Class<?> sourceType, Class<?> targetType);

    boolean canConvert(@Nullable TypeDescriptor sourceType, TypeDescriptor targetType);

    <T> T convert(@Nullable Object source, Class<T> targetType);

    Object convert(@Nullable Object source, @Nullable TypeDescriptor sourceType, TypeDescriptor targetType);
}
```
```java
DefaultConversionService conversionService = new DefaultConversionService();
conversionService.addConverter(newStringToIntegerConverter());
conversionService.addConverter(newIntegerToStringConverter());
conversionService.addConverter(newStringToIpPortConverter());
conversionService.addConverter(newIpPortToStringConverter());
```
- `DefaultConversionService` 는 `ConversionService` 인터페이스를 구현했는데, 추가로 컨버터를 등록하는 기능도 제공한다.
- 인터페이스 분리 원칙 - ISP(Interface Segregation Principal): 인터페이스 분리 원칙은 클라이언트가 자신이 이용하지 않는 메서드에 의존하지 않아야 한다.
  - `DefaultConversionService` 는 다음 두 인터페이스를 구현했다: `ConversionService` : 컨버터 사용에 초점, `ConverterRegistry` : 컨버터 등록에 초점<br>
  
—\> 이렇게 인터페이스를 분리하면 컨버터를 사용하는 클라이언트와 컨버터를 등록하고 관리하는 클라이언트의 관심사를 명확하게 분리할 수 있다. 특히 컨버터를 사용하는 클라이언트는 `ConversionService` 만 의존하면 되므로, 컨버터를 어떻게 등록하고 관리하는지는 전혀 몰라도 된다. 결과적으로 컨버터를 사용하는 클라이언트는 꼭 필요한 메서드만 알게된다. 이렇게 인터페이스를 분리하는 것을 `ISP` 라 한다.
- 스프링은 내부에서 `ConversionService` 를 사용해서 타입을 변환한다. 예를 들어서 앞서 살펴본 `@RequestParam` 같은 곳에서 이 기능을 사용해서 타입을 변환한다.

### 스프링에 Converter 적용하기
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToIntegerConverter());
        registry.addConverter(new IntegerToStringConverter());
        registry.addConverter(new StringToIpPortConverter());
        registry.addConverter(new IpPortToStringConverter());
    }
}
```
- 스프링은 내부에서 `ConversionService` 를 제공한다. 우리는 `WebMvcConfigurer` 가 제공하는 `addFormatters()` 를 사용해서 추가하고 싶은 컨버터를 등록하면 된다. 이렇게 하면 스프링은 내부에서 사용하는 `ConversionService` 에 컨버터를 추가해준다.
- 처리 과정: `@RequestParam` 은 `@RequestParam` 을 처리하는 `ArgumentResolver` 인 `RequestParamMethodArgumentResolver` 에서 `ConversionService` 를 사용해서 타입을 변환한다.

### 뷰 템플릿에 컨버터 적용하기
이번에는 뷰 템플릿에 컨버터를 적용하는 방법을 알아보자. 타임리프는 렌더링 시에 컨버터를 적용해서 렌더링 하는 방법을 편리하게 지원한다. 이전까지는 문자를 객체로 변환했다면, 이번에는 그 반대로 객체를 문자로 변환하는 작업을 확인할 수 있다.
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <ul>
        <li>${number}: <span th:text="${number}"></span></li>
        <li>${ {number} }: <span th:text="${ {number} }"></span></li>
        <li>${ipPort}: <span th:text="${ipPort}"></span></li>
        <li>${ {ipPort} }: <span th:text="${ {ipPort} }"></span></li>
    </ul>
</body>

</html>
```
- 타임리프는 `${ {...} }` 를 사용하면 자동으로 컨버전 서비스를 사용해서 변환된 결과를 출력해준다. 물론 스프링과 통합 되어서 스프링이 제공하는 컨버전 서비스를 사용하므로, 우리가 등록한 컨버터들을 사용할 수 있다.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <form th:object="${form}" th:method="post">
        th:field <input type="text" th:field="*{ipPort}"><br />
        th:value <input type="text" th:value="*{ipPort}">(보여주기 용도)<br /> <input type="submit" />
    </form>
</body>

</html>
```
- 타임리프의 `th:field` 는 앞서 설명했듯이 `id` , `name` 를 출력하는 등 다양한 기능이 있는데, 여기에 컨버전 서비스도 함께 적용된다.

### 포맷터 - Formatter
- 화면에 숫자를 출력해야 하는데, `Integer` -> `String` 출력 시점에 숫자 `1000` -> 문자 `"1,000"` 이렇게 1000 단위에 쉼표를 넣어서 출력하거나, 또는 `"1,000"` 라는 문자를 `1000` 이라는 숫자로 변경해야 한다.
- 날짜 객체를 문자인 `"2021-01-01 10:50:11"` 와 같이 출력하거나 또는 그 반대의 상황
- 여기에 추가로 날짜 숫자의 표현 방법은 `Locale` 현지화 정보가 사용될 수 있다.
- 이렇게 객체를 특정한 포멧에 맞추어 문자로 출력하거나 또는 그 반대의 역할을 하는 것에 특화된 기능이 바로 포맷터( `Formatter` )이다. 포맷터는 컨버터의 특별한 버전으로 이해하면 된다.
- Converter vs Formatter
  - `Converter` 는 범용(객체 객체)
  - `Formatter` 는 문자에 특화(객체 -> 문자, 문자 -> 객체) + 현지화(Locale),  `Converter` 의 특별한 버전
- Formatter 인터페이스

```java
public interface Printer<T> {
    String print(T object, Locale locale);
}

public interface Parser<T> {
    T parse(String text, Locale locale) throws ParseException;
}

public interface Formatter<T> extends Printer<T>, Parser<T> {
}
```
- `String print(T object, Locale locale)` : 객체를 문자로 변경한다.
- `T parse(String text, Locale locale)` : 문자를 객체로 변경한다.

### 포맷터를 지원하는 컨버전 서비스
컨버전 서비스에는 컨버터만 등록할 수 있고, 포맷터를 등록할 수 는 없다. 그런데 생각해보면 포맷터는 객체 -> 문자, 문자 -> 객체로 변환하는 특별한 컨버터일 뿐이다.
포맷터를 지원하는 컨버전 서비스를 사용하면 컨버전 서비스에 포맷터를 추가할 수 있다. 내부에서 어댑터 패턴을 사용해서 `Formatter` 가 `Converter` 처럼 동작하도록 지원한다.
`FormattingConversionService` 는 포맷터를 지원하는 컨버전 서비스이다. `DefaultFormattingConversionService` 는 `FormattingConversionService` 에 기본적인 통화, 숫자 관련 몇가지 기본 포맷터를 추가해서 제공한다.
```java
DefaultFormattingConversionService conversionService = new DefaultFormattingConversionService();
//컨버터 등록
conversionService.addConverter(newStringToIpPortConverter());
conversionService.addConverter(newIpPortToStringConverter());
//포맷터 등록
conversionService.addFormatter(newMyNumberFormatter());
```
- DefaultFormattingConversionService 상속 관계: `FormattingConversionService` 는 `ConversionService` 관련 기능을 상속받기 때문에 결과적으로 컨버터도 포맷터도 모두 등록할 수 있다. 그리고 사용할 때는 `ConversionService` 가 제공하는 `convert` 를 사용하면 된다. 추가로 스프링 부트는 `DefaultFormattingConversionService` 를 상속 받은 `WebConversionService` 를 내부에서 사용한다.

### 스프링이 제공하는 기본 포맷터
스프링은 자바에서 기본으로 제공하는 타입들에 대해 수 많은 포맷터를 기본으로 제공한다. 그런데 포맷터는 기본 형식이 지정되어 있기 때문에, 객체의 각 필드마다 다른 형식으로 포맷을 지정하기는 어렵다. 스프링은 이런 문제를 해결하기 위해 애노테이션 기반으로 원하는 형식을 지정해서 사용할 수 있는 매우 유용한 포맷터 두 가지를 기본으로 제공한다.
- `@NumberFormat` : 숫자 관련 형식 지정 포맷터 사용, `NumberFormatAnnotationFormatterFactory`
- `@DateTimeFormat` : 날짜 관련 형식 지정 포맷터 사용, `Jsr310DateTimeFormatAnnotationFormatterFactory`

```java
@Data
static class Form {
    @NumberFormat(pattern = "###,###")
    private Integer number;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime localDateTime;
}
```

## 파일 업로드
### 파일 업로드 소개
- HTML 폼 전송 방식
  - application/x-www-form-urlencoded
  - multipart/form-data
- 파일을 업로드 하려면 파일은 문자가 아니라 바이너리 데이터를 전송해야 한다. 문자를 전송하는 이 방식으로 파일을 전송하기는 어렵다. 그리고 또 한가지 문제가 더 있는데, 보통 폼을 전송할 때 파일만 전송하는 것이 아니라는 점이다. 이 문제를 해결하기 위해 HTTP는 `multipart/form-data` 라는 전송 방식을 제공한다.

{% include gallery id="MVC_5" %}

### 서블릿과 파일 업로드1
```java
@PostMapping("/upload")
public String saveFileV1(HttpServletRequest request) throws ServletException, IOException {
    log.info("request={}", request);
    String itemName = request.getParameter("itemName");
    log.info("itemName={}", itemName);
    Collection<Part> parts = request.getParts();
    log.info("parts={}", parts);
    return "upload-form";
}
```
- 업로드 사이즈 제한

```yaml
spring.servlet.multipart.max-file-size=1MB
spring.servlet.multipart.max-request-size=10MB
```
- 로그를 보면 `HttpServletRequest` 객체가 `RequestFacade` -> `StandardMultipartHttpServletRequest` 로 변한 것을 확인할 수 있다.

### 서블릿과 파일 업로드2
```ymal
file.dir=파일 업로드 경로 설정(예): /Users/hyungwook/study/file/
```
```java
@Slf4j
@Controller
@RequestMapping("/servlet/v2")
public class ServletUploadControllerV2 {
    @Value("${file.dir}")
    private String fileDir;

    @PostMapping("/upload")
    public String saveFileV1(HttpServletRequest request) throws ServletException, IOException {
        Collection<Part> parts = request.getParts();
        for (Part part : parts) {
            //파일에 저장하기
            if (StringUtils.hasText(part.getSubmittedFileName())) {
                String fullPath = fileDir + part.getSubmittedFileName();
                log.info("파일 저장 fullPath={}", fullPath);
                part.write(fullPath);
            }
        }
        return "upload-form";
    }
}
```

### 스프링과 파일 업로드
```java
@Controller
@RequestMapping("/spring")
public class SpringUploadController {
    @Value("${file.dir}")
    private String fileDir;
    
    @PostMapping("/upload")
    public String saveFile(@RequestParam String itemName,
                           @RequestParam MultipartFile file, HttpServletRequest request) throws IOException {
        if (!file.isEmpty()) {
            String fullPath = fileDir + file.getOriginalFilename();
            log.info("파일 저장 fullPath={}", fullPath);
            file.transferTo(new File(fullPath));
        }
        return "upload-form";
    }
}
```
- 실제 파일을 저장할 때에는 사용자가 입력한 파일이름을 UUID로 변경하여 '업로드 파일 이름'과 '고유파일 이름'을 데이터베이스에 저장해야 한다. 다시 필요한 파일을 다운로드 받거나 로드 할 떄에는 경로와 고유파일 이름을 이용한다.

[1]: https://www.inflearn.com/course/스프링-mvc-2/dashboard
