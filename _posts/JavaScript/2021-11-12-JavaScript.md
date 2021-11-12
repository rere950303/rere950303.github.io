---
title: "[Javascript] Javascript"
last\_modified\_at: 2021-11-12T 11:30 +09:00
header:
  overlay\_color: "#333"
categories:
  - JavaScript
tags:
  - JavaScript
---
## JavaScript 언어소개
- 웹브라우저: 경고창 등
- 탈 웹브라우저: 웹서버까지 확장
  - php, python, java ...
  - node.js, Spring
- 탈 웹: Google Apps Script
- 언어란: 의사소통을 위한 약속(문법)
- 환경이란: 다양한 분야에서의 사용
  - alert('hello world'); -> 웹브라우저
  - write('hello world'); -> 웹서버
  - msgBox('hello world'); -> SpreadSheet

## Javascript 기본 - 실행방법과 실습환경
### 코드 작성과 실행
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
</head>

<body>
    <script>
        alert('Hello world');
    </script>
</body>

</html>
```

## 비교
### 비교 연산자
- `==`: 데이터 타입 유무와 상관없이 값이 같으면 true
- `===`: 데이터 타입까지 일치해야 true

### 부정과 부등호
- `!=` <-> `==`
- `!==` <-> `===`

## 함수
### 함수란
```javascript
fucntion 함수명 ([인자]) {
  코드
  return 반환값
}
```
```javascript
function numbering() {
  document.write(1);
}
numbering();
```

### 함수의 입력
```javascript
function get_argument(arg) {
  return arg;
}

alert(get_argumetn(1));
alert(get_argumetn(2)));
```

### 다양한 함수 정의 방법
```javascript
numbering = function () {
  i = 0;
  while(i < 10) {
    documnet.write(1);
    i++;
  }
}
```
- 익명 함수

```javascript
(function (){
  i = 0;
  while(i < 10) {
    document.write(i);
    i++;
  }
})();
```

## 객체
### 객체의 소개와 문법
```javascript
var grades = {'egoing': 10, 'k8805': 6, 'soriagli': 80};
```
```javascript
var grades = {};
grades['egoing'] = 10; // grades.egoing
grades['sdf'] = 6;
grades['ggg'] = 102;
```

### 객체와 반복문
```javascript
var grades = {'egoing': 10, 'k8805': 6, 'sorialgi': 80};
for(key in grades) {
    document.write("key : "+key+" value : "+grades[key]+"<br />");
}
```

### 객체 지향 프로그래밍
```javascript
var grades = {
    'list': {'egoing': 10, 'k8805': 6, 'sorialgi': 80},
    'show' : function(){
        for(var name in this.list){
            document.write(name+':'+this.list[name]+"<br />");
        }
    }
};
grades.show();
```

## 모듈
### 모듈화
- greeting.js

```javascript
function welcome(){
    return 'Hello world';
}
```
- main.html

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <script src="greeting.js"></script>
</head>

<body>
    <script>
        alert(welcome());
    </script>
</body>

</html>
```

### 라이브러리
- jquery는 Javascript의 라이브러리이다.
- jquery를 사용하는 경우

```html
<!DOCTYPE html>
<html>

<head>
    <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
</head>

<body>
    <ul id="list">
        <li>empty</li>
        <li>empty</li>
        <li>empty</li>
        <li>empty</li>
    </ul>
    <input id="execute_btn" type="button" value="execute" />
    <script type="text/javascript">
        $('#execute_btn').click(function () {
            $('#list li').text('coding everybody');
        })
    </script>
</body>

</html>
```
- jquery를 사용하지 않는 경우

```html
<!DOCTYPE html>
<html>

<body>
    <ul id="list">
        <li>empty</li>
        <li>empty</li>
        <li>empty</li>
        <li>empty</li>
    </ul>
    <input id="execute_btn" type="button" value="execute" />
    <script type="text/javascript">
        function addEvent(target, eventType, eventHandler, useCapture) {
            if (target.addEventListener) { // W3C DOM
                target.addEventListener(eventType, eventHandler, useCapture ? useCapture : false);
            } else if (target.attachEvent) {  // IE DOM
                var r = target.attachEvent("on" + eventType, eventHandler);
            }
        }
        function clickHandler(event) {
            var nav = document.getElementById('list');
            for (var i = 0; i < nav.childNodes.length; i++) {
                var child = nav.childNodes[i];
                if (child.nodeType == 3)
                    continue;
                child.innerText = 'Coding everybody';
            }
        }
        addEvent(document.getElementById('execute_btn'), 'click', clickHandler);
    </script>
</body>

</html>
```

