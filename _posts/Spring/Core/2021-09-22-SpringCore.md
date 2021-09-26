---
title: "[Spring][Core] 스프링 핵심 원리"
last\_modified\_at: 2021-09-22T 12:06 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Core
tags:
  - Object-oriented
  - Spring
---
## 들어가며 
해당 게시글은 인프런 김영한 강사님의 [스프링 핵심 원리 - 기본편][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.
## 객체 지향 설계와 스프링
### 좋은 객체 지향 프로그래밍
- 스프링은 객체 지향 언어가 가진 강력한 특징을 살려내는 프레임워크
- 객체 지향 언어의 특징: 캡슐화, <u>다형성</u>, 추상화, 상속
- 역할과 구현의 분리 -\> 인터페이스와 구현클래스
- 다형성으로 인터페이스를 구현한 객체(서버 기능 구현)를 실행 시점에 유연하게 변경
- 확장 가능한 설계, 클라이언트에 영향을 주지 않는 구현클래스의 변경
- 스프링에서 이야기하는 제어의 역전, 의존관계 주입은 다형성을 활용해서 역할과 구현을 편리하게 다룰 수 있도록 지원

### 좋은 객체 지향 설계의 5가지 원칙(SOLID)
- SRP: 단일 책임 원칙(변경이 있을 때 파급 효과가 적으면 단일 책임 원칙을 잘 따른 것)
- OCP: 개방-폐쇄 원칙(확장에는 열려 있으나 변경에는 닫혀 있어야 한다. 이를 위해서는 서비스 로직에서  클라이언트 본인이 구현클래스에 의존하면 안된다)
- LSP: 리스코프 치환 원칙(다형성에서 구현클래스는 인터페이스 규약과 기능을 다 지켜야 한다는 것)
- ISP: 인터페이스 분리 원칙(수 많은 기능을 포함하는 범용 인터페이스보다 특정 클라이언트를 위한 인터페이스 지향)
- DIP: 의존관계 역전 원칙(추상화에 의존해야 하며 구체화에 의존하면 안된다. 즉 구현클래스가 아닌 인터페이스에만 의존해야 한다.)

다형성 만으로는 서비스 로직에서 인터페이스 <u>뿐만 아니라</u> 구현클래스에도 의존하므로 구현클래스가 달라지는 경우 코드변경이 일어나 OCP, DIP를 지킬 수 없다.
### 객체 지향 설계와 스프링
- 스프링은 DI 기술(DI 컨테이너)로 다형성 + OCP, DIP를 가능하게 지원
- 즉 클라이언트 코드의 변경 없이 기능 확장 지원

## IoC(제어의 역전), DI, 그리고 컨테이너
### 제어의 역전
- 사용 영역과 구성 영역의 분리(관심사의 분리)
- 사용 영역인 서비스 로직은 어떠한 구현객체가 들어오는지 모른체 자신의 기능과 로직만을 실행할 뿐이다.  

| 프레임워크 | 라이브러리 |
| :---: | :---: |
| 프레임워크가 내가 작성한 코드를 제어하고, 대신 실행하면 그것은 프레임워크다 | 내가 작성한 코드가 직접 제어의 흐름을 담당한다면 그것은 라이브러리다 |

### DI
- 서비스 로직(클라이언트)은 인터페이스만 의존한다
- 정적인 의존관계(인터페이스)와 동적인 의존관계(인터페이스의 구현객체)

### DI 컨테이너
- 인터페이스 구현객체를 생성하고 관리하여 의존관계를 연결

## 스프링 컨테이너와 스프링 빈
### 스프링 컨테이너
- ApplicationContext(인터페이스)를 스프링 컨테이너라고 한다.
- XML기반 또는 애노테이션 기반의 자바 설정 클래스로 만들 수 있다.
- `@Configuration`이 붙은 클래스를 컨테이너 설정 정보로 활용한다. `@Bean` 이 붙은 메서드를 모두 호출해서 반환된 객체를 컨테이너에 빈으로 등록한다.
- 빈 이름의 디폴트 값은 메서드 이름이며 항상 다른 이름은 부여해야 한다.

### BeanFactory
- 스프링 컨테이너의 최상위 인터페이스
- 빈을 관리하고 조회하는 역할

### ApplicationContext
- BeanFactory 기능을 상속받아 부가 기능을 지원
- 메시지소스를 활용한 국제화 기능
- 환경변수(로컬, 개발, 운영)
- 편리한 리소스 조회


### BeanDefinition(인터페이스)
- 스프링이 다양한 형태의 설정 정보(XML, 애노테이션)를 BeanDefinition으로 추상화
- 빈 설정 메타정보로서 `@Bean`당 각각 하나씩 메타정보가 생성된다.
- ApplicationContext는 BeanDefinitionReader를 이용하여 BeanDefinition를 생성하고 이를 이용해 빈으로 등록한다.

## 싱글톤 컨테이너
### 싱글톤 패턴
- 스프링 없는 순수한 컨테이너는 요청을 할 때 마다 객체를 새로 생성하여 메모리 낭비가 심하다.
- 해당 객체를 딱 1개만 생성하고 공유하도록 설계
- `static`으로 객체를 하나만 생성한 후 생성자를 `private`으로 설정하여 새로운 인스턴스 생성을 막음과 동시에 싱글톤을 보장한다.

—\> 문제점: 코드가 많이 들어가고 클라이언트가 서비스 구현 클래스에 의존하여 DIP, OCP위반 가능성이 있다. 또한 내부 속성을 변경하기 어렵고 `private`생성자로 자식 클래스를 만들기 어려워 유연성이 떨어진다.
### 싱글톤 컨테이너
- 싱글톤 패턴을 이용하지 않고도 빈을 싱글톤으로 관리
- 싱글톤 패턴의 모든 단점을 해결하면서 객체를 싱글톤으로 유지


### 싱글톤 방식의 주의점
- 하나의 객체 인스턴스를 **공유**하기 때문에 무상태로 설계해야 한다.
- 특정 클라이언트가 값을 변경할 수 있는 필드가 있으면 안되고 읽기만 가능해야 한다.


### `Configuration`과 싱글톤
- 스프링이 CGLIB라는 바이트코드 조작 라이브러리를 사용해서 `AppConfig`클래스를 상속받은 임의의 다른 클래스를 만들고, 그 다른 클래스를 빈으로 등록한다.
- 컨테이너에 이미 빈으로 등록이 되었다면 존재하는 빈을 반환하고, 그게 아니면 빈을 생성해서 컨테이너에 등록한 후에 해당 빈을 반환한다.


## 컴포넌트 스캔
### 컴포넌트 스캔과 의존관계 자동 주입
- 스프링은 설정 정보가 없어도 자동으로 빈을 등록하는 컴포넌트 스캔이라는 기능을 제공
- 의존관계도 자동 주입하는 `Autowired`라는 기능을 제공
- `Component`애노테이션이 붙은 클래스를 스캔해서 빈으로 등록한다.


### 탐색 위치와 기본 스캔 대상
- `basePackages`로 탐색할 패키지의 시작 위치를 정한다.
- 지정하지 않으면 `ComponentScan`이 붙은 설정 정보 클래스의 패키지가 시작 위치가 된다.
- `@Controller`, `@Service`, `@Repository`, `@Configuration`도 스캔 대상이다.


### 중복 등록과 충돌

| 자동 빈 등록 vs 자동 빈 등록 | 수동 빈 등록 vs 자동 빈 등록 |
| :---: | :---: |
| `ConflictingBeanDefinitionException`<br>예외 발생 | 수동 빈 등록이 우선권을 가진다. 수동 빈이 자동 빈을 오버라이딩 한다. 단 버그 발생 우려로 최근 스프링 부트는 오류가 발생하도록 기본 값을 바꾸었다.|


## 의존관계 자동 주입
### 다양한 의존관계 주입 방법
1. 생성자 주입
	-  생성자 호출시점에 딱 1번만 호출되는 것이 보장
	  - 불변, 필수 의존관계에 사용
	  - 생성자가 1개만 있으면 `@Autowired`를 생략해도 된다.
2. 수정자 주입
	  - setter 메서드를 통해 의존관계를 주입
	  - 선택, 변경 가능성이 있는 의존관계에 사용
3. 필드 주입
	  - 외부에서 변경이 불가능해서 테스트 하기 힘들다.
	  - 컨테이너 없이 테스트 하는 경우 결국 setter가 필요하므로 사용하지 말자.

—\> 생성자 주입을 선택
1. 대부분 의존관계는 불변이다. 생성자 주입은 객체가 생성될때 한 번만 호출되므로 불변으로 설계가 가능하다. 
2. 순수한 자바 코드로만 테스트 진행시 수정자 주입은 실행은 되지만 NPE가 발생한다. 생성자 주입은 컴파일 오류가 발생한다.
3. `final`키워드로 컴파일 오류(생성자 오류)를 발생시킨다. 오직 생성자 주입만 키워드를 사용할 수 있다.



### 옵션 처리
- `@Autowired(required=false)`: 자동 주입할 대상이 없으면 수정자 메서드 자체가 호출 안됨 
- `@Nullable`: 자동 주입할 대상이 없으면 null이 입력된다. 
- `Optional<>`: 자동 주입할 대상이 없으면 Optional.empty가 입력된다.


### 조회 빈이 2개 이상
`@Autowired`는 타입으로 조회하므로 `NoUniqueBeanDefinitionException`오류가 발생한다.<br><br>
—\> 해결방법
1. `@Autowired`필드 명 매칭
	- 타입 매칭을 시도하고 여러 빈이 있으면 필드 이름, 파라미터 이름으로 빈 이름 매칭
2. `@Quilifier`사용
	- 추가 구분자를 붙여주는 방법이지 빈 이름을 변경하는 것은 아니다.
	- 추가 구분자로 못찾으면 구분자의 이름과 같은 이름을 가진 빈을 추가로 찾는다.
	- `Primary`보다 우선권이 높다.
3. `Primary`사용
	- 우선순위를 정하는 방법이다.
4. 애노테이션 직접 만들기
	- `@Quilifier`는 문자로써 컴파일시 타입 체크가 안된다.

```java
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER,ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Qualifier("mainDiscountPolicy")
public @interface MainDiscountPolicy {
}
```
## 빈 생명주기 콜백
### 빈 생명주기 콜백 시작
- 스프링 빈은 객체 생성 -\> 의존관계 주입이라는 라이프 사이클을 가진다. 하지만 생성자 주입의 경우는 동시에 일어난다.
- 초기화 작업은 의존관계 주입이 모두 완료되고 난 다음에 호출해야 한다.
- 스프링은 의존관계 주입이 완료되면 스프링 빈에게 콜백 메서드를 통해서 초기화 시점을 알려준다. 또한 컨테이너가 종료되기 직전 소멸 콜백을 준다.
- 스프링 빈의 이벤트 라이프사이클<br>
컨테이너 생성 -\> 빈 생성 -\> 의존관계 주입 -\> 초기화 콜백 -\> 사용 -\> 소멸전 콜백 -\> 스프링 종료
- 객체의 생성과 초기화의 분리: 생성자 안에서 무거운 초기화 작업을 함께 하는 것 보다는 객체를 생성하는 부분과 초기화 하는 부분을 명확하게 나누는 것이 요지보수에 좋다.



### 인터페이스 InitializingBean, DisposableBean
- `InitializingBean` 은 `afterPropertiesSet()` 메서드로 초기화를 지원한다.
- `DisposableBean` 은 `destroy()` 메서드로 소멸을 지원한다.
- 단, 코드가 스프링 전용 인터페이스에 의존하며 코드를 수정할 수 없는 외부 라이브러리에 적용할 수 없다.



### 빈 등록 초기화, 소멸 메서드
- 설정 정보에 `@Bean(initMethod = "init", destroyMethod = "close")` 처럼 초기화, 소멸 메서드를 지정할 수 있다.
- 코드가 아니라 사용하기 때문에 코드를 고칠 수 없는 외부 라이브러리에도 적용할 수 있다.
- `@Bean`의 destroyMethod는 기본값이 `(inferred)` 으로 등록되어 있다. 이 추론 기능은 `close` , `shutdown` 라는 이름의 메서드를 자동으로 호출해준다. 이름 그대로 종료 메서드를 추론해서 호출해준다. 따라서 직접 스프링 빈으로 등록하면 종료 메서드는 따로 적어주지 않아도 잘 동작한다. 추론 기능을 사용하기 싫으면`destroyMethod=""` 처럼 빈 공백을 지정하면 된다.



### 애노테이션 `@PostConstruct`, `@PreDestroy`
- 가장 편리하며 자바 표준 기술이다. 따라서 스프링이 아닌 다른 컨테이너에서도 동작한다.
- 외부 라이브러리에는 적용하지 못하므로 이 경우 `@Bean` 기능을 사용하자.


## 빈 스코프
### 빈 스코프란
스코프는 번역 그대로 빈이 존재 할 수 있는 범위를 뜻한다.
1. 싱글톤: 기본 스코프, 컨테이너의 시작과 종료까지 유지되는 가장 넓은 범위의 스코프이다.
2. 프로토타입: 컨테이너는 프로토타입 빈의 생성과 의존관계 주입과 초기화 까지만 관여하고 더는 관리하지 않는 매우 짧은 범위의 스코프이다. 따라서 종료메서드가 호출되지 않는다.
3. 웹 관련 스코프
	- request: 웹 요청이 들어오고 나갈떄 까지 유지되는 스코프이다.
	- session: 웹 세션이 생성되고 종료될 떄 까지 유지되는 스코프이다.
	- application: 웹의 서블릿 컨텍스트와 같은 범위로 유지되는 스코프이다.
    
    
    
### 프로토타입 스코프
- 컨테이너에 조회하면 항상 새로운 인스턴스를 생성해서 반환한다.
- 컨테이너는 빈의 생성과 의존관계 주입 그리고 초기화까지만 관여한다.



### 프로토타입 스코프 - 싱글톤 빈과 함께 사용시 문제
- 싱글톤 빈이 의존관계 주입을 통해서 프로토타입 빈을 주입받아서 사용하는 경우
- 주입 시점에 컨테이너에 프로토타입 빈을 요청한다.
-  내부에 가지고 있는 프로토타입 빈은 이미 과거에 주입이 끝난 빈으로써 사용 할 때마다 새로 생성되는 것이 아니다.
- 프로토타입 빈을 주입 시점에만 새로 생성하는게 아니라, 사용할 때 마다 새로 생성해서 사용하는 것을 원할 것이다.



### 프로토타입 스코프 - 싱글톤 빈과 함께 사용시 Provider로 문제 해결
- 가장 간단한 방법은 싱글톤 빈이 프로토타입을 사용할 때 마다 컨테이너에 새로 요청하는 것이다.


```java
@Autowired
private ApplicationContext ac;

public int logic() {
    PrototypeBean prototypeBean = ac.getBean(PrototypeBean.class);
    prototypeBean.addCount();
    int count = prototypeBean.getCount();
    return count;
}
```

- 의존관계를 외부에서 주입 받는게 아니라`ac.getBean(PrototypeBean.class)`처럼 직접 필요한 의존관계를 찾는 것을 Dependency Lookup 의존관계 조회라고 한다.
- 단, 컨테이너 자체를 주입받게 되면 컨테이너에 종속적인 코드가 되고 단위 테스트의 어려움이 따른다.



#### ObjectFactory, ObjectProvider
```java
@Autowired
private ObjectProvider<PrototypeBean> prototypeBeanProvider; 

public int logic() {
    PrototypeBean prototypeBean = prototypeBeanProvider.getObject();
    prototypeBean.addCount();
    int count = prototypeBean.getCount();
    return count;
}
```

- 과거에는 `ObjectFactory` 가 있었는데, 여기에 편의 기능을 추가해서 `ObjectProvider` 가 만들어졌다.
- `ObjectProvider` 는 지금 딱 필요한 DL 정도의 기능만 제공한다.



#### JSR-330 Provider
이 방법을 사용하려면 `javax.inject:javax.inject:1` 라이브러리를 gradle에 추가해야 한다.
```java
@Autowired
private Provider<PrototypeBean> provider;

public int logic() {
    PrototypeBean prototypeBean = provider.get();
    prototypeBean.addCount();
    int count = prototypeBean.getCount();
    return count;
}
```

- 자바 표준이고, 기능이 단순하므로 단위테스트를 만들거나 mock 코드를 만들기는 훨씬 쉬워진다.


### 웹 스코프
- 웹 스코프는 웹 환경에서만 동작한다.
- 스프링이 해당 스코프의 빈 종료시점까지 관리한다. 따라서 종료 메서드가 호출된다.
- 웹 스코프 종류
	1. request: HTTP 요청 하나가 들어오고 나갈 때 까지 유지되는 스코프로써 각각의 요청마다 별도의 빈 인스턴스가 생성되고 관리된다.
	2. session: HTTP Session과 동일한 생명주기를 가지는 스코프
    
    
    
### request 스코프와 Provider
```java
@Controller
@RequiredArgsConstructor
public class LogDemoController {
    private final LogDemoService logDemoService;
    private final ObjectProvider<MyLogger> myLoggerProvider;

    @RequestMapping("log-demo")
    @ResponseBody
    public String logDemo(HttpServletRequest request) {
        String requestURL = request.getRequestURL().toString();
        MyLogger myLogger = myLoggerProvider.getObject();
        myLogger.setRequestURL(requestURL);
        myLogger.log("controller test");
        logDemoService.logic("testId");
        return "OK";
    }
}
```

- `ObjectProvider` 덕분에 `ObjectProvider.getObject()` 를 호출하는 시점까지 request scope 빈의 생성을 지연할 수 있다.



### 스코프와 프록시
```java
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MyLogger {
}
```

- 적용 대상이 인터페이스가 아닌 클래스면 `TARGET_CLASS` 를 선택
- 적용 대상이 인터페이스면 `INTERFACES` 를 선택
- 이렇게 하면 MyLogger의 가짜 프록시 클래스를 만들어두고 HTTP request와 상관 없이 가짜 프록시 클래스를 다른 빈에 미리 주입해 둘 수 있다.
- `@Scope` 의 `proxyMode = ScopedProxyMode.TARGET_CLASS)` 를 설정하면 스프링 컨테이너는 CGLIB 라는 바이트코드를 조작하는 라이브러리를 사용해서, MyLogger를 상속받은 가짜 프록시 객체를 생성한다.
- 그리고 스프링 컨테이너에 "myLogger"라는 이름으로 진짜 대신에 이 가짜 프록시 객체를 등록한다.
- `ac.getBean("myLogger", MyLogger.class)`로 조회해도 프록시 객체가 조회되는 것을 확인할 수 있다. 그래서 의존관계 주입도 이 가짜 프록시 객체가 주입된다.
- 이 가짜 프록시 객체는 실제 요청이 오면 그때 내부에서 실제 빈을 요청하는 위임 로직이 들어있다. 내부에 단순한 위임 로직만 있고, 싱글톤 처럼 동작한다.

[1]: https://www.inflearn.com/course/스프링-핵심-원리-기본편/dashboard
