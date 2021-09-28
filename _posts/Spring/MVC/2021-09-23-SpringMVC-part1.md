---
title: "[Spring][MVC] SpringMVC-part1"
last\_modified\_at: 2021-09-23T 12:06 +09:00
header:
  overlay\_color: "#333"
MVC_1:
    - url: /assets/images/post/Spring/MVC/part1/1.png
      image_path: /assets/images/post/Spring/MVC/part1/1.png
MVC_2:
    - url: /assets/images/post/Spring/MVC/part1/2.png
      image_path: /assets/images/post/Spring/MVC/part1/2.png
MVC_3:
    - url: /assets/images/post/Spring/MVC/part1/3.png
      image_path: /assets/images/post/Spring/MVC/part1/3.png
MVC_4:
    - url: /assets/images/post/Spring/MVC/part1/4.png
      image_path: /assets/images/post/Spring/MVC/part1/4.png
MVC_5:
    - url: /assets/images/post/Spring/MVC/part1/5.png
      image_path: /assets/images/post/Spring/MVC/part1/5.png
MVC_6:
    - url: /assets/images/post/Spring/MVC/part1/6.png
      image_path: /assets/images/post/Spring/MVC/part1/6.png
MVC_7:
    - url: /assets/images/post/Spring/MVC/part1/7.png
      image_path: /assets/images/post/Spring/MVC/part1/7.png
MVC_8:
    - url: /assets/images/post/Spring/MVC/part1/8.png
      image_path: /assets/images/post/Spring/MVC/part1/8.png
MVC_9:
    - url: /assets/images/post/Spring/MVC/part1/9.png
      image_path: /assets/images/post/Spring/MVC/part1/9.png
MVC_10:
    - url: /assets/images/post/Spring/MVC/part1/10.png
      image_path: /assets/images/post/Spring/MVC/part1/10.png
MVC_11:
    - url: /assets/images/post/Spring/MVC/part1/11.png
      image_path: /assets/images/post/Spring/MVC/part1/11.png

categories:
  - Spring/MVC
tags:
  - MVC
  - Spring