## 정규표현식
### 패턴 만들기
- 정규표현식 리터럴

```javascript
var pattern = /a/
```
- 정규표현식 객체 생성자

```javascript
var pattern = new RegExp('a');
```

### RegExp 객체의 사용
- RegExp.exec()

```javascript
console.log(pattern.exec('abcdef')); // ["a"]
console.log(pattern.exec('abcdef')); // ["ab"], pattern = /a./
console.log(pattern.exec('bcdefg')); // null
```
- RegExp.test()

```javascript
console.log(pattern.test('abcdef')); // true
cnosole.log(pattern.test('bcdefg')); // false
```

### String과 정규표현식
- String.match()

```javascript
console.log('abcdef'.match(pattern)); // ["a"]
console.log('bcdefg'.match(pattern)); // null
```
- String.replace()

```javascript
console.log('abcdef'.replace(pattern, 'A'));  // Abcdef
```
### 옵션(i, g)
- i를 붙이면 대소문자를 구분하지 않는다.

```javascript
var xi = /a/;
console.log("Abcde".match(xi)); // null
var oi = /a/i;
console.log("Abcde".match(oi)); // ["A"];
```
- g를 붙이면 검색된 모든 결과를 리턴한다.

```javascript
var xg = /a/;
console.log("abcdea".match(xg)); // ["a"]
var og = /a/g;
console.log("abcdea".match(og)); // ["a", "a"]
```

### 캡쳐
```javascript
var pattern = /(\w+)\s(\w+)/;
var str = "coding everybody";
var result = str.replace(pattern, "$2, $1");
console.log(result); // "everybdy, coding"
```

### 치환
```javascript
var urlPattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*/gim;
var content = '생활코딩 : http://opentutorials.org/course/1 입니다. 네이버 : http://naver.com 입니다. ';
var result = content.replace(urlPattern, function(url){
    return '<a href="'+url+'">'+url+'</a>';
});
console.log(result);
```
```html
생활코딩 : <a href="http://opentutorials.org/course/1">http://opentutorials.org/course/1</a> 입니다. 네이버 : <a href="http://naver.com">http://naver.com</a> 입니다.
```

## 함수지향 - 값으로서의 함수와 콜백
### 함수의 용도 - 1
- JavaScript에서는 함수도 객체다. 다시 말해서 일종의 값이다. 거의 모든 언어가 함수를 가지고 있다. JavaScript의 함수가 다른 언어의 함수와 다른 점은 함수가 값이 될 수 있다는 점이다.

```javascript
function a(){}
```
```javascript
a = {
    b:function(){
    }
};
```
- 함수는 값이기 때문에 다른 함수의 인자로 전달 될수도 있다.

```javascript
function cal(func, num){
    return func(num)
}
function increase(num){
    return num+1
}
function decrease(num){
    return num-1
}
alert(cal(increase, 1));
alert(cal(decrease, 1));
```

### 값으로서의 함수와 콜백 - 함수의 용도 2
- 함수는 함수의 리턴 값으로도 사용할 수 있다.

```javascript
function cal(mode){
    var funcs = {
        'plus' : function(left, right){return left + right},
        'minus' : function(left, right){return left - right}
    }
    return funcs[mode];
}
alert(cal('plus')(2,1));
alert(cal('minus')(2,1));   
```
- 당연히 배열의 값으로도 사용할 수 있다.

```javascript
var process = [
    function(input){ return input + 10;},
    function(input){ return input * input;},
    function(input){ return input / 2;}
];
var input = 1;
for(var i = 0; i < process.length; i++){
    input = process[i](input);
}
alert(input); // 60.5
```

### 값으로서의 함수와 콜백 - 콜백이란?
- 값으로 사용될 수 있는 특성을 이용하면 함수의 인자로 함수로 전달할 수 있다. 값으로 전달된 함수는 호출될 수 있기 때문에 이를 이용하면 함수의 동작을 완전히 바꿀 수 있다. 인자로 전달된 함수 sortNumber의 구현에 따라서 sort의 동작방법이 완전히 바뀌게 된다.

