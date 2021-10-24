---
title: "[Spring][JPA] 스프링 데이터 JPA"
last\_modified\_at: 2021-10-24T 2:40 +09:00
header:
  overlay\_color: "#333"
JPA_1:
    - url: /assets/images/post/Spring/JPA/SpringData/1.png
      image_path: /assets/images/post/Spring/JPA/SpringData/1.png
JPA_2:
    - url: /assets/images/post/Spring/JPA/SpringData/2.png
      image_path: /assets/images/post/Spring/JPA/SpringData/2.png
categories:
  - Spring/JPA
tags:
  - JPA
  - Spring
---
## 들어가며
해당 게시글은 인프런 김영한 강사님의 [실전! 스프링 데이터 JPA][1] 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 공통 인터페이스 기능
### 공통 인터페이스 설정
{% include gallery id="JPA_1" %}

- `org.springframework.data.repository.Repository` 를 구현한 클래스는 스캔 대상
  - Spring Data JPA가 인터페이스를 구현한 프록시 객체를 생성한다.
- `@Repository` 애노테이션 생략 가능
  - Spring Data JPA가 컴포넌트 스캔을 자동으로 처리하여 Spring Context에서 관리하고 의존관계를 주입해준다.
  - JPA 예외를 스프링 예외로 변환하는 과정도 자동으로 처리한다.

### 공통 인터페이스 적용
```java
public interface MemberRepository extends JpaRepository<Member, Long> {
}
```
- T: 엔티티 타입
- ID: 식별자 타입(PK)

### 공통 인터페이스 분석
{% include gallery id="JPA_2" %}

- 주요 메서드
  - `save(S)` : 새로운 엔티티는 저장하고 이미 있는 엔티티는 병합한다.
  - `delete(T)` : 엔티티 하나를 삭제한다. 내부에서 `EntityManager.remove()` 호출
  - `findById(ID)` : 엔티티 하나를 조회한다. 내부에서 `EntityManager.find()` 호출
  - `getOne(ID)` : 엔티티를 프록시로 조회한다. 내부에서 `EntityManager.getReference()` 호출 
  - `findAll(...)` : 모든 엔티티를 조회한다. 정렬(`Sort`)이나 페이징(`Pageable`) 조건을 파라미터로 제공할 수 있다.

## 쿼리 메소드 기능
### 메소드 이름으로 쿼리 생성
```java
public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByUsernameAndAgeGreaterThan(String username, int age);
}
```
- 스프링 데이터 JPA는 메소드 이름을 분석해서 JPQL을 생성하고 실행
- 쿼리 메소드 필터 조건: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation
- 이 기능은 엔티티의 필드명이 변경되면 인터페이스에 정의한 메서드 이름도 꼭 함께 변경해야 한다. 그렇지 않으면 애플리케이션을 시작하는 시점에 오류가 발생한다. 이렇게 애플리케이션 로딩 시점에 오류를 인지할 수 있는 것이 스프링 데이터 JPA의 매우 큰 장점이다.

### `@Query`, 리포지토리 메소드에 쿼리 정의하기
```java
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select m from Member m where m.username= :username and m.age = :age")
    List<Member> findUser(@Param("username") String username, @Param("age") int age);
}
```
- `@org.springframework.data.jpa.repository.Query` 어노테이션을 사용
- JPA Named 쿼리처럼 애플리케이션 실행 시점에 문법 오류를 발견할 수 있음(매우 큰 장점!)

### 반환 타입
```java
List<Member> findByUsername(String name); //컬렉션 
Member findByUsername(String name); //단건
Optional<Member> findByUsername(String name); //단건 Optional
```
- 조회 결과가 많거나 없으면?
  - 컬렉션: 결과 없음: 빈 컬렉션 반환
- 단건 조회
  - 결과 없음: `null` 반환
  - 결과가 2건 이상: `javax.persistence.NonUniqueResultException` 예외 발생

### 순수 JPA 페이징과 정렬
```java
public List<Member> findByPage(int age, int offset, int limit) {
    return em.createQuery("select m from Member m where m.age = :age order by m.username desc")
            .setParameter("age", age)
            .setFirstResult(offset)
            .setMaxResults(limit)
            .getResultList();
}

public long totalCount(int age) {
    return em.createQuery("select count(m) from Member m where m.age = :age", Long.class)
            .setParameter("age", age)
            .getSingleResult();
}
```

