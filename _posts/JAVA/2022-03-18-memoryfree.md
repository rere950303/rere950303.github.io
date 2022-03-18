---
title: "[Java] 메모리 해제"
last\_modified\_at: 2022-03-18T 5:22 +09:00
header:
  overlay\_color: "#333"
categories:
  - Java
tags:
  - Java
  - WeakHashMap
  - GC
  - Memory
  - Reference Object
---
## 배열을 이용한 스택의 메모리 누수 방지
`Object[] stack`과 같은 객체 참조 배열을 이용한 스택의 경우 `pop`연산시 메모리 누수가 발생한다. 따라서 `pop`과 같은 연산을 할 때에는 배열 값에 `null`을 대입하여 GC의 대상이 되도록 해야 한다.

## (LRU) 캐시 메모리 누수 방지
강한 참조 변수를 키로 하는 `HashMap`의 경우 `null`이 되더라도 컬랙션 클래스에 담겨있다면 GC의 대상이 되지 않는다. 따라서 이럴 경우 `WeakHashMap`를 이용해야 한다. 약한 참조 변수를 `key`로 저장하며 강한 참조 변수가 `null`이 되면 GC의 대상이 되고 해당 엔트리가 삭제된다. 하지만 Constant pool이라는 메모리 공간에 존재하는 특정 범위의 `Integer` 인스턴스나 문자열 리터럴의 경우는 제거되지 않는다.

## 주의점
`WeakHashMap`과 같이 객체 재사용을 지원하는 `Reference Object`을 이용한 컬랙션 클래스의 경우 오버헤드가 존재한다. 주기적으로 미참조 데이터를 삭제해야 하고 경우에 따라 `ReferenceQueue`를 관리하면서 리소스에 대한 후처리 작업이 필요할 수도 있기 때문이다. 따라서 메모리 누수를 방지하거나 객체 재사용의 경우 이러한 트레이드 오프를 고려해서 신중히 사용해야 한다. 
