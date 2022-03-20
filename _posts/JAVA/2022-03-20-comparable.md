---
title: "[Java] Comparable 구현"
last\_modified\_at: 2022-03-20T 2:19 +09:00
header:
  overlay\_color: "#333"
categories:
  - Java
tags:
  - Java
  - Comparable
  - Comparator
---
## 박싱된 기본 타입 클래스의 `compare` 이용하기
자바 7부터 박싱된 기본 타입 클래스에서 정적 메서드인 `compare`를 지원한다.

```java
@Override
public int compareTo(PhoneNumber pn) {
    int result = Short.compare(areaCode, pn.areaCode);

    if (result == 0) {
        result = Short.compare(prefix, pn.prefix);

        if (result == 0) {
            result = Short.compare(lineNum, pn.lineNum);
        }
    }

    return result;
}
```

## `Comparator` 비교자 생성 메서드 이용하기
```java
private static final Comparator<PhoneNumber> COMPARATOR =
        comparingInt((PhoneNumber) pn -> pn.areaCode)
                .thenComparingInt(pn -> pn.prefix)
                .thenComparingInt(pn -> pn.lineNum);

@Override
public int compareTo(Test o) {
    return COMPARATOR.compare(this, pn);
}
```

## 주의점
- 비교자(뺄셈)를 이용한 구현의 경우 오버플로우, 부동소수점 계산 방식 등 오류가 발생할 수 있으므로 지양해야 한다.
- `compareTo`를 이용한 동치 결과와 `equals`를 이용한 동치 결과가 같을 것을 권장한다. 정렬 기능을 지원하는 컬렉션의 경우 동치 판단을 `compareTo`로 하기 때문이다. 예를 들어 `BigDecimal("1.0")`과 `BigDecimal("1.00")`의 `equals` 동치 결과는 `false`이지만 `compareTo` 동치 결과는 `true`이므로 `HashSet`은 원소를 2개 갖지만 BST인 `TreeSet`은 1개의 원소를 가지게 된다.