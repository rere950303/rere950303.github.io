---
title: "[DB] DB Components, Architecture"
last\_modified\_at: 2021-11-18T 5:50 +09:00
header:
  overlay\_color: "#333"
DB_3_1:
    - url: /assets/images/post/DB/3/1.png
      image_path: /assets/images/post/DB/3/1.png
DB_3_2:
    - url: /assets/images/post/DB/3/2.png
      image_path: /assets/images/post/DB/3/2.png
categories:
  - DB
tags:
  - DB
---
## Storage Management
- 저장 장치 관리자는 DB에 저장된 data와 App / query 사이에 인퍼테이스 역할을 하는 프로그램 모듈이다.
- file manager와 통신하면서 효율적인 data storing, retrieving, updating 역할을 한다.

## Query Processing
{% include gallery id="DB_3_1" %}

1. parser / translator 이용하여 관계대수표현으로 변환한다.
2. 통계자료를 통해 쿼리를 최적화하고 data를 얻기 위한 절차적 계획을 세운다.
3. 해당 계획을 실행하고 테이블 형태의 query output를 내놓는다.

## Transaction Management
- Database System Internal: user, query processor, storage manager, disk storage 로 구성
{% include gallery id="DB_3_2" layout="half"%}

- Transaction: DB App 에서 하나의 논리적 함수를 수행하기 위한 연산들의 집합을 말한다. DB 연산의 단위를 의미한다.
- Transaction-management component: system faulure / transaction faulre 에도 불구하고 data의 일관성을 유지시켜 준다.
- Concurrency-control manager: DB에 대한 동시 접근 제어함으로써 data의 일관성을 유지시키고 최대 많은 transaction을 허용함으로써 효율성을 극대화 시킨다.
  
## Database Architecture
- DB의 구조는 DB가 실행되고 있는 컴퓨터 시스템에 큰 영향을 받는다.
- Centralized: DB의 모든 요소가 단일 시스템에 포함(DBMS, App, API)
- Client-Server: 사용자가 필요한 특정 서버에 접근하는 방식
- Parallel: 여러 disk와 하나의 공유 메모리를 통해 처리량을 높이는 방식
- Distributed: DB를 여러개의 노드로 분산한후 통신을 통해 하나의 논리적 DB를 구축하는 방식