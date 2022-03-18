var store = [{
        "title": "[Daily] 개발 공부를 기록하고 공유하기 위한 첫 발걸음",
        "excerpt":"개발 공부를 하면서 기록하는 습관의 중요성을 알게 되었다. 얼마 전에 똑같이 고민했던 문제를 두고 다시 구글링을 해야하는 일이 빈번히 발생하는 것이다. 앞으로 나아가면서 고민하면서 공부한 지식을 기록하여 함께 나누고 기억하고자 블로그를 개설하여 첫 포스팅을 하게 되었다. 쉬더라도 멈추지는 않는 내가 되었으면 하는 바람에 첫 글을 작성한다. 화이팅  ","categories": ["Daily"],
        "tags": ["Daily"],
        "url": "https://rere950303.github.io/daily/firstposting/",
        "teaser": null
      },{
        "title": "[Git] commit 수정하기",
        "excerpt":"push 하지 않은 경우 가장 최근 commit 수정 git commit --amend 과거 commit 또는 한 번에 여러개의 commit 수정 git log 로 수정하고자 하는 commit 확인 git rebase -i HEAD~n 수정하고자 하는 commit의 개수를 입력 수정하고 싶은 커밋 옆에 pick 을 reword 로 수정 :wq 로 커밋 리스트를 저장하고 순서대로...","categories": ["Git"],
        "tags": ["Git","amend","rebase"],
        "url": "https://rere950303.github.io/git/git(amend)/",
        "teaser": null
      },{
        "title": "[Java] equals()&hashCode() 오버라이딩",
        "excerpt":"해싱이란 해시함수를 이용해서 데이터를 해시테이블에 링크드리스트 형태로 저장하고 검색하는 기법을 말한다. 해시함수는 데이터가 저장되어 있는 곳을 알려 주기 때문에 다량의 데이터 중에서도 원하는 데이터를 빠르게 찾을 수 있다. Objects클래스의 hashCode() 메소드가 해시함수를 구현하고 있다. 동일한 객체에 대해 여러 번 hashCode()를 호출해도 동일한 값을 반환해야 한다. equals()가 참인 두 객체의 hashCode()...","categories": ["Java"],
        "tags": ["Java","equals","hashCode"],
        "url": "https://rere950303.github.io/java/equals()&hashCode()/",
        "teaser": null
      },{
        "title": "[SQL] ON과 WHERE의 차이",
        "excerpt":"ON ON을 사용하면 조인 대상을 필터링 하고 조인할 수 있다. SELECT d.deptno, sum(e.sal) FROM dept d LEFT OUTER JOIN emp e ON d.deptno = e.deptno AND e.sal &gt; 2000 GROUP BY d.deptno ORDER BY d.deptno 급여가 2000이 넘는 직원만 dept 테이블과 조인하여 SELECT절을 실행시킬 수 있다. ON은 조인조건이므로 부서에 직원이...","categories": ["SQL"],
        "tags": ["SQL","ON","WHERE"],
        "url": "https://rere950303.github.io/sql/on&where/",
        "teaser": null
      },{
        "title": "[SQL] WHERE과 HAVING의 차이",
        "excerpt":"WHERE SELECT ~ FROM 테이블 WHERE ~ GROUP BY ~ FROM의 테이블에서 GROUP BY 전에 테이블의 행을 걸러내고 그룹화를 진행한다. HAVING SELECT ~ FROM 테이블 GROUP BY ~ HAVING ~ FROM의 테이블에서 먼저 그룹화를 진행하고 HAVING 절에서 count(*) &gt; 1 과 같은 조건으로 그룹 걸러낸다. 즉 요약하면 WHERE은 그룹화 전에...","categories": ["SQL"],
        "tags": ["SQL","HAVING","WHERE","GROUP BY"],
        "url": "https://rere950303.github.io/sql/where&having/",
        "teaser": null
      },{
        "title": "[Spring][Core] 스프링 핵심 원리-기본편",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 핵심 원리 - 기본편 강의를 바탕으로 쓰였음을 미리 밝힙니다. 객체 지향 설계와 스프링 좋은 객체 지향 프로그래밍 스프링은 객체 지향 언어가 가진 강력한 특징을 살려내는 프레임워크 객체 지향 언어의 특징: 캡슐화, 다형성, 추상화, 상속 역할과 구현의 분리 -&gt; 인터페이스와 구현클래스 다형성으로 인터페이스를 구현한...","categories": ["Spring/Core"],
        "tags": ["Object-oriented","Spring"],
        "url": "https://rere950303.github.io/spring/core/SpringCore_basic/",
        "teaser": null
      },{
        "title": "[Spring][MVC] SpringMVC-part1",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술 강의를 바탕으로 쓰였음을 미리 밝힙니다. 웹 애플리케이션 이해 웹 서버, 웹 애플리케이션 서버 HTTP 기반 서버간에 데이터를 주고 받을 때도 대부분 HTTP 사용 웹 서버: HTTP 기반으로 동작(NGINX, APACHE) 웹 애플리케이션 서버(WAS): HTTP 기반으로 동작,...","categories": ["Spring/MVC"],
        "tags": ["MVC","Spring"],
        "url": "https://rere950303.github.io/spring/mvc/SpringMVC-part1/",
        "teaser": null
      },{
        "title": "[WEB] 절대경로와 상대경로",
        "excerpt":"절대경로     html과 같은 웹 페이지나 파일이 가지고 있는 고유한 경로를 말한다.   ex: /Users/hyungwook/Desktop/AbsoulutePath.txt   상대경로     현재 위치를 기준으로 정한 파일 등의 경로를 말한다.            / : 루트 경로       ./ : 현재 경로       ../ :  상단 폴더의 경로           ex: /Users/hyungwook/Desktop/ 위치에서            / : /Users/       ./ : /Users/hyungwook/Desktop/       ../ : /Users/hyungwook/           ","categories": ["WEB"],
        "tags": ["WEB"],
        "url": "https://rere950303.github.io/web/Relative-path&-Absolute-path/",
        "teaser": null
      },{
        "title": "[Spring][Thymeleaf] Thymeleaf 네츄럴 템플릿",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 MVC 2편 - 백엔드 웹 개발 활용 기술 강의를 바탕으로 쓰였음을 미리 밝힙니다. 타임리프 - 기본 기능 타임리프 소개 서버 사이드 HTML 렌더링 (SSR): 타임리프는 백엔드 서버에서 HTML을 동적으로 렌더링 하는 용도로 사용된다. 네츄럴 템플릿: 타임리프는 순수 HTML을 최대한 유지하는 특징이 있다. 타임리프로...","categories": ["Spring/Thymeleaf"],
        "tags": ["Thymeleaf","Spring"],
        "url": "https://rere950303.github.io/spring/thymeleaf/Thymeleaf/",
        "teaser": null
      },{
        "title": "[Java] Optional 클래스의 filter()메서드",
        "excerpt":"public Optional&lt;T&gt; filter(Predicate&lt;? super T&gt; predicate) { Objects.requireNonNull(predicate); if (!isPresent()) { return this; } else { return predicate.test(value) ? this : empty(); } } public static&lt;T&gt; Optional&lt;T&gt; empty() { @SuppressWarnings(\"unchecked\") Optional&lt;T&gt; t = (Optional&lt;T&gt;) EMPTY; return t; } private static final Optional&lt;?&gt; EMPTY = new Optional&lt;&gt;(); private Optional() { this.value...","categories": ["Java"],
        "tags": ["Java","Optional","filter"],
        "url": "https://rere950303.github.io/java/Optional-T-.filter()/",
        "teaser": null
      },{
        "title": "[Spring][MVC] SpringMVC-part2",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 MVC 2편 - 백엔드 웹 개발 활용 기술 강의를 바탕으로 쓰였음을 미리 밝힙니다. 메시지, 국제화 메시지, 국제화 소개 메시지: 여러 화면에 보이는 상품명, 가격, 수량 등 label 에 있는 단어를 변경하려면 다음 화면들을 다 찾아가면서 모두 변경해야 한다. 화면 수가 적으면 문제가 되지...","categories": ["Spring/MVC"],
        "tags": ["MVC","Spring"],
        "url": "https://rere950303.github.io/spring/mvc/SpringMVC-part2/",
        "teaser": null
      },{
        "title": "[Spring][JPA] 자바 ORM 표준 JPA",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 자바 ORM 표준 JPA 프로그래밍 - 기본편 강의와 도서를 바탕으로 쓰였음을 미리 밝힙니다. JPA 소개 SQL 중심적인 개발의 문제점 객체 지향 언어 관계형 데이터베이스 객체를 관계형 데이터베이스에 관리 CRUD(객체를 SQL로, SQL을 자바 객체로) public class Member { private String memberId; private String name; ......","categories": ["Spring/JPA"],
        "tags": ["JPA","Spring"],
        "url": "https://rere950303.github.io/spring/jpa/JPA/",
        "teaser": null
      },{
        "title": "[Spring][JPA] OSIV",
        "excerpt":"OSIV Open Session In View 의 약자로써 영속성 컨텍스트를 뷰까지 열어둔다는 뜻이다. 영속성 컨텍스트가 살아있으면 엔티티는 영속 상태로 유지된다. 따라서 뷰에서도 지연 로딩을 사용할 수 있다. spring.jpa.open-in-view: false, spring.jpa.open-in-view : true(기본값) 요청 당 트랜잭션 방식의 OSIV 문제점 컨트롤러나 뷰 같은 프리젠테이션 계층이 엔티티를 변경할 수 있다. 요청이 끝나고 트랜잭션이 커밋되면서...","categories": ["Spring/JPA"],
        "tags": ["JPA","Spring","OSIV"],
        "url": "https://rere950303.github.io/spring/jpa/OSIV/",
        "teaser": null
      },{
        "title": "[Spring][JPA] 스프링 데이터 JPA",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 실전! 스프링 데이터 JPA 강의를 바탕으로 쓰였음을 미리 밝힙니다. 공통 인터페이스 기능 공통 인터페이스 설정 org.springframework.data.repository.Repository 를 구현한 클래스는 스캔 대상 Spring Data JPA가 인터페이스를 구현한 프록시 객체를 생성한다. @Repository 애노테이션 생략 가능 Spring Data JPA가 컴포넌트 스캔을 자동으로 처리하여 Spring Context에서 관리하고 의존관계를...","categories": ["Spring/JPA"],
        "tags": ["JPA","Spring"],
        "url": "https://rere950303.github.io/spring/jpa/SpringDataJPA/",
        "teaser": null
      },{
        "title": "[Spring][JPA] 변경 감지와 병합",
        "excerpt":"준영속 엔티티 식별자(ID)를 가지고 있는 엔티티로써 영속성 컨텍스트가 더는 관리하지 않는것을 말한다. 따라서 해당 엔티티의 속성을 변경해도 변경감지를 통한 update쿼리가 생성되지 않는다. 준영속 엔티티를 수정하는 2가지 방법 변경 감지 기능 사용 영속성 컨텍스트에서 영속상태인 엔티티를 조회한 후에 트랜잭션 안에서 속성을 변경하고 변경 감지 기능을 통해 트랜잭션 시점의 플러쉬로 데이터베이스 UPDATE...","categories": ["Spring/JPA"],
        "tags": ["JPA","Spring","save","merge"],
        "url": "https://rere950303.github.io/spring/jpa/save&merge/",
        "teaser": null
      },{
        "title": "[Spring][JPA][Querydsl] Querydsl",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 실전! Querydsl 강의를 바탕으로 쓰였음을 미리 밝힙니다. 기본 문법 시작 - JPQL vs Querydsl public void startJPQL() { //member1을 찾아라. String qlString = \"select m from Member m \" + \"where m.username = :username\"; Member findMember = em.createQuery(qlString, Member.class) .setParameter(\"username\", \"member1\") .getSingleResult(); assertThat(findMember.getUsername()).isEqualTo(\"member1\"); }...","categories": ["Spring/JPA/Querydsl"],
        "tags": ["JPA","Spring","Querydsl"],
        "url": "https://rere950303.github.io/spring/jpa/querydsl/Querydsl/",
        "teaser": null
      },{
        "title": "[Spring][Security] 스프링 시큐리티",
        "excerpt":"들어가며 해당 게시글은 인프런 백기선 강사님의 스프링 시큐리티 강의를 바탕으로 쓰였음을 미리 밝힙니다. 스프링 시큐리티: 폼 인증 스프링 시큐리티 연동 gradle 설정 implementation 'org.springframework.boot:spring-boot-starter-security' 기본 유저가 생성됨(ID: user) Using generated security password: 114284e0-656a-4fdf-b623-9b552a85b6c8 모든 요청은 인증을 필요로함 스프링 시큐리티 설정하기 @Configuration @EnableWebSecurity public class SecurityConfig extends WebSecurityConfigurerAdapter { @Override protected...","categories": ["Spring/Security"],
        "tags": ["Security","Spring"],
        "url": "https://rere950303.github.io/spring/security/SpringSecurity/",
        "teaser": null
      },{
        "title": "[Docker] 도커",
        "excerpt":"들어가며 해당 게시글은 인프런 subicura 강사님의 초보를 위한 도커 안내서 강의를 바탕으로 쓰였음을 미리 밝힙니다. 도커란 무엇인가 서버를 관리한다는 것 도커는 컨테이너 기반의 오픈소스 가상화 플랫폼이다. Oracle, Wordpress, Gitlab 등 매우 복잡하다. AWS, Azure, Google Cloud 등 계속해서 바뀌는 서버 환경 Node.js, Python, Ruby 등 계속해서 바뀌는 개발 환경 서버관리...","categories": ["Docker"],
        "tags": ["Docker"],
        "url": "https://rere950303.github.io/docker/Docker/",
        "teaser": null
      },{
        "title": "[Docker][Spring] Spring WAS 도커로 띄우기",
        "excerpt":"ubuntu + jdk 이미지 Dockerfile Spring의 .jar 파일을 실행하는 이미지 생성 한글 사진 파일 업로드를 위한 locale 설정 FROM ubuntu RUN apt-get update RUN apt-get install -y openjdk-11-jdk RUN apt-get -y install locales RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen &amp;&amp; \\ locale-gen ENV LANG en_US.UTF-8 ENV LANGUAGE en_US:en ENV LC_ALL...","categories": ["Docker/Spring"],
        "tags": ["Docker","Spring"],
        "url": "https://rere950303.github.io/docker/spring/Spring&Docker/",
        "teaser": null
      },{
        "title": "[Javascript] Javascript",
        "excerpt":"Javascript 언어소개 웹브라우저: 경고창 등 탈 웹브라우저: 웹서버까지 확장 php, python, java … node.js, Spring 탈 웹: Google Apps Script 언어란: 의사소통을 위한 약속(문법) 환경이란: 다양한 분야에서의 사용 alert(‘hello world’); -&gt; 웹브라우저 write(‘hello world’); -&gt; 웹서버 msgBox(‘hello world’); -&gt; SpreadSheet Javascript 기본 - 실행방법과 실습환경 코드 작성과 실행 &lt;!DOCTYPE html&gt;...","categories": ["Javascript"],
        "tags": ["Javascript"],
        "url": "https://rere950303.github.io/javascript/JavaScript/",
        "teaser": null
      },{
        "title": "[DB] Database Management System(DBMS)",
        "excerpt":"DBMS에는 특정 기관에 대한 정보를 가지고 있다. 연관된 data의 집합 data와 data 접근에 필요한 프로그램의 집합 쉽고 편한 data CRUD 환경 제공 초창기 database app은 파일 시스템을 이용하여 구축되었다. 이는 여러가지 단점이 존재했다. data 증폭 및 불일치: 여러 종류의 파일과 다양한 포맷 data 접근의 어려움: 새로운 작업을 수행하기 위해서는(예를 들어...","categories": ["DB"],
        "tags": ["DB","DBMS"],
        "url": "https://rere950303.github.io/db/DBMS/",
        "teaser": null
      },{
        "title": "[DB] Data Models, Data Languages, Data Approaches",
        "excerpt":"Data Models A colleciton of for descibing Data, Data relationships, Data semantics, Data constraints Relational model 관계형 모델은 실제 세계의 데이터를 관계라는 개념을 사용하여 표현한 데이터 모델이다. 릴레이션(테이블), 튜플(행), 속성(칼럼) SQL로 많은 발전을 이룸 Entity-Relationship data model DB 설계시 주로 사용 개체: 단독으로 존재하는 객체를 의미하며, 동일한 개체는 존재하지 않는다....","categories": ["DB"],
        "tags": ["DB","SQL"],
        "url": "https://rere950303.github.io/db/Data/",
        "teaser": null
      },{
        "title": "[DB] DB Components, Architecture",
        "excerpt":"Storage Management 저장 장치 관리자는 DB에 저장된 data와 App / query 사이에 인퍼테이스 역할을 하는 프로그램 모듈이다. file manager와 통신하면서 효율적인 data storing, retrieving, updating 역할을 한다. Query Processing parser / translator 이용하여 관계대수표현으로 변환한다. 통계자료를 통해 쿼리를 최적화하고 data를 얻기 위한 절차적 계획을 세운다. 해당 계획을 실행하고 테이블 형태의...","categories": ["DB"],
        "tags": ["DB"],
        "url": "https://rere950303.github.io/db/DB_Components/",
        "teaser": null
      },{
        "title": "[DB] Intro to Relational Model(1)",
        "excerpt":"Relational Database Structure RDB relation: table(tuple 집합) tuple: a row of table(속성들의 집합을 의미하며 n개의 속성으로 이루어진 tuple를 n-tuple라고 부른다.) attribute: table의 열을 의미하낟. RDB는 tables의 집합으로 이루어진다. Attribute Types 각 속성별로 가질수 있는 값들의 집합을 domain이라고 부른다. 속성들의 값은 atomic 해야하고 단 하나의 값만 가질수 있다. 모든 domain은 null값을...","categories": ["DB"],
        "tags": ["DB","RDB"],
        "url": "https://rere950303.github.io/db/RDB_1/",
        "teaser": null
      },{
        "title": "[DB] Intro to Relational Model(2)",
        "excerpt":"Relational Query Languages Relataional algebra - Procedural 여러가지 relation 연산을 제공: Relational operation(Selection, Projection, Natural join, Cartesian product), Set operation(Union, Intersection, Set difference) relational calculs - non procedural Selection: tuple를 선택(σ) Projection: 속성을 선택(π) - relation은 집합 개념이므로 중복되는 tuple은 하나만 남고 삭제된다. Cartesian product: 피연산자 두개의 relation을 곱해서 모든...","categories": ["DB"],
        "tags": ["DB","RDB"],
        "url": "https://rere950303.github.io/db/RDB_2/",
        "teaser": null
      },{
        "title": "[AWS] AWS",
        "excerpt":"지역과 가용구역 Region: 전 세계 아마존 컴퓨터가 존재하는 곳, 서울에도 존재 웹사이트 주 사용자의 분포가 중요: 주 소비자가 일본인 경우 일본 인프라를 사용하는 것이 유리 가용구역: 하나의 지역에는 여러개의 가용구역이 존재한다. 자연재해 등으로 인한 장애 방지를 위함이다. CDN(Contents Delivery Network) CloudFront는 AWS에 제공하는 CDN 서비스이다. 캐싱을 통해 빠른 응답을 보장한다....","categories": ["AWS"],
        "tags": ["AWS"],
        "url": "https://rere950303.github.io/aws/AWS/",
        "teaser": null
      },{
        "title": "[DB] Introduction to SQL",
        "excerpt":"Data Definition Lauguage SQL의 DDL은 relatioin에 관한 정보를 만든다. 각 relation의 스키마 각 속성들의 domain 무결성 제약조건 각 relation의 인덱스 정보 / 보안, 권한 정보 Domain Types in SQL char(n): 길이가 n인 고정 길이 문자열 varchar(n): 최대 길이가 n인 가변 길이 문자열 int smallint numeric(p, d): 고정 소수점 실수, p는...","categories": ["DB"],
        "tags": ["DB"],
        "url": "https://rere950303.github.io/db/IntroSQL/",
        "teaser": null
      },{
        "title": "[DB] Basic Query Structure",
        "excerpt":"Data-manipulation language(DML) insert, delete, update tuples typical SQL SELECT A1, A2, ..., An // attribute FROM r1, r2, ..., rm // relation WHERE P // predicate The SELECT Clause 대소문자를 구별하지 않는다. distinct 키워드로 중복되는 값을 제거할 수 있다. asterisk(*): 모든 속성을 선택 산술연산을 사용할 수 있다.(+, -, *, /)...","categories": ["DB"],
        "tags": ["DB"],
        "url": "https://rere950303.github.io/db/BasicQueryStructure/",
        "teaser": null
      },{
        "title": "[Docker] 도커와 CI환경",
        "excerpt":"들어가며 해당 게시글은 인프런 John Ahn 강사님의 따라하며 배우는 도커와 CI환경 강의를 바탕으로 쓰였음을 미리 밝힙니다. 도커 기본 도커를 쓰는 이유 Installer를 통한 설치의 경우 갖고 있는 서버, 패키지 버전, 운영체제 등에 따라 프로그램을 설치하는 과정중에 많은 에러들이 발생한다. 또한 그 과정이 복합하다. 도커를 이용하여 예상치 못한 에러를 줄일 수...","categories": ["Docker"],
        "tags": ["Docker","CI"],
        "url": "https://rere950303.github.io/docker/Docker&CI/",
        "teaser": null
      },{
        "title": "[Spring][Log] 로깅",
        "excerpt":"로깅 라이브러리 스프링 부트 라이브러리를 사용하면 스프링 부트 로깅 라이브러리( spring-boot-starter-logging )가 함께 포함된다. 스프링 부트 로깅 라이브러리는 기본으로 다음 로깅 라이브러리를 사용한다. SLF4J, Logback 로그 라이브러리는 Logback, Log4J, Log4J2 등등 수 많은 라이브러리가 있는데, 그것을 통합해서 인터페이스로 제공하는 것이 바로 SLF4J 라이브러리다. 쉽게 이야기해서 SLF4J는 인터페이스이고, 그 구현체로 Logback...","categories": ["Spring/Log"],
        "tags": ["Spring","Log","SLF4J","Logback"],
        "url": "https://rere950303.github.io/spring/log/Log/",
        "teaser": null
      },{
        "title": "[Spring][RESTful] RESTful Web Services 개발",
        "excerpt":"들어가며  해당 게시글은 인프런 Dowon Lee 강사님의 [Spring Boot를 이용한 RESTful Web Services 개발][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.   Web Service 개발 방법 SOAP과 REST의 이해     Web Service: 네트워크 상에서 서로 다른 종류의 컴퓨터들 간에 상효작용하기 위한 소프트웨어 시스템  ","categories": ["Spring/RESTful"],
        "tags": ["RESTful","Spring","Microservices"],
        "url": "https://rere950303.github.io/spring/restful/RESTful/",
        "teaser": null
      },{
        "title": "[Spring][Batch] Spring Batch",
        "excerpt":"들어가며 해당 게시글은 인프런 정수원 강사님의 스프링 배치 - Spring Boot 기반으로 개발하는 Spring Batch 강의를 바탕으로 쓰였음을 미리 밝힙니다. 스프링 배치 소개 개요 배치 핵심 패턴 Read: 데이터베이스, 파일, 큐에서 다량의 데이터 조회한다. Process: 특정 방법으로 데이터를 가공한다. Write: 데이터를 수정된 양식으로 다시 저장한다. 배치 시나리오 배치 프로세스를 주기적으로...","categories": ["Spring/Batch"],
        "tags": ["Batch","Spring"],
        "url": "https://rere950303.github.io/spring/batch/batch/",
        "teaser": null
      },{
        "title": "[Spring][Batch] Spring Batch Multithread",
        "excerpt":"들어가며 영화 오픈 API를 이용한 프로젝트 진행 중 약 10000건 정도의 Batch 성 작업에 많은 시간이 소요됨에 따라 성능 개선을 위한 멀티 스레드 적용 여부 및 적용 스레드 개수 등의 테스트 Prometheus &amp; Grafana 이용한 모니터링 의존성 추가 implementation 'org.springframework.boot:spring-boot-starter-actuator' implementation 'io.micrometer:micrometer-registry-prometheus' Endpoint 활성화 management: endpoints: web: exposure: include: \"*\"...","categories": ["Spring/Batch"],
        "tags": ["Batch","Spring","Thread"],
        "url": "https://rere950303.github.io/spring/batch/SpringThreadTest/",
        "teaser": null
      },{
        "title": "[Spring][Batch] Spring Batch performance improvement",
        "excerpt":"들어가며 영화 오픈 API를 이용한 프로젝트의 10000건 정도의 Batch 성 작업에 많은 시간이 소요됨에 따라 이를 해결하기 위한 포스팅 문제점 로그 결과 대부분의 시간은 외부 오픈 API 통신에서 소요 멀티 스레드는 동기화 문제로 효과가 미흡하거나 오히려 오버헤드 발생 DB 갱신 시 request 실시간 반응성 떨어짐 한 번에 10000건의 엔티티를 메모리로...","categories": ["Spring/Batch"],
        "tags": ["Batch","Spring","Thread"],
        "url": "https://rere950303.github.io/spring/batch/SpringBatchImprovement/",
        "teaser": null
      },{
        "title": "[Spring][Test] Spring JUnit",
        "excerpt":"들어가며 시큐리티, JPA, MVC 등 스프링을 이용한 JUnit, TDD의 정리 필요성을 느껴 작성한 포스팅 TDD에 대한 간단한 정리 테스트 주도 개발 테스트를 먼저 설계 및 구축 후 테스트를 통과할 수 있는 코드를 짜는 것 애자일 개발 방식 중 하나 코드 설계시 원하는 단계적 목표에 대해 설정하여 진행하고자 하는 것에 대한...","categories": ["Spring/Test"],
        "tags": ["Spring","Test","Junit","Jupiter"],
        "url": "https://rere950303.github.io/spring/test/SpringJUnit/",
        "teaser": null
      },{
        "title": "[Spring][Deploy] AWS에 Spring Boot App 배포하기",
        "excerpt":"들어가며 기존에 만들었던 RESTful API 프로젝트를 AWS EC2에 배포하는 방법과 그 과정을 기록하는 포스팅 EC2 &amp; RDS 생성 기존에 만들었던 AWS 계정을 탈퇴해서 새로운 이메일로 재가입을 했다. 인스턴스는 EC2 1개 RDS 1개 생성했다. 설정은 보안 그룹 말고는 크게 어렵지 않다. RDS의 기존 보안 그룹을 삭제하고 새로운 보안 그룹을 만든 후에...","categories": ["Spring/Deploy"],
        "tags": ["Spring","Deploy","AWS"],
        "url": "https://rere950303.github.io/spring/deploy/SpringAwsDeploy/",
        "teaser": null
      },{
        "title": "[Spring][Deploy] Jenkins를 이용한 CI, CD",
        "excerpt":"들어가며 저번에 배포한 스프링 App을 Jenkins를 이용하여 CI, CD 구현하는 과정을 기록하는 포스팅 동작 과정 배포하고자 하는 git의 branch를 정하고 Jenkins와 연동 push하는 경우 Jenkins에서 gradle 빌드 테스트 후에 jar 빌드 성공 시 셸스크립트를 통해 도커 이미지 빌드 후 hub에 업로드 Jenkins 서버와 배포 서버를 ssh 연동 후 도커로 서버...","categories": ["Spring/Deploy"],
        "tags": ["Spring","Deploy","AWS","Jenkins","CI","CD"],
        "url": "https://rere950303.github.io/spring/deploy/JenkinsCICD/",
        "teaser": null
      },{
        "title": "[Spring][Core] 스프링 핵심 원리-고급편",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 핵심 원리 - 고급편 강의를 바탕으로 쓰였음을 미리 밝힙니다. 예제 만들기 로그 추적기 - 요구사항 분석 모든 PUBLIC 메서드의 호출과 응답 정보를 로그로 출력 애플리케이션의 흐름을 변경하면 안됨(로그를 남긴다고 해서 비즈니스 로직의 동작에 영향을 주면 안됨) 메서드 호출에 걸린 시간 정상 흐름과 예외...","categories": ["Spring/Core"],
        "tags": ["Object-oriented","Spring","AOP","Aspect","Pointcut","Advice","Proxy"],
        "url": "https://rere950303.github.io/spring/core/SpringCore_advanced/",
        "teaser": null
      },{
        "title": "[AWS] EBS",
        "excerpt":"들어가며 도커 이미지 빌드시 디스크 용량 부족으로 에러가 발생함에 따라 ec2 디스크 볼륨 사이즈를 증가시키는 과정을 기록하기 위한 포스팅 EBS 볼륨이란 Elastic Block Store의 약자로써 ec2에서 디스크처럼 사용할 수 있는 블록 수준 스토리지를 말한다. AWS에서는 볼륨이라고 말하는데 EBS로 생성한 디스크 하나하나 저장 단위를 말한다. 볼륨을 하나 생성하여 ec2와 연결하면 하나의...","categories": ["AWS"],
        "tags": ["AWS","EBS"],
        "url": "https://rere950303.github.io/aws/AWS_EBS/",
        "teaser": null
      },{
        "title": "[Spring][Security] 스프링 시큐리티 테스트",
        "excerpt":"들어가며 MockUser를 이용하여 메소드 보안 단위 테스트 하는 방법과 과정을 기록하기 위한 포스팅 @WithSecurityContext @Target({ ElementType.METHOD, ElementType.TYPE }) @Retention(RetentionPolicy.RUNTIME) @Inherited @Documented @WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class) public @interface WithMockCustomUser { String username() default \"yhw\"; String studentId() default \"~\"; String password() default \"~\"; String passwordConfirm() default \"~\"; String role() default \"ROLE_USER\"; } WithMockCustomUserSecurityContextFactory...","categories": ["Spring/Security"],
        "tags": ["Spring","Security"],
        "url": "https://rere950303.github.io/spring/security/SecurityTest/",
        "teaser": null
      },{
        "title": "[Spring][Security] 스프링 시큐리티 재정리",
        "excerpt":"들어가며 해당 게시글은 인프런 정수원 강사님의 스프링 시큐리티 - Spring Boot 기반으로 개발하는 Spring Security 강의를 바탕으로 쓰였음을 미리 밝힙니다. 스프링 시큐리티 기본 API 및 Filter 이해 사용자 정의 보안 기능 구현 WebSecurityConfigurerAdapter 상속 인증 API http.formLogin() http.logout() http.csrf() http.httpBasic() http.SessionManagement() http.RememberMe() http.ExceptionHandling () http.addFilter() 인가 API http.authorizeRequests() .antMatchers(/admin) .hasRole(USER)...","categories": ["Spring/Security"],
        "tags": ["Security","Spring"],
        "url": "https://rere950303.github.io/spring/security/SpringSecurity2/",
        "teaser": null
      },{
        "title": "[Kubernetes] 쿠버네티스",
        "excerpt":"들어가며 해당 게시글은 인프런 김태민 강사님의 [대세는 쿠버네티스][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다. 소개 서버 자원을 효율적으로 사용하기 위해 VM과 같은 가상화 기능이 사용된다. 여기서 docker와 같이 컨테이너를 이용한 독립된 가상화 시스템은 OS를 로딩하지 않고 필요한 layer만 쌓은 이미지만 빌드하면 되기 때문에 기존 VM보다 훨씬 가볍다. 하지만 docker에는 여러개의 컨테이너를...","categories": ["Kubernetes"],
        "tags": ["Docker","Kubernetes"],
        "url": "https://rere950303.github.io/kubernetes/Kubernetes2/",
        "teaser": null
      },{
        "title": "Linux",
        "excerpt":"들어가며   리눅스의 기초   ","categories": [],
        "tags": [],
        "url": "https://rere950303.github.io/linux/",
        "teaser": null
      },{
        "title": "[Spring][Security] CORS",
        "excerpt":"들어가며 CORS 문제를 백엔드 단계에서 해결하는 과정을 기록하기 위한 포스팅 CORS란 Cross-Origin Resource Shaing의 약자로써 출처가 다른 서버의 리소스에 대한 접근을 통제하는 브라우저 메커니즘을 말한다. 출처라 함은 프로토콜 + 호스트 + 포트를 의미한다. OPTIONS(Origin, Access-Control-Request-Method 헤더값) 요쳥을 통해 response 헤더의 Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Methods 등으로 접근 가능 여부를 판단하고 실제 본...","categories": ["Spring/Security"],
        "tags": ["Spring","Security","CORS"],
        "url": "https://rere950303.github.io/spring/security/CORS/",
        "teaser": null
      },{
        "title": "[Kubernetes] 쿠버네티스",
        "excerpt":"들어가며 해당 게시글은 인프런 subicura 강사님의 초보를 위한 쿠버네티스 안내서 강의를 바탕으로 쓰였음을 미리 밝힙니다. 쿠버네티스 시작하기 컨테이너 오케스트레이션 1/4(서버를 관리한다는 것) 문서화 -&gt; 서버 관리 도구 -&gt; VM -&gt; 컨테이너 문서화를 통해 서버 관리 메뉴얼을 만들수 있지만 누락된 부분이나 버전 변경, 업데이트 누락 등으로 문제가 발생할 수 있다. 서버...","categories": ["Kubernetes"],
        "tags": ["Docker","Kubernetes"],
        "url": "https://rere950303.github.io/kubernetes/Kubernetes/",
        "teaser": null
      },{
        "title": "[Java] 메모리 해제",
        "excerpt":"배열을 이용한 스택의 메모리 누수 방지 Object[] stack과 같은 객체 참조 배열을 이용한 스택의 경우 pop연산시 메모리 누수가 발생한다. 따라서 pop과 같은 연산을 할 때에는 배열 값에 null을 대입하여 GC의 대상이 되도록 해야 한다. (LRU) 캐시 메모리 누수 방지 강한 참조 변수를 키로 하는 HashMap의 경우 null이 되더라도 컬랙션 클래스에...","categories": ["Java"],
        "tags": ["Java","WeakHashMap","GC","Memory","Reference Object"],
        "url": "https://rere950303.github.io/java/memoryfree/",
        "teaser": null
      }]