```javascript
function sortNumber(a,b){
    // 위의 예제와 비교해서 a와 b의 순서를 바꾸면 정렬순서가 반대가 된다.
    return b-a;
}
var numbers = [20, 10, 9,8,7,6,5,4,3,2,1];
alert(numbers.sort(sortNumber)); // array, [20,10,9,8,7,6,5,4,3,2,1]
```

### 비동기 콜백과 Ajax
- 콜백은 비동기처리에서도 유용하게 사용된다. 시간이 오래걸리는 작업이 있을 때 이 작업이 완료된 후에 처리해야 할 일을 콜백으로 지정하면 해당 작업이 끝났을 때 미리 등록한 작업을 실행하도록 할 수 있다. 다음 코드는 일반적인 환경에서는 작동하지 않고 서버 환경에서만 동작한다.
- datasource.json.js: `{"title":"JavaScript","author":"egoing"}`

```html
<!DOCTYPE html>
<html>

<head>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
</head>

<body>
    <script type="text/javascript">
        $.get('./datasource.json.js', function (result) {
            console.log(result);
        }, 'json');
    </script>
</body>

</html>
```

## 함수지향 - 클로저
### 내부함수, 외부함수
- 클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.  
- 내부함수

```javascript
function outter(){
    function inner(){
        var title = 'coding everybody'; 
        alert(title);
    }
    inner();
}
outter();
```
- 내부함수는 외부함수의 지역변수에 접근할 수 있다.

```javascript
function outter(){
    var title = 'coding everybody';  
    function inner(){        
        alert(title);
    }
    inner();
}
outter();
```

### 클로저란?
- 클로저(closure)는 내부함수와 밀접한 관계를 가지고 있는 주제다. 내부함수는 외부함수의 지역변수에 접근 할 수 있는데 외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근 할 수 있다. 이러한 메커니즘을 클로저라고 한다. 아래 예제는 이전의 예제를 조금 변형한 것이다. 결과는 경고창으로 coding everybody를 출력할 것이다.

```javascript
function outter(){
    var title = 'coding everybody';  
    return function(){        
        alert(title);
    }
}
inner = outter();
inner();
```
- 클로저란 내부함수가 외부함수의 지역변수에 접근 할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특성을 의미한다.

### private variable
```javascript
function factory_movie(title){
    return {
        get_title : function (){
            return title;
        },
        set_title : function(_title){
            title = _title
        }
    }
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('Matrix');
 
alert(ghost.get_title()); // 'Ghost in the shell'
alert(matrix.get_title()); // 'Matrix'
 
ghost.set_title('공각기동대');
 
alert(ghost.get_title()); // '공각기동대'
alert(matrix.get_title()); // 'Matrix' 
```

### 클로저의 응용
```javascript
var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(){
        return i;
    }
}
for(var index in arr) {
    console.log(arr[index]()); // 5 5 5 5 5
}
```
```javascript
var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(id) {
        return function(){
            return id;
        }
    }(i);
}
for(var index in arr) {
    console.log(arr[index]()); // 0 1 2 3 4
}
```

## 함수지향 - arguments
### arguments
- 함수에는 arguments라는 변수에 담긴 숨겨진 유사 배열이 있다. 이 배열에는 함수를 호출할 때 입력한 인자가 담겨있다. 아래 예제를 보자. 결과는 10이다.

```javascript
function sum(){
    var i, _sum = 0;    
    for(i = 0; i < arguments.length; i++){
        document.write(i+' : '+arguments[i]+'<br />');
        _sum += arguments[i];
    }   
    return _sum;
}
document.write('result : ' + sum(1,2,3,4));
```
- arguments는 함수안에서 사용할 수 있도록 그 이름이나 특성이 약속되어 있는 일종의 배열이다. arguments[0]은 함수로 전달된 첫번째 인자를 알아낼 수 있다. 또 arguments.length를 이용해서 함수로 전달된 인자의 개수를 알아낼 수도 있다. 이러한 특성에 반복문을 결합하면 함수로 전달된 인자의 값을 순차적으로 가져올 수 있다. 그 값을 더해서 리턴하면 인자로 전달된 값에 대한 총합을 구하는 함수를 만들 수 있다.

### 매개변수의 수 - function length
- 매개변수와 관련된 두가지 수가 있다. 하나는 함수.length, 다른 하나는 arguments.length이다. arguments.length는 함수로 전달된 실제 인자의 수를 의미하고, 함수.length는 함수에 정의된 인자의 수를 의미한다. 아래의 코드를 보자.

