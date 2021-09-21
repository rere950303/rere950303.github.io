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
        "title": "[Spring] 객체 지향 설계와 스프링",
        "excerpt":"좋은 객체 지향 프로그래밍 스프링은 객체 지향 언어가 가진 강력한 특징을 살려내는 프레임워크 객체 지향 언어의 특징: 캡슐화, 다형성, 추상화, 상속 역할과 구현의 분리 -&gt; 인터페이스와 구현클래스 다형성으로 인터페이스를 구현한 객체(서버 기능 구현)를 실행 시점에 유연하게 변경 확장 가능한 설계, 클라이언트에 영향을 주지 않는 구현클래스의 변경 스프링에서 이야기하는 제어의 역전,...","categories": ["Spring"],
        "tags": ["Object-oriented","Spring"],
        "url": "https://rere950303.github.io/spring/Object-oriented-design-and-spring/",
        "teaser": null
      }]
