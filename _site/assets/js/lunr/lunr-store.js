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
        "title": "[Spring][JPA] 자바 ORM 표준 JPA",
        "excerpt":"들어가며 JPA 소개 SQL 중심적인 개발의 문제점 객체 지향 언어 관계형 데이터베이스 객체를 관계형 데이터베이스에 관리 CRUD(객체를 SQL로, SQL을 자바 객체로) public class Member { private String memberId; private String name; ... } INSERT INTO MEMBER(MEMBER_ID, NAME) VALUES SELECT MEMBER_ID, NAME FROM MEMBER M UPDATE MEMBER SET ... 필드 수정시...","categories": ["Spring/JPA"],
        "tags": ["JPA","Spring"],
        "url": "https://rere950303.github.io/spring/jpa/JPA/",
        "teaser": null
      },{
        "title": "[Spring][MVC] SpringMVC-part2",
        "excerpt":"들어가며 해당 게시글은 인프런 김영한 강사님의 스프링 MVC 2편 - 백엔드 웹 개발 활용 기술 강의를 바탕으로 쓰였음을 미리 밝힙니다. 메시지, 국제화 메시지, 국제화 소개 메시지: 여러 화면에 보이는 상품명, 가격, 수량 등 label 에 있는 단어를 변경하려면 다음 화면들을 다 찾아가면서 모두 변경해야 한다. 화면 수가 적으면 문제가 되지...","categories": ["Spring/MVC"],
        "tags": ["MVC","Spring"],
        "url": "https://rere950303.github.io/spring/mvc/SpringMVC-part2/",
        "teaser": null
      }]