```javascript
function zero(){
    console.log(
        'zero.length', zero.length,
        'arguments', arguments.length
    );
}
function one(arg1){
    console.log(
        'one.length', one.length,
        'arguments', arguments.length
    );
}
function two(arg1, arg2){
    console.log(
        'two.length', two.length,
        'arguments', arguments.length
    );
}
zero(); // zero.length 0 arguments 0 
one('val1', 'val2');  // one.length 1 arguments 2 
two('val1');  // two.length 2 arguments 1
```

## 함수지향 - 함수의 호출
### apply 소개
```javascript
function func(){
}
func();
```
- JavaScript는 함수를 호출하는 특별한 방법을 제공한다. 위의 예제에서 함수 func는 Function이라는 객체의 인스턴스다. 따라서 func는 객체 Function이 가지고 있는 메소드들을 상속하고 있다. 지금 이야기하려는 메소드는 Function.apply과 Function.call이다. 이 메소드들을 이용해서 함수를 호출해보자. 결과는 3이다.

```javascript
function sum(arg1, arg2){
    return arg1+arg2;
}
alert(sum.apply(null, [1,2]))
```
- 함수 sum은 Function 객체의 인스턴스다. 그렇기 때문에 객체 Function 의 메소드 apply를 호출 할 수 있다. apply 메소드는 두개의 인자를 가질 수 있는데, 첫번째 인자는 함수(sum)가 실행될 맥락이다. 두번째 인자는 배열인데, 이 배열의 담겨있는 원소가 함수(sum)의 인자로 순차적으로 대입된다. Function.call은 사용법이 거의 비슷하다.

### apply 사용
```javascript
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
function sum(){
    var _sum = 0;
    for(name in this){
        _sum += this[name];
    }
    return _sum;
}
alert(sum.apply(o1)) // 6
alert(sum.apply(o2)) // 185
```
- 우선 두개의 객체를 만들었다. o1는 3개의 속성을 가지고 있다. 각각의 이름은 val1, val2,val3이다. o2는 4개의 속성을 가지고 있고 o1과는 다른 속성 이름을 가지고 있고 속성의 수도 다르다. 그 다음엔 함수 sum을 만들었다. 이 함수는 객체의 속성을 열거할 때 사용하는 for in 문을 이용해서 객체 자신(this)의 값을 열거한 후에 각 속성의 값을 지역변수 _sum에 저장한 후에 이를 리턴하고 있다.
- 객체 Function의 메소드 apply의 첫번째 인자는 함수가 실행될 맥락이다. 이렇게 생각하자. sum.apply(o1)은 함수 sum을 객체 o1의 메소드로 만들고 sum을 호출한 후에 sum을 삭제한다. 아래와 비슷하다. (실행결과가 조금 다를 것이다. 그것은 함수 for in문으로 객체 o1의 값을 열거할 때 함수 sum도 포함되기 때문이다.)

```javascript
o1.sum = sum;
alert(o1.sum());
delete o1.sum();
```
- sum이 o1 소속의 메소드가 된다는 것은 이렇게 바꿔 말할 수 있다. 함수 sum에서 this의 값이 전역객체가 아니라 o1이 된다는 의미다. 일반적인 객체지향 언어에서는 하나의 객체에 소속된 함수는 그 객체의 소유물이 된다. 하지만 JavaScript에서 함수는 독립적인 객체로서 존재하고, apply나 call 메소드를 통해서 다른 객체의 소유물인 것처럼 실행할 수 있다. 흥미롭다.
만약 apply의 첫번째 인자로 null을 전달하면 apply가 실행된 함수 인스턴스는 전역객체(브라우저에서는 window)를 맥락으로 실행되게 된다.

## 객체지향 - 생성자와 new
### 자바스크립트의 객체지향
```javascript
var person = {}
person.name = 'egoing';
person.introduce = function(){
    return 'My name is '+this.name;
}
document.write(person.introduce());
```
```javascript
var person = {
    'name' : 'egoing',
    'introduce' : function(){
        return 'My name is '+this.name;
    }
}
document.write(person.introduce());
```

### 생성자와 new
- 함수를 호출할 때 new을 붙이면 새로운 객체를 만든 후에 이를 리턴한다.

