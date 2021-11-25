---
title: "[DB] Basic Query Structure"
last\_modified\_at: 2021-11-25T 1:37 +09:00
header:
  overlay\_color: "#333"
categories:
  - DB
tags:
  - DB
---
## Data-manipulation language(DML)
- insert, delete, update tuples
- typical SQL

```sql
SELECT A1, A2, ..., An // attribute
FROM r1, r2, ..., rm // relation
WHERE P // predicate
```

## The SELECT Clause
- 대소문자를 구별하지 않는다.
- `distinct` 키워드로 중복되는 값을 제거할 수 있다.
- asterisk(*): 모든 속성을 선택
- 산술연산을 사용할 수 있다.(+, -, *, /)

```sql
SELECT ID, nmae, salary / 12 // 기존 relation에는 영향 X
FROM instructor
```

## The WHERE Clause
- 관계대수에서의 selection predicate에 대응
- 결과 relation에서 predicate를 만족하는 tuple만을 추출
- logical connectives -> and, or, not

```sql
SELECT name
FROM instructor
WHERE dept_name = Comp. Sci. and salary > 80000
```

## The FROM Clause
- 쿼리에 필요한 relation를 나열
- Cartesian product(공통되는 속성이 있을경우 속성 앞에 relation 이름을 붙여 구별한다.)

```sql
SELECT *
FROM instructor, teaches
```

### Joins
- 원하는 data가 하나의 relation에 없을 경우 2개 이상의 relation을 join
- Cartesian product와 where절 이용

```sql
SELECT name, course_id
FROM instructor, teaches
WHERE instructor.ID = teaches.ID 
```