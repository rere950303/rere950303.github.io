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
        "title": "[JAVA] equals()&hashCode() 오버라이딩",
        "excerpt":"해싱이란 해시함수를 이용해서 데이터를 해시테이블에 링크드리스트 형태로 저장하고 검색하는 기법을 말한다. 해시함수는 데이터가 저장되어 있는 곳을 알려 주기 때문에 다량의 데이터 중에서도 원하는 데이터를 빠르게 찾을 수 있다. Objects클래스의 hashCode() 메소드가 해시함수를 구현하고 있다. 동일한 객체에 대해 여러 번 hashCode()를 호출해도 동일한 값을 반환해야 한다. equals()가 참인 두 객체의 hashCode()...","categories": ["JAVA"],
        "tags": ["JAVA","equals","hashCode"],
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
        "title": "[Spring][Core] 스프링 핵심 원리",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 핵심 원리 - 기본편 강의를 바탕으로 쓰였음을 미리 밝힙니다. 객체 지향 설계와 스프링 좋은 객체 지향 프로그래밍 스프링은 객체 지향 언어가 가진 강력한 특징을 살려내는 프레임워크 객체 지향 언어의 특징: 캡슐화, 다형성, 추상화, 상속 역할과 구현의 분리 -&gt; 인터페이스와 구현클래스 다형성으로 인터페이스를 구현한...","categories": ["Spring/Core"],
        "tags": ["Object-oriented","Spring"],
        "url": "https://rere950303.github.io/spring/core/SpringCore/",
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
        "title": "[JAVA] Optional 클래스의 filter()메서드",
        "excerpt":"public Optional&lt;T&gt; filter(Predicate&lt;? super T&gt; predicate) { Objects.requireNonNull(predicate); if (!isPresent()) { return this; } else { return predicate.test(value) ? this : empty(); } } public static&lt;T&gt; Optional&lt;T&gt; empty() { @SuppressWarnings(\"unchecked\") Optional&lt;T&gt; t = (Optional&lt;T&gt;) EMPTY; return t; } private static final Optional&lt;?&gt; EMPTY = new Optional&lt;&gt;(); private Optional() { this.value...","categories": ["JAVA"],
        "tags": ["JAVA","Optional","filter"],
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
        "title": "[Docker] 도커와 CI환경",
        "excerpt":"들어가며 해당 게시글은 인프런 John Ahn 강사님의 [따라하며 배우는 도커와 CI환경][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다. 도커 기본 도커를 쓰는 이유 Installer를 통한 설치의 경우 갖고 있는 서버, 패키지 버전, 운영체제 등에 따라 프로그램을 설치하는 과정중에 많은 에러들이 발생한다. 또한 그 과정이 복합하다. 도커를 이용하여 예상치 못한 에러를 줄일 수...","categories": ["Docker"],
        "tags": ["Docker","CI"],
        "url": "https://rere950303.github.io/docker/Docker&CI/",
        "teaser": null
      },{
        "title": "[Javascript] Javascript",
        "excerpt":"Javascript 언어소개 웹브라우저: 경고창 등 탈 웹브라우저: 웹서버까지 확장 php, python, java … node.js, Spring 탈 웹: Google Apps Script 언어란: 의사소통을 위한 약속(문법) 환경이란: 다양한 분야에서의 사용 alert(‘hello world’); -&gt; 웹브라우저 write(‘hello world’); -&gt; 웹서버 msgBox(‘hello world’); -&gt; SpreadSheet Javascript 기본 - 실행방법과 실습환경 코드 작성과 실행 &lt;!DOCTYPE html&gt;...","categories": ["Javascript"],
        "tags": ["Javascript"],
        "url": "https://rere950303.github.io/javascript/JavaScript/",
        "teaser": null
      },{
        "title": "[AWS] AWS",
        "excerpt":"S3(Simple Storage Service)  구성요소     Bucket   Folder   Object(File)   ","categories": ["AWS"],
        "tags": ["AWS"],
        "url": "https://rere950303.github.io/aws/AWS/",
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
      }]