```javascript
function Person(){} // 객체 생성자
var p1 = new Person();
p1.name = 'egoing';
p1.introduce = function(){
    return 'My name is '+this.name; 
}
document.write(p1.introduce()+"<br />");
 
var p2 = new Person();
p2.name = 'leezche';
p2.introduce = function(){
    return 'My name is '+this.name; 
}
document.write(p2.introduce());
```
- 생성자 내에서 이 객체의 프로퍼티를 정의하고 있다. 이러한 작업을 초기화라고 한다. 이를 통해서 코드의 재사용성이 대폭 높아졌다. 코드를 통해서 알 수 있듯이 생성자 함수는 일반함수와 구분하기 위해서 첫글자를 대문자로 표시한다.

```javascript
function Person(name){
    this.name = name;
    this.introduce = function(){
        return 'My name is '+this.name; 
    }   
}
var p1 = new Person('egoing');
document.write(p1.introduce()+"<br />");
 
var p2 = new Person('leezche');
document.write(p2.introduce());
```

## 객체지향 - 전역객체
- 모든 전역변수와 함수는 사실 window 객체의 프로퍼티다. 객체를 명시하지 않으면 암시적으로 window의 프로퍼티로 간주된다. 

```javascript
function func(){
    alert('Hello?');    
}
func();
window.func();

var o = {'func':function(){
    alert('Hello?');
}}
o.func();
window.o.func();
```
- ECMAScript에서는 전역객체의 API를 정의해두었다. 그 외의 API는 호스트 환경에서 필요에 따라서 추가로 정의하고 있다. 이를테면 웹브라우저 자바스크립트에서는 alert()이라는 전역객체의 메소드가 존재하지만 node.js에는 존재하지 않는다. 또한 전역객체의 이름도 호스트환경에 따라서 다른데, 웹브라우저에서 전역객체는 window이지만 node.js에서는 global이다. 

## 객체지향 - this
### 함수와 this
- this는 함수 내에서 함수 호출 맥락(context)를 의미한다. 맥락이라는 것은 상황에 따라서 달라진다는 의미인데 즉 함수를 어떻게 호출하느냐에 따라서 this가 가리키는 대상이 달라진다는 뜻이다. 함수와 객체의 관계가 느슨한 자바스크립트에서 this는 이 둘을 연결시켜주는 실질적인 연결점의 역할을 한다.
- 함수를 호출했을 때 this는 무엇을 가르키는지 살펴보자. this는 전역객체인 window와 같다.

```javascript
function func(){
    if(window === this){
        document.write("window === this");
    }
}
func(); 
```
### 메소드와 this
- 객체의 소속인 메소드의 this는 그 객체를 가르킨다. 

```javascript
var o = {
    func : function(){
        if(o === this){
            document.write("o === this");
        }
    }
}
o.func(); 
```

### 생성자와 this
```javascript
var funcThis = null; 
 
function Func(){
    funcThis = this;
}
var o1 = Func();
if(funcThis === window){
    document.write('window <br />');
}
 
var o2 = new Func();
if(funcThis === o2){
    document.write('o2 <br />');
}
```
- 생성자는 빈 객체를 만든다. 그리고 이 객체내에서 this는 만들어진 객체를 가르킨다. 이것은 매우 중요한 사실이다. 생성자가 실행되기 전까지는 객체는 변수에도 할당될 수 없기 때문에 this가 아니면 객체에 대한 어떠한 작업을 할 수 없기 때문이다. 

```javascript
function Func(){
    document.write(o); // undefined
}
var o = new Func();
```

### 객체로서 함수
- 함수는 Function 생성자 함수의 객체다.

```javascript
function sum(x, y) {return x + y;}

var sum = new Function('x', 'y', 'return x + y;');
```

### apply와 this
- 함수의 메소드인 apply, call을 이용하면 this의 값을 제어할 수 있다. 

```javascript
var o = {}
var p = {}
function func(){
    switch(this){
        case o:
            document.write('o<br />');
            break;
        case p:
            document.write('p<br />');
            break;
        case window:
            document.write('window<br />');
            break;          
    }
}
func();
func.apply(o);
func.apply(p);
```

## 객체지향 - 상속
### 상속이란
```javascript
function Person(name){
    this.name = name;
    this.introduce = function(){
        return 'My name is '+this.name; 
    }   
}
var p1 = new Person('egoing');
document.write(p1.introduce()+"<br />");
```
```javascript
function Person(name){
    this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
    return 'My name is '+this.name; 
}
var p1 = new Person('egoing');
document.write(p1.introduce()+"<br />");
```