---
## 들어가며 
해당 게시글은 인프런 김영한 강사님의 [스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 웹 애플리케이션 이해


### 웹 서버, 웹 애플리케이션 서버
- HTTP 기반
- 서버간에 데이터를 주고 받을 때도 대부분 HTTP 사용
- 웹 서버: HTTP 기반으로 동작(NGINX, APACHE)
- 웹 애플리케이션 서버(WAS): HTTP 기반으로 동작, 정적 리소스 + **프로그램 코드를 실행해서 애플리케이션 로직 수행**
	- 동적 HTML, REST API, 서블릿, JSP, 스프링 MVC
	- Tomcat, Jetty, Undertow
- 자바는 서블릿 컨테이너 기능을 제공하면 WAS
- WAS는 애플리케이션 코드를 실행하는데 더 특화
- 웹 시스템 구성: WAS, DB
- 가장 비싼 애플리케이션 로직이 정적 리소스 떄문에 수행이 어려울 수 있음
- WAS 장애시 오류 화면도 노출 불가능
—\>  웹 시스템 구성: WEB + WAS + DB
- 정적 리소스는 웹 서버가 처리
- 웹 서버는 애플리케이션 로직같은 동적인 처리가 필요하면 WAS에 위임
- WAS, DB 장애시 WEB 서버가 오류 화면 제공 가능

{% include gallery id="MVC_1" %}


### WAS, 서블릿

{% include gallery id="MVC_2" %}

- 서블릿 컨테이너를 통해 우리는 의미있는 비즈니스 로직만 개발하면 된다.

```java
@WebServlet(name = "helloServlet", urlPatterns = "/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response){
	// 애플리케이션 로직
    } 
}
```
- HTTP 요청 정보를 편리하게 사용할 수 있는 HttpServletRequest
- HTTP 응답 정보를 편리하게 제공할 수 있는 HttpServletResponse
- 개발자는 HTTP 스펙을 매우 편리하게 사용
- WAS는 Request, Response 객체를 새로 만들어서 서블릿 객체 호출
- WAS는 Response 객체에 담겨있는 내용으로 HTTP 응답 정보를 생성
- 톰캣처럼 서블릿을 지원하는 WAS를 서블릿 컨테이너라고 함
- 서블릿 객체는 싱글톤으로 관리
	- 모든 고객 요청은 동일한 서블릿 객체 인스턴스에 접근
	- 공유 변수 사용 주의
- 동시 요청을 위한 멀티 쓰레드 처리 지원


### 동시 요청 - 멀티 쓰레드

{% include gallery id="MVC_3" %}

- 쓰레드는 한번에 하나의 코드 라인만 수행
- 동시 처리가 필요하면 쓰레드를 추가로 생성
- 요청 마다 쓰레드 생성
	- 장점: 
		 1. 동시 요청을 처리할 수 있다.
		2. 하나의 쓰레드가 지연 되어도, 나머지 쓰레드는 정상 동작한다.
	- 단점:
		1. 쓰레드는 생성 비용이 매우 비싸다.
		2. 쓰레드는 컨텍스트 스위칭 비용이 발생한다.
		3. 고객 요청이 너무 많이 오면, CPU, 메모리 임계점을 넘어서 서버가 죽을 수 있다. 
- 쓰레드 풀
	- 특징:
		 1. 필요한 쓰레드를 쓰레드 풀에 보관하고 관리한다.
		2. 쓰레드 풀에 생성 가능한 쓰레드의 최대치를 관리한다. 톰캣은 최대 200개 기본 설정 (변경 가능)
	- 사용:
		1. 쓰레드가 필요하면, 이미 생성되어 있는 쓰레드를 쓰레드 풀에서 꺼내서 사용한다.
		2. 사용을 종료하면 쓰레드 풀에 해당 쓰레드를 반납한다.
		3. 최대 쓰레드가 모두 사용중이면 요청을 거절하거나 대기하도록 설정할 수 있다.
	- 장점:
		1. 쓰레드가 미리 생성되어 있으므로, 쓰레드를 생성하고 종료하는 비용(CPU)이 절약되고, 응답 시간이 빠르다.
		2. 생성 가능한 쓰레드의 최대치가 있으므로 너무 많은 요청이 들어와도 기존 요청은 안전하게 처리할 수 있다. 
- **WAS의 주요 튜닝 포인트는 최대 쓰레드(max thread) 수이다.**
- 애플리케이션 로직의 복잡도, CPU, 메모리, IO 리소스 상황에 따라 적정 숫자 선택
—\> <u> 멀티 쓰레드에 대한 부분은 WAS가 처리, 멀티 쓰레드 환경이므로 싱글톤 객체(서블릿, 스프링 빈)는 주의해서 사용<u>


### HTTP API, CSR, SSR
- HTTP API
	- HTML이 아니라 데이터를 전달
	- 주로 JSON 형식 사용
	- 다양한 시스템에서 호출
- SSR(서버 사이드 렌더링): 서버에서 최종 HTML을 생성해서 클라이언트에 전달
- CSR(클라이언트 사이드 렌더링)
	- HTML 결과를 자바스크립트를 사용해 웹 브라우저에서 동적으로 생성해서 적용
	- 주로 동적인 화면에 사용, 웹 환경을 마치 앱 처럼 필요한 부분부분 변경할 수 있음
    
    
## 서블릿
서블릿은 톰캣 같은 웹 애플리케이션 서버를 직접 설치하고,그 위에 서블릿 코드를 클래스 파일로 빌드해서 올린 다음, 톰캣 서버를 실행하면 된다. 하지만 이 과정은 매우 번거롭다.
스프링 부트는 톰캣 서버를 내장하고 있으므로, 톰캣 서버 설치 없이 편리하게 서블릿 코드를 실행할 수 있다.


### Hello 서블릿
```java
@ServletComponentScan //서블릿 자동 등록 
@SpringBootApplication
public class ServletApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServletApplication.class, args);
    }
}
```

```java
@WebServlet(name = "helloServlet", urlPatterns = "/hello")
public class HelloServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("HelloServlet.service");
        System.out.println("request = " + request);
        System.out.println("response = " + response);
        String username = request.getParameter("username");
        System.out.println("username = " + username);
        response.setContentType("text/plain");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write("hello " + username);
    } 
}
```
- HTTP 요청을 통해 매핑된 URL이 호출되면 서블릿 컨테이너는 다음 메서드를 실행한다. <br> `protected void service(HttpServletRequest request, HttpServletResponse response)`


### HttpServletRequest
- 서블릿은 개발자가 HTTP 요청 메시지를 편리하게 사용할 수 있도록 개발자 대신에 HTTP 요청 메시지를 파싱한다. 그리고 그 결과를 HttpServletRequest 객체에 담아서 제공한다.
- 임시 저장소 기능: 해당 HTTP 요청이 시작부터 끝날 때 까지 유지되는 임시 저장소 기능
	- 저장: `request.setAttribute(name, value)`
	- 조회: `request.getAttribute(name)`
- 세션 관리 기능: `request.getSession(create: true)`


### HTTP 요청 데이터 - 개요
- GET - 쿼리 파라미터
	- /url?username=hello&age=20
	- 메시지 바디 없이, URL의 쿼리 파라미터에 데이터를 포함해서 전달
- POST - HTML Form
	- content-type: application/x-www-form-urlencoded
	- 메시지 바디에 쿼리 파리미터 형식으로 전달 username=hello&age=20
- HTTP message body에 데이터를 직접 담아서 요청
	-  HTTP API에서 주로 사용, **JSON**, XML, TEXT
	- POST, PUT, PATCH
    
    
### HTTP 요청 데이터 - GET 쿼리 파라미터
- 서버에서는 `HttpServletRequest` 가 제공하는 다음 메서드를 통해 쿼리 파라미터를 편리하게 조회할 수 있다.

```java
String username = request.getParameter("username"); //단일 파라미터 조회
Enumeration<String> parameterNames = request.getParameterNames(); //파라미터 이름들 모두 조회
Map<String, String[]> parameterMap = request.getParameterMap(); //파라미터를 Map 으로 조회
String[] usernames = request.getParameterValues("username"); //복수 파라미터 조회
```
- 중복일 때 `request.getParameter()` 를 사용하면`request.getParameterValues()` 의 첫 번째 값을 반환한다.


### HTTP 요청 데이터 - POST HTML Form
- content-type: `application/x-www-form-urlencoded`
- 메시지 바디에 **쿼리 파리미터** 형식으로 데이터를 전달한다. username=hello&age=20
- `application/x-www-form-urlencoded` 형식은 앞서 GET에서 살펴본 쿼리 파라미터 형식과 같다. 따라서 쿼리 파라미터 조회 메서드를 그대로 사용하면 된다.
- **GET URL 쿼리 파라미터 형식**으로 클라이언트에서 서버로 데이터를 전달할 때는 HTTP 메시지 바디를 사용하지 않기 때문에 content-type이 없다.


### HTTP 요청 데이터 - API 메시지 바디(단순 텍스트)
- HTTP message body에 데이터를 직접 담아서 요청
- HTTP 메시지 바디의 데이터를 InputStream을 사용해서 직접 읽을 수 있다.

```java
ServletInputStream inputStream = request.getInputStream();
String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
```
- inputStream은 byte 코드를 반환한다. byte 코드를 우리가 읽을 수 있는 문자(String)로 보려면 문자표(Charset)를 지정해주어야 한다. 여기서는 UTF\_8 Charset을 지정해주었다.\_


### HTTP 요청 데이터 - API 메시지 바디(JSON)
- content-type: application/json
- message body: {"username": "hello", "age": 20}

```java
private ObjectMapper objectMapper = new ObjectMapper();
ServletInputStream inputStream = request.getInputStream();
String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
HelloData helloData = objectMapper.readValue(messageBody, HelloData.class);
```
- JSON 결과를 파싱해서 사용할 수 있는 자바 객체로 변환하려면 Jackson, Gson 같은 JSON 변환 라이브러리를 추가해서 사용해야 한다. 스프링 부트로 Spring MVC를 선택하면 기본으로 Jackson 라이브러리<br>( `ObjectMapper` )를 함께 제공한다.


### HttpServletResponse - 기본 사용법
- HTTP 응답 메시지 생성
- 편의 기능 제공(Content-Type, 쿠키, Redirect)

```java
response.setStatus(HttpServletResponse.SC_OK); //200
response.setHeader("Content-Type", "text/plain;charset=utf-8");
response.setHeader("Cache-Control", "no-cache, no-store, 
must-revalidate");
response.setHeader("Pragma", "no-cache");
response.setHeader("my-header","hello");
response.setContentType("text/plain");
response.setCharacterEncoding("utf-8");
Cookie cookie = new Cookie("myCookie", "good");
cookie.setMaxAge(600); //600초
response.addCookie(cookie);
response.sendRedirect("/basic/hello-form.html");
PrintWriter writer = response.getWriter();
writer.println("ok");
```


### HTTP 응답 데이터
- 단순 텍스트 응답: 앞에서 살펴봄 `writer.println("ok");`
- HTML 응답: HTTP 응답으로 HTML을 반환할 때는 content-type을 text/html 로 지정해야 한다.
- HTTP API: MessageBody JSON 응답(HTTP 응답으로 JSON을 반환할 때는 content-type을 application/json 로 지정해야 한다. Jackson 라이브러리가 제공하는 `objectMapper.writeValueAsString()` 를 사용하면 객체를 JSON 문자로 변경할 수 있다.)

```java
HelloData data = new HelloData();
data.setUsername("kim");
data.setAge(20);
String result = objectMapper.writeValueAsString(data);
response.getWriter().write(result);
```


## 서블릿, JSP, MVC 패턴


### 템플릿 엔진으로
서블릿을 이용한 자바 코드로 HTML을 만들어 내는 것 보다 차라리 HTML 문서에 동적으로 변경해야 하는 부분만 자바 코드를 넣을 수 있다면 더 편리할 것이다. 이것이 바로 템플릿 엔진이 나온 이유이다. 템플릿 엔진을 사용하면 HTML 문서에서 필요한 곳만 코드를 적용해서 동적으로 변경할 수 있다.
템플릿 엔진에는 JSP, Thymeleaf, Freemarker, Velocity등이 있다.


### 서블릿과 JSP의 한계
서블릿으로 개발할 때는 뷰(View)화면을 위한 HTML을 만드는 작업이 자바 코드에 섞여서 지저분하고 복잡하다. JSP를 사용하는 경우 뷰를 생성하는 HTML 작업을 깔끔하게 가져가고, 중간중간 동적으로 변경이 필요한 부분에만 자바 코드를 적용한다. 그런데 이렇게 해도 해결되지 않는 몇가지 고민이 남는다.
—\> JAVA 코드, 데이터를 조회하는 리포지토리 등등 다양한 코드가 모두 JSP에 노출되어 있으며 JSP가 너무 많은 역할을 한다.(유지보수 어려움)


### MVC 패턴의 등장
비즈니스 로직은 서블릿 처럼 다른곳에서 처리하고, JSP는 목적에 맞게 HTML로 화면(View)을 그리는 일에 집중하도록 하자.


### MVC 패턴 - 개요


#### 너무 많은 역할
하나의 서블릿이나 JSP만으로 비즈니스 로직과 뷰 렌더링까지 모두 처리하게 되면, 너무 많은 역할을 하게되고, 결과적으로 유지보수가 어려워진다.


#### 변경의 라이프 사이클
UI 를 일부 수정하는 일과 비즈니스 로직을 수정하는 일은 각각 다르게 발생할 가능성이 매우 높고 대부분 서로에게 영향을 주지 않는다. 이렇게 변경의 라이프 사이클이 다른 부분을 하나의 코드로 관리하는 것은 유지보수하기 좋지 않다.


#### Model View Controller
MVC 패턴은 하나의 서블릿이나, JSP로 처리하던 것을 컨트롤러(Controller)와 뷰(View)라는 영역으로 서로 역할을 나눈 것을 말한다. 웹 애플리케이션은 보통 이 MVC 패턴을 사용한다.
- 컨트롤러: HTTP 요청을 받아서 파라미터를 검증하고, 비즈니스 로직을 실행한다. 그리고 뷰에 전달할 결과 데이터를 조회해서 모델에 담는다.
- 모델: 뷰에 출력할 데이터를 담아둔다. 뷰가 필요한 데이터를 모두 모델에 담아서 전달해주는 덕분에 뷰는 비즈니스 로직이나 데이터 접근을 몰라도 되고, 화면을 렌더링 하는 일에 집중할 수 있다.
- 뷰: 모델에 담겨있는 데이터를 사용해서 화면을 그리는 일에 집중한다. 여기서는 HTML을 생성하는 부분을 말한다.
—\> 일반적으로 비즈니스 로직은 서비스(Service)라는 계층을 별도로 만들어서 처리한다. 그리고 컨트롤러는 비즈니스 로직이 있는 서비스를 호출하는 담당한다. 경우에 따라 Repository를 바로 호출할 수도 있다.


### MVC 패턴 - 적용
서블릿을 컨트롤러로 사용하고, JSP를 뷰로 사용하며 HttpServletRequest 객체를 Model
로 사용하여 MVC 패턴을 적용해보자.

```java
String viewPath = "/WEB-INF/views/new-form.jsp";
RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
dispatcher.forward(request, response);
```

- `dispatcher.forward()` : 다른 서블릿이나 JSP로 이동할 수 있는 기능이다. 서버 내부에서 다시 호출이 발생한다.

| redirect | forward |
| :---: | :---: |
| 리다이렉트는 실제 클라이언트(웹 브라우저)에 응답이 나갔다가, 클라이언트가 redirect 경로로 다시 요청한다. 따라서 클라이언트가 인지할 수 있고, URL 경로도 실제로 변경된다. | 포워드는 서버 내부에서 일어나는 호출이기 때문에 클라이언트가 전혀 인지하지 못한다. |


### MVC 패턴 - 한계
- 포워드 중복: View로 이동하는 코드가 항상 중복 호출되어야 한다.

```java
RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
dispatcher.forward(request, response);
```
- 공통 처리: 기능이 복잡해질수록 컨트롤러에서 공통으로 처리해야 하는 부분이 점점 더 많이 증가한다. 이 문제를 해결하려면 컨트롤러 호출 전에 먼저 공통 기능을 처리해야 한다. <br>
—\> 프론트 컨트롤러(Front Controller) 패턴을 도입하면 이런 문제를 깔끔하게 해결할 수 있다. 스프링 MVC의 핵심도 바로 이 프론트 컨트롤러에 있다.


## MVC 프레임워크 만들기


### FrontController 패턴

{% include gallery id="MVC_4" %}

- 프론트 컨트롤러 서블릿 하나로 클라이언트의 요청을 받음
- 프론트 컨트롤러가 요청에 맞는 컨트롤러를 찾아서 호출
- 공통 처리 가능
- 프론트 컨트롤러를 제외한 나머지 컨트롤러는 서블릿을 사용하지 않아도 됨
—\> 스프링 웹 MVC의 핵심도 바로 FrontController이다. 스프링 웹 MVC의 **DispatcherServlet**이 FrontController 패턴으로 구현되어 있음


### 프론트 컨트롤러 도입 - v1

{% include gallery id="MVC_5" %}

### View 분리 - v2

{% include gallery id="MVC_6" %}

### Model 추가 - v3

{% include gallery id="MVC_7" %}

- 서블릿 종속성 제거: 컨트롤러 입장에서 HttpServletRequest, HttpServletResponse이 꼭 필요하지 않다. 요청 파라미터 정보는 자바의 Map으로 대신 넘기도록 하면 컨트롤러가 서블릿 기술을 몰라도 동작할 수 있다. request 객체를 Model로 사용하는 대신에 별도의 Model 객체를 만들어서 반환하면 된다.
-  뷰 이름 중복 제거: 컨트롤러는 **뷰의 논리 이름**을 반환하고, 실제 물리 위치의 이름은 프론트 컨트롤러에서 처리하도록 단순화 하자.


### 단순하고 실용적인 컨트롤러 - v4

{% include gallery id="MVC_8" %}

- 좋은 프레임워크는 아키텍처도 중요하지만, 그와 더불어 실제 개발하는 개발자가 단순하고 편리하게 사용할 수 있어야 한다. 소위 실용성이 있어야 한다.
- 기본적인 구조는 V3와 같다. 대신에 컨트롤러가 ModelView 를 반환하지 않고, ViewName 만 반환한다.
- 컨트롤러에 model 객체는 파라미터로 전달되기 때문에 그냥 사용하면 되고, 결과로 뷰의 이름만 반환해주면 된다.


### 유연한 컨트롤러 - v5

{% include gallery id="MVC_9" %}

- 어댑터 패턴: 지금까지 우리가 개발한 프론트 컨트롤러는 한가지 방식의 컨트롤러 인터페이스만 사용할 수 있다. v3과 v4는 완전히 다른 인터페이스여서 호환이 불가능하다. 이럴 때 사용하는 것이 바로 어댑터이다. 어댑터 패턴을 사용해서 프론트 컨트롤러가 다양한 방식의 컨트롤러를 처리할 수 있도록 변경 가능하다.
- 핸들러 어댑터: 중간에 어댑터 역할을 하는 어댑터가 추가되었는데 이름이 핸들러 어댑터이다. 여기서 어댑터 역할을 해주는 덕분에 다양한 종류의 컨트롤러를 호출할 수 있다.
- 핸들러: 컨트롤러의 이름을 더 넓은 범위인 핸들러로 변경했다. 그 이유는 이제 어댑터가 있기 때문에 꼭 컨트롤러의 개념 뿐만 아니라 어떠한 것이든 해당하는 종류의 어댑터만 있으면 다 처리할 수 있기 때문이다.
- 어탭터는 모델 객체를 생성하여 컨틀롤러로 넘겨주고 컨트롤러는 모델의 데이터를 담음과 동시에 뷰의 논리 이름을 반환한다. 어탭터는 이것을 `ModelView`로 만들어서 형식을 맞추어 FrontController(DispatcherServlet)에 반환한다.


## 스프링 MVC - 구조 이해


### 스프링 MVC 전체 구조
- DispacherServlet 서블릿 등록
	- `DispacherServlet` 도 부모 클래스에서 `HttpServlet` 을 상속 받아서 사용하고, 서블릿으로 동작한다.
	- 스프링 부트는 `DispacherServlet` 을 서블릿으로 자동으로 등록하면서 모든 경로`(urlPatterns="/")`에 대해서 매핑한다.
- 요청 흐름
	- 서블릿이 호출되면 `HttpServlet` 이 제공하는 `serivce()` 가 호출된다.
	- 스프링 MVC는 `DispatcherServlet` 의 부모인 `FrameworkServlet` 에서 `service()` 를 오버라이드 해두었다.
	- `DispacherServlet.doDispatch()` 가 호출된다.
    
    
#### 동작 순서
1. 핸들러 조회: 핸들러 매핑을 통해 요청 URL에 매핑된 핸들러(컨트롤러)를 조회한다.
2. 핸들러 어댑터 조회: 핸들러를 실행할 수 있는 핸들러 어댑터를 조회한다.
3. 핸들러 어댑터 실행: 핸들러 어댑터를 실행한다.
4. 핸들러 실행: 핸들러 어댑터가 실제 핸들러를 실행한다.
5. ModelAndView 반환: 핸들러 어댑터는 핸들러가 반환하는 정보를 ModelAndView로 변환해서 반환한다.
6. viewResolver 호출: 뷰 리졸버를 찾고 실행한다.
7. View반환: 뷰 리졸버는 뷰의 논리 이름을 물리 이름으로 바꾸고, 렌더링 역할을 담당하는 뷰 객체를 반환한다.
8. 뷰렌더링: 뷰를 통해서 뷰를 렌더링한다.


#### 주요 인터페이스 목록
1. 핸들러 매핑: `org.springframework.web.servlet.HandlerMapping`
2. 핸들러 어댑터: `org.springframework.web.servlet.HandlerAdapter`
3. 뷰 리졸버: `org.springframework.web.servlet.ViewResolver`
4. 뷰: `org.springframework.web.servlet.View`


### 핸들러 매핑과 핸들러 어댑터
- HandlerMapping

```yaml
0 = RequestMappingHandlerMapping : 애노테이션 기반의 컨트롤러인 @RequestMapping 에서 사용
1 = BeanNameUrlHandlerMapping : 스프링 빈의 이름으로 핸들러를 찾는다.
```

- HandlerAdapter

```yaml
0 = RequestMappingHandlerAdapter : 애노테이션 기반의 컨트롤러인@RequestMapping 에서 사용
1 = HttpRequestHandlerAdapter : HttpRequestHandler 처리
2 = SimpleControllerHandlerAdapter : Controller 인터페이스(애노테이션X, 과거에 사용) 처리
```


### 뷰 리졸버
스프링 부트는 `InternalResourceViewResolver` 라는 뷰 리졸버를 자동으로 등록하는데, 이때 `application.properties` 에 등록한`spring.mvc.view.prefix` , `spring.mvc.view.suffix` 설정 정보를 사용해서 등록한다.
- 스프링 부트가 자동 등록하는 뷰 리졸버

```yaml
1 = BeanNameViewResolver : 빈 이름으로 뷰를 찾아서 반환한다.
2 = InternalResourceViewResolver : JSP 를 처리할 수 있는 뷰를 반환한다.
```

- `InternalResourceViewResolver` 뷰 리졸버는 `InternalResourceView` 를 반환한다.
- `InternalResourceView` 는 JSP처럼 포워드 `forward()` 를 호출해서 처리할 수 있는 경우에 사용한다.
- `view.render()` 가 호출되고 `InternalResourceView` 는 `forward()` 를 사용해서 JSP를 실행한다.


### 스프링 MVC - 시작하기
- `RequestMappingHandlerMapping` 은 스프링 빈 중에서 `@RequestMapping` 또는 `@Controller` 가 클래스 레벨에 붙어 있는 경우에 매핑 정보로 인식한다.
- `@RequestMapping`
	- `RequestMappingHandlerMapping`
	- `RequestMappingHandlerAdapter`
	- 우선순위가 가장 높은 핸들러 매핑과 핸들러 어댑터이다.
	- 요청 정보를 매핑한다. 해당 URL이 호출되면 이 메서드가 호출된다. 애노테이션을 기반으로 동작하기 때문에, 메서드의 이름은 임의로 지으면 된다.
- `@Controller`
	- 스프링이 자동으로 스프링 빈으로 등록한다. (내부에 `@Component` 애노테이션이 있어서 컴포넌트 스캔의 대상이 됨)
	- 스프링 MVC에서 애노테이션 기반 컨트롤러로 인식한다.
    
    
### 스프링 MVC - 컨트롤러 통합
`@RequestMapping` 을 잘 보면 클래스 단위가 아니라 메서드 단위에 적용된 것을 확인할 수 있다. 따라서 컨트롤러 클래스를 유연하게 하나로 통합할 수 있다.

```java
@Controller
@RequestMapping("/springmvc/v2/members")
public class SpringMemberControllerV2 {
}
```


### 스프링 MVC - 실용적인 방식
- ViewName 직접 반환: 뷰의 논리 이름을 반환할 수 있다.
- Model 파라미터: `Model` 객체를 파라미터로 받을 수 있다.
- `@RequestParam` 사용: 스프링은 HTTP 요청 파라미터를 `@RequestParam` 으로 받을 수 있다. GET 쿼리 파라미터, POST Form 방식을 모두 지원한다.
- `@RequestMapping` -\> `@GetMapping`, `@PostMapping`


## 스프링 MVC - 기본 기능


### 요청 매핑
- `@RestController`
	- `@Controller` 는 반환 값이 String 이면 뷰 이름으로 인식된다. 그래서 뷰를 찾고 뷰가 랜더링 된다.
	- `@RestController` 는 반환 값으로 뷰를 찾는 것이 아니라, HTTP 메시지 바디에 바로 입력한다.
- `@RequestMapping("/hello-basic")`: `/hello-basic` URL 호출이 오면 이 메서드가 실행되도록 매핑한다.




- PathVariable 사용(변수명이 같으면 생략 가능)

```java
@GetMapping("/mapping/{userId}")
public String mappingPath(@PathVariable("userId") String data) {
    log.info("mappingPath userId={}", data);
    return "ok";
}
```

- 미디어 타입 조건 매핑 - HTTP 요청 Content-Type, consume

```java
@PostMapping(value = "/mapping-consume", consumes = "application/json")
public String mappingConsumes() {
    log.info("mappingConsumes");
    return "ok";
}
```
- 미디어 타입 조건 매핑 - HTTP 요청 Accept, produce

```java
@PostMapping(value = "/mapping-produce", produces = "text/html")
public String mappingProduces() {
    log.info("mappingProduces");
    return "ok";
}
```


### HTTP 요청 파라미터 - `@RequestParam`
- GET 쿼리 파리미터 전송 방식이든, POST HTML Form 전송 방식이든 둘다 형식이 같으므로 구분없이 조회할 수 있다. 이것을 간단히 요청 파라미터(request parameter) 조회라 한다.
- `String` , `int` , `Integer` 등의 단순 타입이면 `@RequestParam` 도 생략 가능

```java
@ResponseBody
@RequestMapping("/request-param-v4")
public String requestParamV4(String username, int age) {
    log.info("username={}, age={}", username, age);
    return "ok";
}
```
- `@RequestParam.required`: 파라미터 필수 여부, 기본값 `true`
-  파라미터 이름만 있고 값이 없는 경우 -\> 빈문자로 통과
- 기본형(primitive)에 null 입력: `@RequestParam(required = false) int age` -\> `null` 을 `int` 에 입력하는 것은 불가능(500 예외 발생) 하므로 `Integer` 로 변경하거나, 또는 다음에 나오는 `defaultValue` 사용
- 파라미터를 Map으로 조회하기 - requestParamMap

```java
@ResponseBody
@RequestMapping("/request-param-map")
public String requestParamMap(@RequestParam Map<String, Object> paramMap) {
    log.info("username={}, age={}", paramMap.get("username"), paramMap.get("age"));
    return "ok";
}
```
- 파라미터를 Map, MultiValueMap으로 조회할 수 있다.


### HTTP 요청 파라미터 - @ModelAttribute

```java
@ResponseBody
@RequestMapping("/model-attribute-v1")
public String modelAttributeV1(@ModelAttribute HelloData helloData) {
    log.info("username={}, age={}", helloData.getUsername(),
    helloData.getAge());
    return "ok";
}
```
- `HelloData` 객체를 생성한다.
- 요청 파라미터의 이름으로 `HelloData` 객체의 프로퍼티를 찾는다. 그리고 해당 프로퍼티의 setter를 호출해서 파라미터의 값을 입력(바인딩) 한다.
- `@ModelAttribute` 는 생략할 수 있다. 그런데 `@RequestParam` 도 생략할 수 있으니 혼란이 발생할 수 있다.
	 1. ` String` , `int` , `Integer` 같은 단순 타입 = `@RequestParam`
	2. 나머지 = `@ModelAttribute` (argument resolver 로 지정해둔 타입 외)
- 다음과 같은 코드를 자동으로 넣어준다

```java
model.addAttribute("helloData", hdlloData);
```
    
    
### HTTP 요청 메시지 - 단순 텍스트
- 요청 파라미터와 다르게, HTTP 메시지 바디를 통해 데이터가 직접 데이터가 넘어오는 경우는 `@RequestParam` , `@ModelAttribute` 를 사용할 수 없다.
- InputStream(Reader): HTTP 요청 메시지 바디의 내용을 직접 조회
- OutputStream(Writer): HTTP 응답 메시지의 바디에 직접 결과 출력
- `HttpEntity`

```java
@PostMapping("/request-body-string-v3")
public HttpEntity<String> requestBodyStringV3(HttpEntity<String> httpEntity) {
    String messageBody = httpEntity.getBody();
    log.info("messageBody={}", messageBody);
    return new HttpEntity<>("ok");
}
```
1. 메시지 바디 정보를 직접 조회
2. 메시지 바디 정보 직접 반환
3. `HttpEntity` 를 상속받은 다음 객체들도 같은 기능을 제공한다.
        - `RequestEntity`: HttpMethod, url 정보가 추가, 요청에서 사용
        - `ResponseEntity`: HTTP 상태 코드 설정 가능, 응답에서 사용
        
- `@RequestBody`

```java
@ResponseBody
@PostMapping("/request-body-string-v4")
public String requestBodyStringV4(@RequestBody String messageBody) {
    log.info("messageBody={}", messageBody);
    return "ok";
}
```


### HTTP 요청 메시지 - JSON
- `@RequestBody` 문자 변환

```java
@ResponseBody
@PostMapping("/request-body-json-v2")
public String requestBodyJsonV2(@RequestBody String messageBody) throws IOException {
    HelloData data = objectMapper.readValue(messageBody, HelloData.class);
    log.info("username={}, age={}", data.getUsername(), data.getAge());
    return "ok";
}
```
- `@RequestBody` 객체 변환

```java
@ResponseBody
@PostMapping("/request-body-json-v3")
public String requestBodyJsonV3(@RequestBody HelloData data) {
    log.info("username={}, age={}", data.getUsername(), data.getAge());
    return "ok";
}
```
- `HttpEntity`

```java
@ResponseBody
@PostMapping("/request-body-json-v4")
public String requestBodyJsonV4(HttpEntity<HelloData> httpEntity) {
    HelloData data = httpEntity.getBody();
    log.info("username={}, age={}", data.getUsername(), data.getAge());
    return "ok";
}
```
- `HttpEntity` , `@RequestBody` 를 사용하면 HTTP 메시지 컨버터가 HTTP 메시지 바디의 내용을 우리가 원하는 문자나 객체 등으로 변환해준다.

{% include  gallery id="MVC_10"  type="center"  %}

- `@RequestBody`는 생략 불가능: `@RequestBody` 를 생략하면`@ModelAttribute` 가 적용되어 버린다. 따라서 생략하면 HTTP 메시지 바디가 아니라 요청 파라미터를 처리하게 된다.

```java
@ResponseBody
@PostMapping("/request-body-json-v5")
public HelloData requestBodyJsonV5(@RequestBody HelloData data) {
    log.info("username={}, age={}", data.getUsername(), data.getAge());
    return data;
}
```
- `@RequestBody` 요청: JSON 요청 -\> HTTP 메시지 컨버터 -\> 객체
- `@ResponseBody` 응답: 객체 -\> HTTP 메시지 컨버터 -\> JSON 응답


### HTTP 응답 - 정적 리소스, 뷰 템플릿
1. 정적 리소스: 웹 브라우저에 정적인 HTML, css, js을 제공할 때는, 정적 리소스를 사용한다.
2. 뷰 템플릿 사용: 웹 브라우저에 동적인 HTML을 제공할 때는 뷰 템플릿을 사용한다.
3. HTTP 메시지 사용: HTTP API를 제공하는 경우에는 HTML이 아니라 데이터를 전달해야 하므로, HTTP 메시지 바디에 JSON 같은 형식으로 데이터를 실어 보낸다.

```yaml
implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
```
- 스프링 부트가 자동으로 `ThymeleafViewResolver` 와 필요한 스프링 빈들을 등록한다. 그리고 다음 설정도 사용한다. 이 설정은 기본 값 이기 때문에 변경이 필요할 때만 설정하면 된다.

```yaml
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
```


### HTTP 응답 - HTTP API, 메시지 바디에 직접 입력
1. `ResponseEntity`

```java
@GetMapping("/response-body-string-v2")
public ResponseEntity<String> responseBodyV2() {
    return new ResponseEntity<>("ok", HttpStatus.OK);
}
```

```java
@GetMapping("/response-body-json-v1")
public ResponseEntity<HelloData> responseBodyJsonV1() {
    HelloData helloData = new HelloData();
    helloData.setUsername("userA");
    helloData.setAge(20);
    return new ResponseEntity<>(helloData, HttpStatus.OK);
}
```
`ResponseEntity` 를 반환한다. **HTTP 메시지 컨버터**를 통해서 JSON 형식으로 변환되어서 반환된다.

2. `@ResponseBody`

```java
@ResponseBody
@GetMapping("/response-body-string-v3")
public String responseBodyV3() {
    return "ok";
}
```

```java
@ResponseStatus(HttpStatus.OK)
@ResponseBody
@GetMapping("/response-body-json-v2")
public HelloData responseBodyJsonV2() {
    HelloData helloData = new HelloData();
    helloData.setUsername("userA");
    helloData.setAge(20);
    return helloData;
}
```
`@ResponseBody` 를 사용하면 view를 사용하지 않고, HTTP 메시지 컨버터를 통해서 HTTP 메시지를 직접 입력할 수 있다.




### HTTP 메시지 컨버터(`HttpMessageConverter`)
- 기본 문자처리: `StringHttpMessageConverter`
- 기본 객체처리: `MappingJackson2HttpMessageConverter`
- 요청의 경우 파라미터 클래스 타입과 Content-Type 미디어 타입을 조합해서 `HttpMessageConverter` 가 선택된다.
- 응답의 경우 클라이언트의 HTTP Accept 해더와 서버의 컨트롤러 반환 타입 정보 둘을 조합해서 `HttpMessageConverter` 가 선택된다.
- 스프링 MVC는 다음의 경우에 HTTP 메시지 컨버터를 적용한다.
	1. HTTP 요청: `@RequestBody` , `HttpEntity(RequestEntity)`
	2. HTTP 응답: `@ResponseBody` , `HttpEntity(ResponseEntity)`
- HTTP 메시지 컨버터 인터페이스(스프링 부트 기본 메시지 컨버터)

```yaml
0 = ByteArrayHttpMessageConverter
1 = StringHttpMessageConverter
2 = MappingJackson2HttpMessageConverter
```


### 요청 매핑 헨들러 어뎁터 구조

{% include gallery id="MVC_11" %}

- `ArgumentResolver`: 애노테이션 기반 컨트롤러를 처리하는 `RequestMappingHandlerAdaptor` 는 바로 이 `ArgumentResolver` (`HandlerMethodArgumentResolver`)를 호출해서 컨트롤러(핸들러)가 필요로 하는 다양한 파라미터의 값(객체)을 생성한다. 그리고 이렇게 파리미터의 값이 모두 준비되면 컨트롤러를 호출하면서 값을 넘겨준다.
- `ReturnValueHandler`: `HandlerMethodReturnValueHandler` 를 줄여서 `ReturnValueHandler` 라 부른다. `ArgumentResolver` 와 비슷한데, 이것은 응답 값을 변환하고 처리한다.
- 요청의 경우 `@RequestBody` 를 처리하는 `ArgumentResolver` 가 있고, `HttpEntity` 를 처리하는 `ArgumentResolver` 가 있다. 이`ArgumentResolver` 들이 HTTP 메시지 컨버터를 사용해서 필요한 객체를 생성한다.
- 응답의 경우 `@ResponseBody` 와 `HttpEntity` 를 처리하는 `ReturnValueHandler` 가 있다. 그리고 여기에서 HTTP 메시지 컨버터를 호출해서 응답 결과를 만든다.
- 스프링은 다음을 모두 인터페이스로 제공한다. 따라서 필요하면 언제든지 기능을 확장할 수 있다.
	1. `HandlerMethodArgumentResolver`
	2. `HandlerMethodReturnValueHandler`
	3. `HttpMessageConverter`
    
    
### RedirectAttributes
```java
@PostMapping("/add")
public String addItemV6(Item item, RedirectAttributes redirectAttributes) {
    Item savedItem = itemRepository.save(item);
    redirectAttributes.addAttribute("itemId", savedItem.getId());
    redirectAttributes.addAttribute("status", true);
    return "redirect:/basic/items/{itemId}";
}
```
`RedirectAttributes` 를 사용하면 URL 인코딩도 해주고, `pathVarible` , 쿼리 파라미터까지 처리해준다.

[1]: https://www.inflearn.com/course/스프링-mvc-1/dashboard
