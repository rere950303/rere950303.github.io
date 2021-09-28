---
title: "[JAVA] equals()&hashCode() 오버라이딩"
last\_modified\_at: 2021-09-18T 6:31 +09:00
header:
  overlay\_color: "#333"
categories:
  - JAVA
tags:
  - JAVA
  - equals
  - hashCode
toc: false
---
해싱이란 해시함수를 이용해서 데이터를 해시테이블에 링크드리스트 형태로 저장하고 검색하는 기법을 말한다.<br />
해시함수는 데이터가 저장되어 있는 곳을 알려 주기 때문에 다량의 데이터 중에서도 원하는 데이터를 빠르게 찾을 수 있다. 
Objects클래스의 hashCode() 메소드가 해시함수를 구현하고 있다.

---
1. 동일한 객체에 대해 여러 번 hashCode()를 호출해도 동일한 값을 반환해야 한다.
2. equals()가 참인 두 객체의 hashCode() 결과는 반드시 같아야 한다.
3. equals()가 거짓인 두 객체의 hashCode() 결과가 같을 수 있지만 HastMap등에서 검색 속도가 떨어져 성능이 저하될 수 있으므로 서로 다른 값을 반환하도록 적절히 오버라이딩 해야한다.

---

```java
public int hashCode() {
    return Objects.hash(name, age);
}
```

위와 같은 방식으로 오버라이딩 할 수 있다.
