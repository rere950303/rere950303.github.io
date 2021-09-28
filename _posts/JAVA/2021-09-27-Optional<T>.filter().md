---
title: "[JAVA] Optional 클래스의 filter()메서드"
last\_modified\_at: 2021-09-27T 3:29 +09:00
header:
  overlay\_color: "#333"
categories:
  - JAVA
tags:
  - JAVA
  - Optional
  - filter
toc: false
---
```java
public Optional<T> filter(Predicate<? super T> predicate) {
    Objects.requireNonNull(predicate);
    
    if (!isPresent()) {
        return this;
    } else {
        return predicate.test(value) ? this : empty();
    }
} 
```

```java
public static<T> Optional<T> empty() {
    @SuppressWarnings("unchecked")
    Optional<T> t = (Optional<T>) EMPTY;
    return t;
}
```

```java
private static final Optional<?> EMPTY = new Optional<>();
```

```java
private Optional() {
    this.value = null;
}     
```

함수형 인터페이스인 `Predicate`의 `test()`를 구현한 익명 클래스 객체를 람다식으로 하여 매개변수로 넘겨주게 된다.
참인 경우 그대로 `Optional`객체를 반환하고 거짓인 경우 값으로 null을 가지고 있는 빈 `Opional`객체를 넘겨주게 된다.