### 스프링 데이터 JPA 페이징과 정렬
- 페이징과 정렬 파라미터
  - `org.springframework.data.domain.Sort`: 정렬 기능
  - `org.springframework.data.domain.Pageable`: 페이징 기능 (내부에 `Sort` 포함)
- 특별한 반환 타입
  - `org.springframework.data.domain.Page`: 추가 count 쿼리 결과를 포함하는 페이징
  - `org.springframework.data.domain.Slice`: 추가 count 쿼리 없이 다음 페이지만 확인 가능 (내부적으로 limit + 1조회)
  - `List`(자바 컬렉션): 추가 count 쿼리 없이 결과만 반환

```java
Page<Member> findByUsername(String name, Pageable pageable); //count 쿼리 사용 
Slice<Member> findByUsername(String name, Pageable pageable); //count 쿼리 사용 안함
List<Member> findByUsername(String name, Pageable pageable); //count 쿼리 사용 안함
List<Member> findByUsername(String name, Sort sort);
```

- count 쿼리를 다음과 같이 분리할 수 있음(성능 최적화시 고려사항)

```java
@Query(value = “select m from Member m”, countQuery = “select count(m.username)from Member m”)
Page<Member> findMemberAllCountBy(Pageable pageable);
```
- 페이지를 유지하면서 엔티티를 DTO로 변환하기

```java
Page<Member> page = memberRepository.findByAge(10, pageRequest);
Page<MemberDto> dtoPage = page.map(m -> new MemberDto());
```

### 벌크성 수정 쿼리
- JPA를 사용한 벌크성 수정 쿼리

```java
public int bulkAgePlus(int age) {
    int resultCount = em.createQuery(
                    "update Member m set m.age = m.age + 1" +
                            "where m.age >= :age")
            .setParameter("age", age)
            .executeUpdate();
    return resultCount;
}
```
- 스프링 데이터 JPA를 사용한 벌크성 수정 쿼리

```java
@Modifying
@Query("update Member m set m.age = m.age + 1 where m.age >= :age")
int bulkAgePlus(@Param("age") int age);
```
- 벌크성 수정, 삭제 쿼리는 `@Modifying` 어노테이션을 사용
- 벌크성 쿼리를 실행하고 나서 영속성 컨텍스트 초기화: `@Modifying(clearAutomatically = true)` (이 옵션의 기본값은 `false` )
  - 이 옵션 없이 회원을 `findById`로 다시 조회하면 영속성 컨텍스트에 과거 값이 남아서 문제가 될 수 있다. 만약 다시 조회해야 하면 꼭 영속성 컨텍스트를 초기화 하자.
- 권장하는 방안
  1. 영속성 컨텍스트에 엔티티가 없는 상태에서 벌크 연산을 먼저 실행한다.
  2. 부득이하게 영속성 컨텍스트에 엔티티가 있으면 벌크 연산 직후 영속성 컨텍스트를 초기화 한다.

### `@EntityGraph`
- JPQL 페치 조인

```java
@Query("select m from Member m left join fetch m.team")
List<Member> findMemberFetchJoin();
```
- 스프링 데이터 JPA는 JPA가 제공하는 엔티티 그래프 기능을 편리하게 사용하게 도와준다. 이 기능을 사용하면 JPQL 없이 페치 조인을 사용할 수 있다. (JPQL + 엔티티 그래프도 가능)

```java
//공통 메서드 오버라이드
@Override
@EntityGraph(attributePaths = {"team"})
List<Member> findAll();

//JPQL + 엔티티 그래프 
@EntityGraph(attributePaths = {"team"})
@Query("select m from Member m")
List<Member> findMemberEntityGraph();

//메서드 이름으로 쿼리에서 특히 편리하다. 
@EntityGraph(attributePaths = {"team"})
List<Member> findByUsername(String username)
```
- 사실상 페치 조인(FETCH JOIN)의 간편 버전
- LEFT OUTER JOIN 사용

### JPA Hint & Lock
- JPA 쿼리 힌트(SQL 힌트가 아니라 JPA 구현체에게 제공하는 힌트)

```java
@QueryHints(value = @QueryHint(name = "org.hibernate.readOnly", value = "true"))
Member findReadOnlyByUsername(String username);
```
--> 변경 감지를 통한 update 쿼리가 실행되지 않는다.

## 확장 기능
### 사용자 정의 리포지토리 구현
- 스프링 데이터 JPA 리포지토리는 인터페이스만 정의하고 구현체는 스프링이 자동 생성
- 스프링 데이터 JPA가 제공하는 인터페이스를 직접 구현하면 구현해야 하는 기능이 너무 많음

