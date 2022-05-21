---
title: "[Java] 생성자나 열거 타입으로 싱글턴임을 보증하라"
last\_modified\_at: 2022-05-21T 11:30 +09:00
header:
  overlay\_color: "#333"
categories:
  - Java
tags:
  - Java
  - Singleton
  - Enum
  - Constructor
---
## 들어가며
싱글턴임을 보장하기 위한 방법을 알아보기 위한 포스팅이며 해당 게시글은 인프런 백기선 강사님의 [이펙티브 자바 완벽 공략 1부](https://www.inflearn.com/course/이펙티브-자바-1/dashboard) 강의를 바탕으로 쓰였음을 미리 밝힙니다.

## 생성자를 사용하는 방법 1
- `private` 생성자를 생성해서 외부에서의 객체 생성을 막는다.
- `pulic static final` 객체 하나를 생성함으로써 싱글턴임을 보장 받는다.
- 인터페이스의 다형성과 목객체를 활용하여 테스트의 비용을 절감한다.

## 생성자를 사용하는 방법 2
- 리플렉션 기법을 통해 싱글턴을 깰 수 있다.
- 이를 방지하기 위해서는 `private static boolean` 변수를 선언해서 처음 초기화 이후부터의 2번째 생성자 호출을 막을 수 있다.
- 역직렬화의 경우도 싱글턴을 깰 수 있다. 이 경우 `private Object readResolve()` 메서드 정의해서 싱글턴 객체를 반환하게 함으로써 막을 수 있다.

## 생성자를 사용하는 방법 3
- `private static final` 객체 생성 후 정적 팩토리 메서드 통해 구현할 수도 있다.
- 위와 같은 방법으로 클라이언트 코드에 영향 없이 싱글턴이 아니게 변경할 수도 있다.
- 제네릭 싱글톤 정적 팩토리를 통해 싱글톤의 형변환이 가능하다.

```java
public class MetaElvis<T> {

    private static final MetaElvis<? extends Object> INSTANCE = new MetaElvis<Object>();

    private MetaElvis() { }

    @SuppressWarnings("unchecked")
    public static <E> MetaElvis<E> getInstance() {
        return (MetaElvis<E>) INSTANCE;
    }

    public void say(T t) {
        System.out.println(t);
    }
}
```
- 정적 팩토리를 람다 또는 메서드 참조를 통해 함수형 인터페이스인 `Suppler`로 공급할 수 있다.

## 열거 타입
- 열거 타입으로도 싱글턴을 보장받을 수 있고 리플렉션과 역질렬화에 안전하다.
- Enum도 인터페이스 구현이 가능하므로 테스트 시 인터페이스를 구현한 목객체를 통해 비용 절감이 가능하다.

## 메서드 참조
- 함수형 인터페이스를 구현한 익명 클래스 객체를 람다식으로 구현할 수 있다.
- 람다식 안에서 하나의 메서드만 사용되는 경우 클래스 이름 또는 참조 변수를 활용한 메서드 참조로 변경할 수 있다.
- 또한 매개변수를 하나만 받는 인스턴스 메서드의 경우 예외적으로 클래스 이름으로 참조가 가능하다.

## 객체 직렬화
- 바이트 스트림으로 변환한 객체를 파일로 저장하거나 네트워트를 통해 다른 시스템으로 전송할 수 있다.
- `transient`, `static` 키워드가 붙은 필드는 직렬화되지 않는다.
- 직렬화 후에 클래스 변경 시 serialVersionUID의 변경으로 역직렬화 되지 않는다. 이경우 필드로 serialVersionUID 값을 설정하게 되면 클래스가 변경되어도 역직렬화 가능하다.

