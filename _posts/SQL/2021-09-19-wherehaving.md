---
title: "[SQL] WHERE과 HAVING의 차이"
last\_modified\_at: 2021-09-19T 8:05 +09:00
header:
  overlay\_color: "#333"
categories:
  - SQL
tags:
  - SQL
  - "HAVING"
  - WHERE
  - GROUP BY
---
## WHERE
```sql
SELECT ~
FROM 테이블
WHERE ~
GROUP BY ~
```

FROM의 테이블에서 GROUP BY 전에 테이블의 행을 걸러내고 그룹화를 진행한다.

## HAVING
```sql
SELECT ~
FROM 테이블
GROUP BY ~
HAVING ~
```

FROM의 테이블에서 먼저 그룹화를 진행하고 HAVING 절에서 `count(*) > 1` 과 같은 조건으로 그룹 걸러낸다.

---

즉 요약하면 WHERE은 그룹화 전에 HAVING은 그룹화 후에 실행된다.