```java
public interface MemberRepositoryCustom {
    List<Member> findMemberCustom();
}
```
```java
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {
    private final EntityManager em;

    @Override
    public List<Member> findMemberCustom() {
        return em.createQuery("select m from Member m")
                .getResultList();
    }
}
```
```java
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
}
```
- 스프링 데이터 JPA가 인식해서 스프링 빈으로 등록
- 커스텀 인터페이스 이름은 자유
- 규칙: 리포지토리 인터페이스 이름(`MemberRepository`) + `Impl` 또는 커스텀 리포지토리 인터페이스 이름(`MemberRepositoryCustom`) + `Impl`
- 항상 사용자 정의 리포지토리가 필요한 것은 아니다. 그냥 임의의 리포지토리를 만들어도 된다. 예를들어 `MemberQueryRepository`를 인터페이스가 아닌 클래스로 만들고 스프링 빈으로 등록해서 그냥 직접 사용해도 된다. 물론 이 경우 스프링 데이터 JPA와는 아무런 관계 없이 별도로 동작한다.  

--> 핵심 비즈니스 로직이 필요한 리포지토리의 경우 굳이 인터페이스 커스톰을 통해 구현할 필요가 없다. 아키텍쳐 구조와 프레젠테이션 단계에서 필요한 로직 등을 종합적으로 고려하여 별도의 리포지토리 클래스를 만들지 아니면 하나의 커스텀 인터페이스로 구현할지를 정한다.

### Auditing
- 엔티티를 생성, 변경할 때 변경한 사람과 시간을 추적
- 순수 JPA 사용

```java
@MappedSuperclass
@Getter
public class JpaBaseEntity {
    @Column(updatable = false)
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        createdDate = now;
        updatedDate = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedDate = LocalDateTime.now();
    }
}
```
```java
public class Member extends JpaBaseEntity {}
```
- JPA 주요 이벤트 어노테이션: `@PrePersist`, `@PostPersist`, `@PreUpdate`, `@PostUpdate`
- 스프링 데이터 JPA 사용
  - `@EnableJpaAuditing` -> 스프링 부트 설정 클래스에 적용해야함
  - `@EntityListeners(AuditingEntityListener.class)` -> 엔티티에 적용
  - 사용 어노테이션: `@CreatedDate`, `@LastModifiedDate`, `@CreatedBy`, `@LastModifiedBy`

```java
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class BaseEntity {
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;
    
    @CreatedBy
    @Column(updatable = false)
    private String createdBy;
    
    @LastModifiedBy
    private String lastModifiedBy;
}
```
```java
@Bean
public AuditorAware<String> auditorProvider() {
    return () -> Optional.of(UUID.randomUUID().toString());
}
```
- 실무에서는 세션 정보나, 스프링 시큐리티 로그인 정보에서 ID를 받음
- 특정 엔티티에 등록자, 수정자가 필요 없는 경우에는 Base 타입을 분리하고 필요에 따라 상속하면 된다.

```java
public class BaseTimeEntity {
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;
}

public class BaseEntity extends BaseTimeEntity {
    @CreatedBy
    @Column(updatable = false)
    private String createdBy;
    @LastModifiedBy
    private String lastModifiedBy;
}
```

### Web 확장 - 페이징과 정렬
```java
@GetMapping("/members")
public Page<Member> list(Pageable pageable) {
    Page<Member> page = memberRepository.findAll(pageable);
    return page;
}
```
- 파라미터로 `Pageable` 을 받을 수 있다.
- `Pageable` 은 인터페이스, 실제는 `org.springframework.data.domain.PageRequest` 객체 생성
- 요청 파라미터(`/members?page=0&size=3&sort=id,desc&sort=username,desc`)
  - page: 현재 페이지, 0부터 시작한다.
  - size: 한 페이지에 노출할 데이터 건수
- 기본값
- 글로벌 설정: 스프링 부트

```yaml
spring.data.web.pageable.default-page-size=20 /# 기본 페이지 사이즈/ 
spring.data.web.pageable.max-page-size=2000 /# 최대 페이지 사이즈/
```
- 개별 설정: `@PageableDefault` 어노테이션을 사용

```java
@RequestMapping(value = "/members_page", method = RequestMethod.GET)
public String list(@PageableDefault(size = 12, sort = “username”, direction = Sort.Direction.DESC) Pageable pageable) {
}
```
- Page 내용을 DTO로 변환하기
  - 엔티티를 API로 노출하면 다양한 문제가 발생한다. 그래서 엔티티를 꼭 DTO로 변환해서 반환해야 한다.
  - Page는 `map()` 을 지원해서 내부 데이터를 다른 것으로 변경할 수 있다.

