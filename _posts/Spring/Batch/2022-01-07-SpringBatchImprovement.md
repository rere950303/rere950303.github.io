---
title: "[Spring][Batch] Spring Batch performance improvement"
last\_modified\_at: 2022-01-07T 3:40 +09:00
header:
  overlay\_color: "#333"
categories:
  - Spring/Batch
tags:
  - Batch
  - Spring
  - Thread
---
## 들어가며
영화 오픈 API를 이용한 프로젝트의 10000건 정도의 Batch 성 작업에 많은 시간이 소요됨에 따라 이를 해결하기 위한 포스팅

## 문제점
- 로그 결과 대부분의 시간은 외부 오픈 API 통신에서 소요
- 멀티 스레드는 동기화 문제로 효과가 미흡하거나 오히려 오버헤드 발생
- DB 갱신 시 request 실시간 반응성 떨어짐
- 한 번에 10000건의 엔티티를 메모리로 올리기 너무 헤비하고 부담
- mariadb의 경우 기본키 할당 전략을 `GenerationType.SEQUENCE`으로 할 경우 allocationSize가 1로 고정이 되므로 insert의 성능이 저하(약 14초 정도 딜레이 발생)

## 공략법
- 따라서 단일 스레드로 진행하고 한 번에 10000건의 Entity를 메모리에 올리면 부담이 되므로 4개의 Step으로 나누어 진행
- 일정 기준으로 10000건의 DB를 갱신할 때 request 반응 딜레이를 최소화하기 위해 엔티티 indexing을 하여 Step 단위로 `delete` 쿼리 실행
- 따라서 `Movie` 엔티티의 경우 기본키 전략을 직접 할당으로 바꾸어서 해당 기본키로 indexing을 진행한다. 이 경우 불필요한 `select` 쿼리를 방지하기 위해 `Persistable` 인터페이스 구현
- 또한 Chunk 단위로 commit이 되기 때문에 jdbc의 batch insert 효과를 극대화하기 위해 chunk 사이즈를 100에서 500으로 증가

```java
private void deleteQuery(long firstIndex, long lastIndex) {
    Query query = entityManager.createQuery("DELETE FROM Movie m where m.id > :firstIndex and m.id < :lastIndex");
    int deleteCount = query.setParameter("firstIndex", firstIndex).setParameter("lastIndex", lastIndex).executeUpdate();
    log.info("deleteCount: {}", deleteCount);
}
```
```java
@Override
public boolean isNew() {
    return createdDate == null;
}
```

## 고찰
- 의도한 대로 `select` 쿼리는 나가지 않았으며 Chunk 단위로 `insert` 쿼리가 나갔으며 정해진 범위의 `delete` 쿼리로 데이터 중복 및 딜레이 현상을 방지했다.
- 하루 단위로 DB를 갱신할 때 request에 대한 반응성이 좋았음
- `ChunkOrientedTasklet` 이 실행될 때마다 매번 새로운 트랜잭션이 생성되어 처리가 이루어지고 Chunk 단위로 commit이 이루어지는데 다음 포스팅에서는 commit 순간의 batch insert flush의 원리 및 DB lock에 대해 알아보겠다.