### 상속의 사용법
- Programmer이라는 생성자를 만들었다. 그리고 이 생성자의 prototype과 Person의 객체를 연결했더니 Programmer 객체도 메소드 introduce를 사용할 수 있게 되었다. 
Programmer가 Person의 기능을 상속하고 있는 것이다. 단순히 똑같은 기능을 갖게 되는 것이라면 상속의 의의는 사라질 것이다. 부모의 기능을 계승 발전할 수 있는 것이 상속의 가치다.

```javascript
function Person(name){
    this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
    return 'My name is '+this.name; 
}
 
function Programmer(name){
    this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
    return "hello world";
}
 
var p1 = new Programmer('egoing');
document.write(p1.introduce()+"<br />");
document.write(p1.coding()+"<br />");
```

### 기능의 추가
```javascript
function Person(name){
    this.name = name;
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
    return 'My name is '+this.name; 
}
 
function Programmer(name){
    this.name = name;
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
    return "hello world";
}
 
var p1 = new Programmer('egoing');
document.write(p1.introduce()+"<br />");
document.write(p1.coding()+"<br />");
```

### prototype
- 그럼 prototype이란 무엇인가? 한국어로는 원형정도로 번역되는 prototype은 말 그대로 객체의 원형이라고 할 수 있다. 함수는 객체다. 그러므로 생성자로 사용될 함수도 객체다. 객체는 프로퍼티를 가질 수 있는데 prototype이라는 프로퍼티는 그 용도가 약속되어 있는 특수한 프로퍼티다. prototype에 저장된 속성들은 생성자를 통해서 객체가 만들어질 때 그 객체에 연결된다.
 
```javascript
function Ultra(){}
Ultra.prototype.ultraProp = true;
 
function Super(){}
Super.prototype = new Ultra();
 
function Sub(){}
Sub.prototype = new Super();
 
var o = new Sub();
console.log(o.ultraProp);
```

### prototype chain
- 생성자 Sub를 통해서 만들어진 객체 o가 Ultra의 프로퍼티 ultraProp에 접근 가능한 것은 prototype 체인으로 Sub와 Ultra가 연결되어 있기 때문이다. 내부적으로는 아래와 같은 일이 일어난다. prototype는 객체와 객체를 연결하는 체인의 역할을 하는 것이다. 이러한 관계를 prototype chain이라고 한다.

1. 객체 o에서 ultraProp를 찾는다.
2. 없다면 Sub.prototype.ultraProp를 찾는다.
3. 없다면 Super.prototype.ultraProp를 찾는다.
4. 없다면 Ultra.prototype.ultraProp를 찾는다.

## 객체지향 - 표준 내장객체의 확장
### 표준 내장 객체란
- 표준 내장 객체(Standard Built-in Object)는 자바스크립트가 기본적으로 가지고 있는 객체들을 의미한다. 내장 객체가 중요한 이유는 프로그래밍을 하는데 기본적으로 필요한 도구들이기 때문에다. 결국 프로그래밍이라는 것은 언어와 호스트 환경이 제공하는 기능들을 통해서 새로운 소프트웨어를 만들어내는 것이기 때문에 내장 객체에 대한 이해는 프로그래밍의 기본이라고 할 수 있다. 
  - Object
  - Function
  - Array
  - String
  - Boolean
  - Number
  - Math
  - Date
  - RegExp

### 배열의 확장 1
```javascript
var arr = new Array('seoul','new york','ladarkh','pusan', 'Tsukuba');
function getRandomValueFromArray(haystack){
    var index = Math.floor(haystack.length*Math.random());
    return haystack[index]; 
}
console.log(getRandomValueFromArray(arr));
```
### 배열의 확장 2
```javascript
Array.prototype.rand = function(){
    var index = Math.floor(this.length*Math.random());
    return this[index];
}
var arr = new Array('seoul','new york','ladarkh','pusan', 'Tsukuba');
console.log(arr.rand());
```

## 객체지향 - Object
### Object란
- Object 객체는 객체의 가장 기본적인 형태를 가지고 있는 객체이다. 다시 말해서 아무것도 상속받지 않는 순수한 객체다. 자바스크립트에서는 값을 저장하는 기본적인 단위로 Object를 사용한다. 
- 동시에 자바스크립트의 모든 객체는 Object 객체를 상속 받는데, 그런 이유로 모든 객체는 Object 객체의 프로퍼티를 가지고 있다.