```java
@GetMapping("/members")
public Page<MemberDto> list(Pageable pageable) {
    Page<Member> page = memberRepository.findAll(pageable);
    Page<MemberDto> pageDto = page.map(MemberDto::new);
    return pageDto;
}
```
- Page를 1부터 시작하기
  - 스프링 데이터는 Page를 0부터 시작한다.
  - `Pageable`, `Page` 를 파리미터와 응답 값으로 사용히지 않고, 직접 클래스를 만들어서 처리한다.  
  그리고 직접 `PageRequest`(`Pageable` 구현체)를 생성해서 리포지토리에 
넘긴다. 물론 응답값도 Page 대신에 직접 만들어서 제공해야 한다.

## 스프링 데이터 JPA 분석
### 스프링 데이터 JPA 구현체 분석
- 스프링 데이터 JPA가 제공하는 공통 인터페이스의 구현체(`org.springframework.data.jpa.repository.support.SimpleJpaRepositor`)

```java
@Repository
@Transactional(readOnly = true)
public class SimpleJpaRepository<T, ID> {
    ...
    @Transactional
    public <S extends T> S save(S entity) {
        if (entityInformation.isNew(entity)) {
            em.persist(entity);
            return entity;
        } else {
            return em.merge(entity);
        }
    }
}
```
- `@Repository` 적용: JPA 예외를 스프링이 추상화한 예외로 변환
- @Transactional 트랜잭션 적용
  - JPA의 모든 변경은 트랜잭션 안에서 동작해야 한다.
  - 스프링 데이터 JPA는 변경(등록, 수정, 삭제) 메서드를 트랜잭션 처리
  - 서비스 계층에서 트랜잭션을 시작하지 않으면 리파지토리에서 트랜잭션 시작
  - 서비스 계층에서 트랜잭션을 시작하면 리파지토리는 해당 트랜잭션을 전파 받아서 사용
- `@Transactional(readOnly = true)`
  - 데이터를 단순히 조회만 하고 변경하지 않는 트랜잭션에서 `readOnly = true` 옵션을 사용하면 플러시를 생략해서 약간의 성능 향상을 얻을 수 있음. 변경 감지 기능을 사용하지 않음.
  - 새로운 엔티티면 저장( `persist` ) - 식별자가 없을때
  - 새로운 엔티티가 아니면 병합( `merge` ) - 식별자가 있을때

### 새로운 엔티티를 구별하는 방법
- 새로운 엔티티를 판단하는 기본 전략
  - 식별자가 객체일 때 `null` 로 판단
  - 식별자가 자바 기본 타입일 때 `0` 으로 판단
  - `Persistable` 인터페이스를 구현해서 판단 로직 변경 가능

```java
package org.springframework.data.domain;

public interface Persistable<ID> {
    ID getId();
    boolean isNew();
}
```
- Persistable 구현

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item implements Persistable<String> {
    @Id
    private final String id;
    
    @CreatedDate
    private LocalDateTime createdDate;

    public Item(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public boolean isNew() {
        return createdDate == null;
    }
}
```
- JPA 식별자 생성 전략이 `@GenerateValue` 면 `save()` 호출 시점에 식별자가 없으므로 새로운 엔티티로 인식해서 정상 동작한다. 그런데 JPA 식별자 생성 전략이 `@Id` 만 사용해서 
  직접 할당이면 이미 식별자 값이 있는 상태로 `save()` 를 호출한다. 따라서 이 경우 `merge()` 가 호출된다. `merge()` 는 우선 DB를 호출해서 값을 확인하고, DB에 값이 없으면 
  새로운 엔티티로 인지하므로 매우 비효율 적이다.  
  따라서 `Persistable` 를 사용해서 새로운 엔티티 확인 여부를 직접 구현하게는 효과적이다. 참고로 등록시간( `@CreatedDate` )을 
  조합해서 사용하면 이 필드로 새로운 엔티티 여부를 편리하게 확인할 수 있다. 새로운 엔티티의 경우 `isNew()` 메소드 실행후 `persist()` 과정에서 JPA에 의해 `@CreatedDate` 가 
  동작하기 때문이다.

[1]: https://www.inflearn.com/course/스프링-데이터-JPA-실전/dashboard
