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
## where절
```sql
SELECT ~
FROM 테이블
where ~
GROUP BY ~
```

From절의 테이블에서 GROUP BY 전에 테이블의 행을 걸러내고 그룹화를 진행한다.

## HAVING절
```sql
SELECT ~
FROM 테이블
GROUP BY ~
having ~
```

From절의 테이블에서 먼저 그룹화를 진행하고 having 절에서 `count(*) > 1` 과 같은 조건으로 그룹 걸러낸다.

---

즉 요약하면 where절은 그룹화 전에 having절은 그룹화 후에 실행된다.