```javascript
var grades = {'egoing': 10, 'k8805': 6, 'sorialgi': 80};
```

### Object 확장
- Object 객체를 확장하면 모든 객체가 접근할 수 있는 API를 만들 수 있다.

```javascript
Object.prototype.contain = function(neddle) {
    for(var name in this){
        if(this[name] === neddle){
            return true;
        }
    }
    return false;
}
var o = {'name':'egoing', 'city':'seoul'}
console.log(o.contain('egoing'));
var a = ['egoing','leezche','grapittie'];
console.log(a.contain('leezche'));
```

### Object 확장의 위험
- 그런데 Object 객체는 확장하지 않는 것이 바람직하다. 왜냐하면 모든 객체에 영향을 주기 때문이다. 

```javascript
for(var name in o){
    console.log(name);  
}

// name
// contain
```
- 확장한 프로퍼티인 contain이 포함되어 있다. 객체가 기본적으로 가지고 있을 것으로 예상하고 있는 객체 외에 다른 객체를 가지고 있는 것은 개발자들에게 혼란을 준다. 이 문제를 회피하기 위해서는 프로퍼티의 해당 객체의 소속인지를 체크해볼 수 있는 hasOwnProperty를 사용하면 된다. hasOwnProperty는 인자로 전달된 속성의 이름이 객체의 속성인지 여부를 판단한다. 만약 prototype으로 상속 받은 객체라면 false가 된다. 

```javascript
for(var name in o){
    if(o.hasOwnProperty(name))
        console.log(name);  
}
```

## 객체지향 - 데이터 타입
### 원시 데이터 타입과 객체
- 객체와 객체가 아닌 것
- 객체가 아닌 것(원시 데이터 타입)
  - 숫자
  - 문자열
  - 불리언(true/false)
  - null
  - undefined

### 래퍼 객체
```javascript
var str = 'coding';
// str = new String('coding')
console.log(str.length);        // 6
console.log(str.charAt(0));     // "C"
```
- 문자열은 분명히 프로퍼티와 메소드가 있다. 그렇다면 객체다. 그런데 왜 문자열이 객체가 아니라고 할까? 그것은 내부적으로 문자열이 원시 데이터 타입이고 문자열과 관련된 어떤 작업을 하려고 할 때 자바스크립트는 임시로 문자열 객체를 만들고 사용이 끝나면 제거하기 때문이다. 이러한 처리는 내부적으로 일어난다. 그렇기 때문에 몰라도 된다. 하지만 원시 데이터 타입과 객체는 좀 다른 동작 방법을 가지고 있기 때문에 이들을 분별하는 것은 결국엔 필요하다.

```javascript
var str = 'coding';
str.prop = 'everybody';
console.log(str.prop);      // undefined
```
- str.prop를 하는 순간에 자바스크립트 내부적으로 String 객체가 만들어진다. prop 프로퍼티는 이 객체에 저장되고 이 객체는 곧 제거 된다. 그렇기 때문에 prop라는 속성이 저장된 객체는 존재하지 않게된다. 이러한 특징은 일반적인 객체의 동작 방법과는 다르다. 
하지만 문자열과 관련해서 필요한 기능성을 객체지향적으로 제공해야 하는 필요 또한 있기 때문에 원시 데이터 형을 객체처럼 다룰 수 있도록 하기 위한 객체를 자바스크립트는 제공하고 있는데 그것이 레퍼객체(wrapper object)다. 레퍼객체로는 String, Number, Boolean이 있다. null과 undefined는 레퍼 객체가 존재하지 않는다.

## 객체지향 - 참조
### 복제란
```javascript
var a = 1;
var b = a;
b = 2;
console.log(a); // 1
```

### 참조
```javascript
var a = {'id':1};
var b = a;
b.id = 2;
console.log(a.id);  // 2
```
  
### 함수와 참조
```javascript
var a = 1;
function func(b){
    b = 2;
}
func(a);
console.log(a); // 1
```
```javascript
var a = {'id':1};
function func(b){
    b = {'id':2};
}
func(a);
console.log(a.id);  // 1
```
```javascript
var a = {'id':1};
function func(b){
    b.id = 2;
}
func(a);
console.log(a.id);  // 2
```