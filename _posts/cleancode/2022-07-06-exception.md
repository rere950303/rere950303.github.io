---
title: "[CleanCode] 오류 처리"
last\_modified\_at: 2022-07-06T 12:19 +09:00
header:
  overlay\_color: "#333"
categories:
  - CleanCode
tags:
  - Exception
  - CleanCode
  - Checked
  - Unchecked
---
## 들어가며
우아하게 예외를 처리하기 위한 방법을 알아보기 위한 포스팅

## Checked 예외를 Unchecked 예외로 변경
- `Checked` 예외의 경우 `try ~ catch` 또는 `throws`로 예외 처리가 강요된다. 이 과정에서 모든 중간단계 메서드에서 예외를 던져야 하며 OCP에 위배된다.
- 따라서 `Checked` 예외를 던지는 메서드의 경우 예외를 감싸는 클래스의 생성 후 `RuntimeException`을 상속한 `Unchecked` 예외로 변경하면 메서드를 호출하는 클라이언트 입장에서 매우 편리해지며 예외 처리가 간단해진다.

```java
LocalPort port = new LocalPort(12);

try {
    port.open();
} catch (PortDeviceFailure e) {
    reportError(e);
    log.info(~);
} finally {
    ...
}

public class LocalPort {
    private ACMEPort innerPort;

    public LocalPort (int portNumber) {
        innerPort = new ACMEPort(portNumber);
    }

    public void open() {
        try {
            innerPort.open();
        } catch (CheckedException1 e1) {
            throw new PortDeviceFailure(e1);
        } catch (CheckedException2 e2) {
            throw new PortDeviceFailure(e2);
        } ...
    }
}
```

## 실무 예외 처리 패턴
- `getOrElse`: 예외 대신 기본 값을 리턴한다. `null` 체크를 안 해줘도 되는 장점이 존재한다. `Collections.emptyList`와 같은 도메인의 기본 값이 없을 경우 `getUserLevelOrDefault()`와 같은 메서드로 도메인에 맞는 기본 값을 생성해서 넘겨주거나 `orElse(T other)`와 같은 메서드를 제공해서 넘겨받고자 하는 기본 값을 클라이언트에서 정하도록 설계할 수도 있다.
- `getOrElseThrow`: 기본 값이 없을 경우 `null` 대신 예외를 던진다. `getUserOrElseThorw()` 또는 `getUserOrElseThorw(Supplier<? extends X> exceptionSupplier)`를 통해 예외를 던지도록 설계하면 클라이언트는 로직 설계가 간단해진다.
- 메서드의 경우 파라미터의 `null`을 체크하여 `RuntiemException`을 던지거나 `assert` 키워드를 통해서 에러를 발생시켜야 한다.
- 보통 `RuntiemException`을 상속한 커스텀 예외를 던지게 한다. 이를 통해 에러 파악이 더욱 용이해진다.