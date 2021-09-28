---
title: "[Spring][Thymeleaf] Thymeleaf 네츄럴 템플릿"
last\_modified\_at: 2021-09-25T 2:37 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Thymeleaf
tags:
  - Thymeleaf
  - Spring
---
## 들어가며 
해당 게시글은 인프런 김영한 강사님의 [스프링 MVC 2편 - 백엔드 웹 개발 활용 기술][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 타임리프 - 기본 기능


### 타임리프 소개
1. 서버 사이드 HTML 렌더링 (SSR): 타임리프는 백엔드 서버에서 HTML을 동적으로 렌더링 하는
용도로 사용된다.
2. 네츄럴 템플릿: 타임리프는 순수 HTML을 최대한 유지하는 특징이 있다. 타임리프로 작성된 파일은
해당 파일을 그대로 웹 브라우저에서 열어도 정상적인 HTML 결과를 확인할 수 있다.
3. 스프링 통합 지원: 타임리프는 스프링과 자연스럽게 통합되고, 스프링의 다양한 기능을 편리하게
사용할 수 있게 지원한다.
4. 타임리프 사용 선언

```html
<html xmlns:th="http://www.thymeleaf.org">
```
### 텍스트 - text, utext

- HTML의 콘텐츠(content)에 데이터를 출력할 때는 다음과 같이 `th:text` 를 사용하면 된다.

```html
<span th:text="${data}">
```
- HTML 테그의 속성이 아니라 HTML 콘텐츠 영역안에서 직접 데이터를 출력하고 싶으면 다음과 같이 `[[...]]` 를 사용하면 된다.

```html
컨텐츠 안에서 직접 출력하기 = [[${data}]]
```

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>

    <h1>컨텐츠에 데이터 출력하기</h1>
    <ul>
        <li>th:text 사용 <span th:text="${data}"></span></li>
        <li>컨텐츠 안에서 직접 출력하기 = [[${data}]]</li>
    </ul>

</body>

</html>
```
- Escape: HTML문서는 \<,\> 같은 특수문자를 기반으로 정의된다. 따라서 뷰 템플릿 으로 HTML 화면을 생성할 때는 출력하는 데이터에 이러한 특수 문자가 있는 것을 주의해서 사용해야 한다.<br>
—\> `"Hello <b>Spring!</b>"`
- 웹 브라우저: `Hello <b>Spring!</b>`
- 소스보기: `Hello &lt;b&gt;Spring!&lt;/b&gt;`
- HTML 엔티티: 웹브라우저는 `<` 를 HTML 테그의 시작으로 인식한다. 따라서`<` 를 테그의 시작이 아니라 문자로 표현할수 있는 방법이 필요한데, 이것을 HTML 엔티티라 한다. 그리고 이렇게 HTML에서 사용하는 특수 문자를 HTML 엔티티로 변경하는 것을 이스케이프(escape)라 한다. 그리고 타임리프가 제공하는 `th:text` , `[[...]]` 는 기본적으로 이스케이스(escape)를 제공한다.
- Unescape
	- `th:text` -\> `th:utext`
	- `[[...]]` -\> `[(...)]`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>

    <h1>text vs utext</h1>
    <ul>
        <li>th:text = <span th:text="${data}"></span></li>
        <li>th:utext = <span th:utext="${data}"></span></li>
    </ul>
    <h1><span th:inline="none">[[...]] vs [(...)]</span></h1>
    <ul>
        <li><span th:inline="none">[[...]] = </span>[[${data}]]</li>
        <li><span th:inline="none">[(...)] = </span>[(${data})]</li>
    </ul>
</body>

</html>
```
- escape를 기본으로 하고, 꼭 필요한 때만 unescape를 사용하자.


### 변수 - SpringEL

- 변수 표현식 : `${...}`

```html
<ul>Object
    <li>${user.username} = <span th:text="${user.username}"></span></li>
    <li>${user['username']} = <span th:text="{user['username']}"></span></li>
    <li>${user.getUsername()} = <span th:text="${user.getUsername()}"></span></li>
</ul>

<ul>List
    <li>${users[0].username} = <span th:text="${users[0].username}"></span></li>
    <li>${users[0]['username']} = <span th:text="${users[0]['username']}"></span></li>
    <li>${users[0].getUsername()} = <span th:text="${users[0].getUsername()}"></span></li>
</ul>

<ul>Map
    <li>${userMap['userA'].username} = <span th:text="${userMap['userA'].username}"></span></li>
    <li>${userMap['userA']['username']} = <span th:text="${userMap['userA']['username']}"></span></li>
    <li>${userMap['userA'].getUsername()} = <span th:text="${userMap['userA'].getUsername()}"></span></li>
</ul>
```

- 지역 변수 선언: `th:with` 를 사용하면 지역 변수를 선언해서 사용할 수 있다. 지역 변수는 선언한 테그 안에서만 사용할 수있다.

```html
<h1>지역 변수 - (th:with)</h1>
<div th:with="first=${users[0]}">
    <p>처음 사람의 이름은 <span th:text="${first.username}"></span></p>
</div>
```


### 기본 객체들
- `${#request}`, `${#response}`, `${#session}`,
`${#servletContext}`, `${#locale}`
- HTTP 요청 파라미터 접근: `param`(`${param.paramData}`)
- HTTP 세션 접근: `session`(`${session.sessionData}`)
- 스프링 빈 접근: `@`(`${@helloBean.hello('Spring!')}`)


### 유틸리티 객체와 날짜
`#temporals`: 자바8 날짜 서식 지원(타임리프에서 자바8 날짜인 `LocalDate` , `LocalDateTime` , `Instant` 를 사용하려면 추가 라이브러리가 필요하다. 스프링 부트 타임리프를 사용하면 해당 라이브러리가 자동으로 추가되고 통합된다.)
```html
<span th:text="${#temporals.format(localDateTime, 'yyyy-MM-dd HH:mm:ss')}"></span>
```


### URL 링크
타임리프에서 URL을 생성할 때는 `@{...}` 문법을 사용하면 된다.
```html
<li><a th:href="@{/hello}">basic url</a></li>
<li><a th:href="@{/hello(param1=${param1}, param2=${param2})}">hello query param</a></li>
<li><a th:href="@{/hello/{param1}/{param2}(param1=${param1}, param2=${param2})}">path variable</a></li>
<li><a th:href="@{/hello/{param1}(param1=${param1}, param2=${param2})}">path variable + query parameter</a></li>
```
- `()` 에 있는 부분은 쿼리 파라미터로 처리된다.
- URL 경로상에 변수가 있으면 `()` 부분은 경로 변수로 처리된다.
- 경로 변수와 쿼리 파라미터를 함께 사용할 수 있다.


### 리터럴
- 리터럴은 소스 코드상에 고정된 값을 말하는 용어이다. 
- 타임리프에서 문자 리터럴은 항상 `’` (작은 따옴표)로 감싸야 한다.

```html
<span th:text="'hello'">
```
- 공백없이쭉이어진다면하나의의미있는 토큰으로 인지해서 다음과 같이 작은 따옴표를 생략할 수 있다. (룰: `A-Z`, `a-z`, `0-9`, `[]`, `.`, `-`, `_`)

```html
<span th:text="hello">
```
---> 오류: 문자 리터럴은 원칙상 `'` 로 감싸야 한다. 중간에 공백이 있어서 하나의 의미있는 토큰으로도 인식되지 않는다.
```html
<span th:text="hello world!"></span>
```

```html
<li>'hello' + ' world!' = <span th:text="'hello' + ' world!'"></span></li> <li>'hello world!' = <span th:text="'hello world!'"></span></li>
<li>'hello ' + ${data} = <span th:text="'hello ' + ${data}"></span></li>
<li>리터럴 대체 |hello ${data}| = <span th:text="|hello ${data}|"></span></li>
```
- 리터럴 대체(Literal substitutions)

```html
<span th:text="|hello ${data}|">
```


### 연산
HTML안에서 사용하기 때문에 HTML 엔티티(escape)를 사용하는 부분만 주의하자.

- 조건식: 자바의 조건식과 유사하다.

```html
<li>(10 % 2 == 0)? '짝수':'홀수' = <span th:text="(10 % 2 == 0)? '짝수':'홀수'"></span></li>
```
- Elvis 연산자: 조건식의 편의 버전

```html
<li>${data}?: '데이터가 없습니다.' = <span th:text="${data}?: '데이터가 없습니다.'"></span></li>
```
- No-Operation: `_` 인 경우 마치 타임리프가 실행되지 않는 것 처럼 동작한다. 이것을 잘 사용하면 HTML 의 내용 그대로 활용할 수 있다.

```html
<li>${data}?: _ = <span th:text="${data}?: _">데이터가 없습니다.</span></li>
```


### 속성 값 설정
타임리프는 주로 HTML 태그에 `th:*` 속성을 지정하는 방식으로 동작한다. `th:*` 로 속성을 적용하면 기존 속성을 대체한다. 기존 속성이 없으면 새로 만든다.

```html
<input type="text" name="mock" th:name="userA" />
```
---> 타임리프 렌더링 후 `<input type="text" name="userA" />`


- `th:attrappend` : 속성 값의 뒤에 값을 추가한다.

```html
- th:attrappend = <input type="text" class="text" th:attrappend="class=' large'" /><br/>
```

- `th:attrprepend` : 속성 값의 앞에 값을 추가한다.

```html
- th:attrprepend = <input type="text" class="text" th:attrprepend="class='large '" /><br/>
```


- `th:classappend` : class 속성에 자연스럽게 추가한다.

```html
- th:classappend = <input type="text" class="text" th:classappend="large" / ><br/>
```
- checked 처리: HTML에서는 `<input type="checkbox" name="active" checked="false" />`   
---> 이 경우에도 checked 속성이 있기 때문에 checked 처리가 되어버린다.
- 타임리프의 `th:checked` 는 값이 `false` 인 경우 `checked` 속성 자체를 제거한다.

```html
<input type="checkbox" name="active" th:checked="false" />
```
—\> 타임리프 렌더링 후: `<input type="checkbox" name="active" />`


### 반복
타임리프에서 반복은 `th:each` 를 사용한다. 추가로 반복에서 사용할 수 있는 여러 상태 값을 지원한다.
```html
<table border="1">
      <tr>
          <th>username</th>
          <th>age</th>
      </tr>
      <tr th:each="user : ${users}">
          <td th:text="${user.username}">username</td>
          <td th:text="${user.age}">0</td>
      </tr>
</table>
```
—\> `th:each` 는 `List` 뿐만 아니라 배열, `java.util.Iterable` , `java.util.Enumeration` 을 구현한 모든 객체를 반복에 사용할 수 있습니다. `map` 도 사용할 수 있는데 이 경우 변수에 담기는 값은 `Map.Entry` 이다.
- 반복 상태 유지: `<tr th:each="user, userStat : ${users}">`
—\> 두번째 파라미터는 생략 가능한데, 생략하면 지정한 변수명( `user` ) + `Stat` 가 된다.여기서는 `user` + `Stat` = `userStat` 이므로 생략 가능하다.


```html
<table border="1">
    <tr>
        <th>count</th>
        <th>username</th>
        <th>age</th>
        <th>etc</th>
    </tr>
	<tr th:each="user, userStat : ${users}">
        <td th:text="${userStat.count}">username</td>
        <td th:text="${user.username}">username</td>
        <td th:text="${user.age}">0</td>
        <td>
            index = <span th:text="${userStat.index}"></span>
            count = <span th:text="${userStat.count}"></span>
            size = <span th:text="${userStat.size}"></span>
            even? = <span th:text="${userStat.even}"></span>
            odd? = <span th:text="${userStat.odd}"></span>
            first? = <span th:text="${userStat.first}"></span>
            last? = <span th:text="${userStat.last}"></span>
            current = <span th:text="${userStat.current}"></span>
        </td>
    </tr>
</table>
```


### 조건부 평가
`if`, `unless`(`if`의 반대), 조건이 `false` 인 경우 `<span>...<span>` 부분 자체가 렌더링 되지 않고 사라진다.
```html
<span th:text="'미성년자'" th:if="${user.age lt 20}"></span>
<span th:text="'미성년자'" th:unless="${user.age ge 20}"></span>
```

```html
<tr th:each="user, userStat : ${users}">
    <td th:text="${userStat.count}">1</td>
    <td th:text="${user.username}">username</td>
    <td th:switch="${user.age}">
        <span th:case="10">10살</span>
        <span th:case="20">20살</span>
        <span th:case="*">기타</span>
    </td>
</tr>
```


### 주석
1. 표준 HTML 주석: 자바스크립트의 표준 HTML 주석은 타임리프가 렌더링 하지 않고, 그대로 남겨둔다.(`<!-- `, `-->`)
2. 타임리프 파서 주석: 타임리프 파서 주석은 타임리프의 진짜 주석이다. 렌더링에서 주석 부분을 제거한다.(`<!--/* `, `*/-->`)
3. 타임리프 프로토타입 주석: 타임리프 프로토타입은 약간 특이한데, HTML 주석에 약간의 구문을 더했다. HTML 파일을 웹 브라우저에서 그대로 열어보면 HTML 주석이기 때문에 이 부분이 웹 브라우저가 렌더링하지 않는다. 타임리프 렌더링을 거치면 이 부분이 정상 렌더링 된다. 쉽게 이야기해서 HTML 파일을 그대로 열어보면 주석처리가 되지만, 타임리프를 렌더링 한 경우에만 보이는 기능이다.  
(`<!--/*-->`, `<!--*/-->`)


### 블록
`<th:block>` 은 HTML 태그가 아닌 타임리프의 유일한 자체 태그다. `<th:block>` 은 렌더링시 제거된다.

```html
<th:block th:each="user : ${users}">
    <div>
        사용자 이름1 <span th:text="${user.username}"></span>
        사용자 나이1 <span th:text="${user.age}"></span>
    </div>
    <div>
        요약 <span th:text="${user.username} + ' / ' + ${user.age}"></span>
    </div>
</th:block>
```


### 자바스크립트 인라인
타임리프는 자바스크립트에서 타임리프를 편리하게 사용할 수 있는 자바스크립트 인라인 기능을 제공한다. 자바스크립트 인라인 기능은 다음과 같이 적용하면 된다. `<script th:inline="javascript">`

```html
<script th:inline="javascript">
    var username = [[${ user.username }]];
    var age = [[${ user.age }]];
    //자바스크립트 내추럴 템플릿
    var username2 = /*[[${user.username}]]*/ "test username";
    //객체
    var user = [[${ user }]];
</script>
```
- 인라인 사용 전 `var username = userA;`
- 인라인 사용 후` var username = "userA";`
- 자바스크립트에서문제가될 수 있는 문자가 포함되어 있으면 이스케이프 처리도 해준다. (`"` -\> `\"`)
- 자바스크립트 내추럴 템플릿: 자바스크립트 인라인 기능을 사용하면 주석을 활용해서 이 기능을 사용할 수 있다.(`var username2 = /*[[${user.username}]]*/ "test username";`)
	- 인라인 사용 전 `var username2 = /*userA*/ "test username";`
	- 인라인 사용 후 `var username2 = "userA";`
- 타임리프의 자바스크립트 인라인 기능을 사용하면 객체를 JSON으로 자동으로 변환해준다.
	- 인라인 사용 전 `var user = BasicController.User(username=userA, age=10);`
	- 인라인 사용 후 `var user = {"username":"userA","age":10};`
- 자바스크립트 인라인 each

```html
<script th:inline="javascript">
    [# th: each = "user, stat : ${users}"]
    var user[[${ stat.count }]] = [[${ user }]];
    [/]
</script>
```


### 템플릿 조각
웹 페이지를 개발할 때는 공통 영역이 많이 있다. 예를 들어서 상단 영역이나 하단 영역, 좌측 카테고리 등등 여러 페이지에서 함께 사용하는 영역들이 있다. 타임리프는 템플릿 조각과 레이아웃 기능을 지원한다.
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<body>
    <footer th:fragment="copy"> 푸터 자리 입니다.
    </footer>
    <footer th:fragment="copyParam (param1, param2)">
        <p>파라미터 자리 입니다.</p>
        <p th:text="${param1}"></p>
        <p th:text="${param2}"></p>
    </footer>
</body>

</html>
```

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <h1>부분 포함</h1>
    <h2>부분 포함 insert</h2>
    <div th:insert="~{template/fragment/footer :: copy}">
    </div>
    <h2>부분 포함 replace</h2>
    <div th:replace="~{template/fragment/footer :: copy}">
    </div>
    <h2>부분 포함 단순 표현식</h2>
    <div th:replace="template/fragment/footer :: copy">
    </div>
    <h1>파라미터 사용</h1>
    <div th:replace="~{template/fragment/footer :: copyParam ('데이터1', '데이터 2')}">
    </div>
</body>

</html>
```

- `th:insert` 를 사용하면 현재 태그( `div` ) 내부에 추가한다.

```html
<h2>부분 포함 insert</h2>
<div>
    <footer>
        푸터 자리 입니다.
    </footer>
</div>
```

- `th:replace` 를 사용하면 현재 태그( `div` )를 대체한다.

```html
<h2>부분 포함 replace</h2>
<footer>
    푸터 자리 입니다.
</footer>
```
- 부분 포함 단순 표현식: `~{...}` 를 사용하는 것이 원칙이지만 템플릿 조각을 사용하는 코드가 단순하면 이 부분을 생략할 수 있다.

```html
<h2>부분 포함 단순 표현식</h2>
<footer>
    푸터 자리 입니다.
</footer>
```
- 파라미터 사용

```html
<h1>파라미터 사용</h1>
<footer>
    <p>파라미터 자리 입니다.</p>
    <p>데이터1</p>
    <p>데이터2</p>
</footer>
```


### 템플릿 레이아웃1
`<head>` 에 공통으로 사용하는 `css` , `javascript` 같은 정보들이 있는데, 이러한 공통 정보들을 한 곳에 모아두고, 공통으로 사용하지만, 각 페이지마다 필요한 정보를 더 추가해서 사용하고 싶다면 다음과 같이 사용하면 된다.
```html
<html xmlns:th="http://www.thymeleaf.org">

<head th:fragment="common_header(title,links)">
    <title th:replace="${title}">레이아웃 타이틀</title>
    <!-- 공통 -->
    <link rel="stylesheet" type="text/css" media="all" th:href="@{/css/awesomeapp.css}">
    <link rel="shortcut icon" th:href="@{/images/favicon.ico}">
    <script type="text/javascript" th:src="@{/sh/scripts/codebase.js}"></script>
    <!-- 추가 -->
    <th:block th:replace="${links}" />
</head>
```

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head th:replace="template/layout/base :: common_header(~{::title},~{::link})">
    <title>메인 타이틀</title>
    <link rel="stylesheet" th:href="@{/css/bootstrap.min.css}">
    <link rel="stylesheet" th:href="@{/themes/smoothness/jquery-ui.css}">
</head>

<body> 메인 컨텐츠 </body>

</html>
```

```html
<!DOCTYPE html>
<html>

<head>
    <title>메인 타이틀</title>
    <!-- 공통 -->
    <link rel="stylesheet" type="text/css" media="all" href="/css/awesomeapp.css">
    <link rel="shortcut icon" href="/images/favicon.ico">
    <script type="text/javascript" src="/sh/scripts/codebase.js"></script>
    <!-- 추가 -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/themes/smoothness/jquery-ui.css">
</head>

<body> 메인 컨텐츠</body>

</html>
```

—\> 레이아웃 개념을 두고, 그 레이아웃에 필요한 코드 조각을 전달해서 완성하는 것으로 이해하면 된다.

### 템플릿 레이아웃2
앞서 이야기한 개념을 `<head>` 정도에만 적용하는게 아니라 `<html>` 전체에 적용할 수도 있다.
```html
<!DOCTYPE html>
<html th:fragment="layout (title, content)" xmlns:th="http://
  www.thymeleaf.org">

<head>
    <title th:replace="${title}">레이아웃 타이틀</title>
</head>

<body>
    <h1>레이아웃 H1</h1>
    <div th:replace="${content}">
        <p>레이아웃 컨텐츠</p>
    </div>
    <footer> 레이아웃 푸터</footer>
</body>

</html>
```

```html
<!DOCTYPE html>
<html th:replace="~{template/layoutExtend/layoutFile :: layout(~{::title}, ~{::section})}"
    xmlns:th="http://www.thymeleaf.org">

<head>
    <title>메인 페이지 타이틀</title>
</head>

<body>
    <section>
        <p>메인 페이지 컨텐츠</p>
        <div>메인 페이지 포함 내용</div>
    </section>
</body>

</html>
```

```html
<!DOCTYPE html>
<html>

<head>
    <title>메인 페이지 타이틀</title>
</head>

<body>
    <h1>레이아웃 H1</h1>

    <section>
        <p>메인 페이지 컨텐츠</p>
        <div>메인 페이지 포함 내용</div>
    </section>
    <footer>
        레이아웃 푸터
    </footer>
</body>

</html>
```


## 타임리프 - 스프링 통합과 폼
### 타임리프 스프링 통합
- 스프링 통합으로 추가되는 기능들
	1. 스프링의 SpringEL 문법 통합
	2. 편리한 폼 관리를 위한 추가 속성(`th:object`, `th:field`, `th:errors`, `th:errorclass`)
	3. 스프링의 메시지, 국제화 기능의 편리한 통합
	4. 스프링의 검증, 오류 처리 통합
	5. 스프링의 변환 서비스 통합(ConversionService)
- 설정 방법
	- 타임리프 템플릿 엔진을 스프링 빈에 등록하고, 타임리프용 뷰 리졸버를 스프링 빈으로 등록하는 방법
	- 스프링 부트는 이런 부분을 모두 자동화 해준다.(`build.gradle`)
    
```yaml
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
```
        
        
### 입력 폼 처리
- `th:object` : 커맨드 객체를 지정한다.
- `*{...}` : 선택 변수 식이라고 한다. th:object 에서 선택한 객체에 접근한다.
- `th:field` : HTML 태그의 `id` , `name` , `value` 속성을 자동으로 처리해준다.

```html
<form action="item.html" th:action th:object="${item}" method="post">
    <div>
        <label for="itemName">상품명</label>
        <input type="text" id="itemName" th:field="*{itemName}" class="form-control" placeholder="이름을 입력하세요"> 
    </div>
    <div>
        <label for="price">가격</label>
        <input type="text" id="price" th:field="*{price}" class="form-control" placeholder="가격을 입력하세요">
    </div> 
    <div>
        <label for="quantity">수량</label>
        <input type="text" id="quantity" th:field="*{quantity}" class="form-control" placeholder="수량을 입력하세요"> 
    </div>
</form>
```
- `id` : `th:field` 에서 지정한 변수 이름과 같다. `id="itemName”`
- `name` : `th:field` 에서 지정한 변수 이름과 같다. `name="itemName"`
- `value` : `th:field` 에서 지정한 변수의 값을 사용한다. `value=""`
- 렌더링 후

```html
<input type="text" id="itemName" class="form-control" placeholder="이름을 입력하세요" name="itemName" value="">
```


### 체크 박스 - 단일1
- 단순 HTML 체크 박스

```html
<hr class="my-4">
<!-- single checkbox -->
<div>판매 여부</div> 
<div>
    <div class="form-check">
        <input type="checkbox" id="open" name="open" class="form-check-input"> 
        <label for="open" class="form-check-label">판매 오픈</label>
    </div>
</div>
```
—\> 체크 박스를 체크하면 HTML Form에서 `open=on` 이라는 값이 넘어간다. 스프링은 `on` 이라는 문자를 `true` 타입으로 변환해준다. HTML에서 체크 박스를 선택하지 않고 폼을 전송하면 open 이라는 필드 자체가 서버로 전송되지 않는다.  

—\> HTML checkbox는 선택이 안되면 클라이언트에서 서버로 값 자체를 보내지 않는다. 수정의 경우에는 상황에 따라서 이 방식이 문제가 될 수 있다. 사용자가 의도적으로 체크되어 있던 값을 체크를 해제해도 저장시 아무 값도 넘어가지 않기 때문에, 서버 구현에 따라서 값이 오지 않은 것으로 판단해서 값을 변경하지 않을 수도 있다.  

—\> 이런 문제를 해결하기 위해서 스프링 MVC는 약간의 트릭을 사용하는데, 히든 필드를 하나 만들어서, `_open`처럼 기존 체크 박스 이름 앞에 언더스코어(`_`)를 붙여서 전송하면 체크를 해제했다고 인식할 수 있다. 히든 필드는 항상 전송된다. 따라서 체크를 해제한 경우 여기에서 open 은 전송되지 않고, `_open` 만 전송되는데, 이 경우 스프링 MVC는 체크를 해제(`open = false`)했다고 판단한다.

```html
<input type="hidden" name="_open" value="on"/>
```


### 체크 박스 - 단일2
타임리프가 제공하는 폼 기능을 사용하면 위와 같은 부분을 자동으로 처리할 수 있다.
```html
<!-- single checkbox -->
<div>판매 여부</div> 
<div>
    <div class="form-check">
        <input type="checkbox" id="open" th:field="*{open}" class="form-check-input">
        <label for="open" class="form-check-label">판매 오픈</label>
    </div>
</div>
```
—\> 타임리프 체크 박스 HTML 생성 결과
```html
<!-- single checkbox -->
<div>판매 여부</div> 
<div>
    <div class="form-check">
        <input type="checkbox" id="open" class="form-check-input" name="open" value="true">
        <input type="hidden" name="_open" value="on"/>
        <label for="open" class="form-check-label">판매 오픈</label>
    </div>
</div>
```
—\> 타임리프를 사용하면 체크 박스의 히든 필드와 관련된 부분도 함께 해결해준다. HTML 생성 결과를 보면 히든 필드 부분이 자동으로 생성되어 있다.

- item 상세보기의 경우

```html
<hr class="my-4">
<!-- single checkbox -->
<div>판매 여부</div> 
<div>
    <div class="form-check">
        <input type="checkbox" id="open" th:field="${item.open}" class="form-check-input" disabled>
        <label for="open" class="form-check-label">판매 오픈</label>
    </div>
</div>
``` 
<br>
—\> HTML 생성 결과
```html
<hr class="my-4">
<!-- single checkbox -->
<div class="form-check">
    <input type="checkbox" id="open" class="form-check-input" disabled name="open" value="true" checked="checked">
    <label for="open" class="form-check-label">판매 오픈</label>
</div>
```
타임리프의 체크 확인(`checked="checked"`): 체크 박스에서 판매 여부를 선택해서 저장하면, 조회시에 checked 속성이 추가된 것을 확인할 수 있다. 타임리프의 `th:field` 를 사용하면, 값이 `true` 인 경우 체크를 자동으로 처리해준다.


### 체크 박스 - 멀티
- `@ModelAttribute`의 특별한 사용법

```java
@ModelAttribute("regions")
public Map<String, String> regions() {
	Map<String, String> regions = new LinkedHashMap<>(); 
	regions.put("SEOUL", "서울");
	regions.put("BUSAN", "부산");
	regions.put("JEJU", "제주");
	return regions;
}
```
—\> `@ModelAttribute`는 이렇게 컨트롤러에 있는 별도의 메서드에 적용할 수 있다.

```html
<!-- multi checkbox -->
<div>
    <div>등록 지역</div>
    <div th:each="region : ${regions}" class="form-check form-check-inline">
        <input type="checkbox" th:field="*{regions}" th:value="${region.key}" class="form-check-input">
        <label th:for="${#ids.prev('regions')}" th:text="${region.value}" class="form-check-label">서울</label>
    </div>
</div>
```
- `th:for="${#ids.prev('open')}"`: 멀티 체크박스는 같은 이름의 여러 체크박스를 만들 수 있다. 그런데 문제는 이렇게 반복해서 HTML 태그를 생성할 때, 생성된 HTML 태그 속성에서 `name` 은 같아도 되지만, `id` 는 모두 달라야 한다. 따라서 타임리프는 체크박스를 `each`루프 안에서 반복해서 만들 때 임의로 1,2,3 숫자를 뒤에 붙여준다.

```html
<input type="checkbox" value="SEOUL" class="form-check-input" id="regions1" name="regions">
<input type="checkbox" value="BUSAN" class="form-check-input" id="regions2" name="regions">
<input type="checkbox" value="JEJU" class="form-check-input" id="regions3" name="regions">
```
 - HTML의 `id` 가 타임리프에 의해 동적으로 만들어지기 때문에 `<label for="id 값">` 으로 `label` 의 대상이 되는 id 값을 임의로 지정하는 것은 곤란하다. 타임리프는 `ids.prev(...)` , `ids.next(...)` 을 제공해서 동적으로 생성되는 `id` 값을 사용할 수 있도록 한다.

타임리프 HTML 생성 결과
```html
<!-- multi checkbox -->
<div>
    <div>등록 지역</div>
    <div class="form-check form-check-inline">
        <input type="checkbox" value="SEOUL" class="form-check-input" id="regions1" name="regions">
        <input type="hidden" name="_regions" value="on"/>
        <label for="regions1"class="form-check-label">서울</label>
    </div>
    <div class="form-check form-check-inline">
        <input type="checkbox" value="BUSAN" class="form-check-input" id="regions2" name="regions">
        <input type="hidden" name="_regions" value="on"/>
        <label for="regions2" class="form-check-label">부산</label>
    </div>
    <div class="form-check form-check-inline">
        <input type="checkbox" value="JEJU" class="form-check-input" id="regions3" name="regions">
        <input type="hidden" name="_regions" value="on"/>
        <label for="regions3" class="form-check-label">제주</label>
    </div>
</div>
<!-- -->
```
- 타임리프의 체크 확인(`checked="checked"`): 타임리프는 `th:field` 에 지정한 값과 `th:value` 의 값을 비교해서 체크를 자동으로 처리해준다.


### 라디오 버튼

```java
@ModelAttribute("itemTypes")
public ItemType[] itemTypes() {
	return ItemType.values();
}
```

```html
<!-- radio button -->
<div>
    <div>상품 종류</div>
    <div th:each="type : ${itemTypes}" class="form-check form-check-inline">
        <input type="radio" th:field="*{itemType}" th:value="${type.name()}" class="form-check-input">
        <label th:for="${#ids.prev('itemType')}" th:text="${type.description}" class="form-check-label"> BOOK </label>
    </div>
</div>
```
<br>

타임리프로 생성된 HTML
```html
<!-- radio button -->
<div>
    <div>상품 종류</div>
    <div class="form-check form-check-inline">
        <input type="radio" value="BOOK" class="form-check-input" id="itemType1" name="itemType">
        <label for="itemType1" class="form-check-label">도서</label>
    </div>
    <div class="form-check form-check-inline">
        <input type="radio" value="FOOD" class="form-check-input" id="itemType2" name="itemType" checked="checked">
        <label for="itemType2" class="form-check-label">식품</label>
    </div>
    <div class="form-check form-check-inline">
        <input type="radio" value="ETC" class="form-check-input" id="itemType3" name="itemType">
        <label for="itemType3" class="form-check-label">기타</label> 
    </div>
</div>
```

### 셀렉트 박스
```java
@ModelAttribute("deliveryCodes")
public List<DeliveryCode> deliveryCodes() {
	List<DeliveryCode> deliveryCodes = new ArrayList<>(); 
	deliveryCodes.add(new DeliveryCode("FAST", "빠른 배송")); 
	deliveryCodes.add(new DeliveryCode("NORMAL", "일반 배송")); 
	deliveryCodes.add(new DeliveryCode("SLOW", "느린 배송")); 
	return deliveryCodes;
}
```

```html
<!-- SELECT -->
<div>
    <div>배송 방식</div>
    <select th:field="*{deliveryCode}" class="form-select">
        <option value="">==배송 방식 선택==</option>
        <option th:each="deliveryCode : ${deliveryCodes}" th:value="${deliveryCode.code}"
            th:text="${deliveryCode.displayName}">FAST</option>
    </select>
</div>

<hr class="my-4">
```
<br>

타임리프로 생성된 HTML
```html
<!-- SELECT -->
<div>
    <div>배송 방식</div>
    <select class="form-select" id="deliveryCode" name="deliveryCode"> 
        <option value="">==배송 방식 선택==</option>
        <option value="FAST" selected="selected">빠른 배송</option> 
        <option value="NORMAL">일반 배송</option>
        <option value="SLOW">느린 배송</option> 
    </select>
</div>
```

[1]: https://www.inflearn.com/course/스프링-mvc-2/dashboard
