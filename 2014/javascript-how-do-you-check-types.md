<!--
Hidden field
-->
# 你是如何检查JavaScript数据类型的？

JavaScript的数据是动态类型，运行时可以动态改变变量的数据类型。然而程序中仍然有很多情况需要判断当前变量的数据类型。那么有什么有效的方法吗？

JavaScript中数据类型有`String`, `Number`, `Boolean`, `Array`, `Object` 和`undefined`类型。另外，正则表达式类型`RegExp`，`Function`类型和时间类型`Date`也是常见的类型。因此，我们希望能对一个变量正确地检查出这些类型。

## typeof
`typeof` 是JavaScript的关键字，能检查出给定变量的类型。对上述类型用`typeof`做一个测试：
```javascript
typeof 123 //"number"

typeof 'abc' //"string"

typeof true //"boolean"

typeof [1, 2, 3] //"object"

typeof undefined //"undefined"

typeof (new Date) //"object"

typeof Function //"function"

typeof /abc/ //"object"
```

因此，不难看出`typeof`能很好的识别出`Number`, `String`, `Boolean`和`undefined`类型（输出的类型名都为小写），而对于复合类型都输出`object`。对复合类型的输出虽然正确，但不能准确定位具体类型。

## toString
`toString`这儿指的是全局的函数，在浏览器中是`window.toString`，在node.js中指的是`global.toString`。对目标变量运行toString也能打印它的数据类型，测试如下：
```javascript
toString.call(123); //"[object Number]"

toString.call('abc'); //"[object String]"

toString.call(true); //"[object Boolean]"

toString.call([1, 2, 3]); //"[objet Array]"

toString.call(undefined); //"[object Undefined]"

toString.call(new Date); //"[object Date]"

toString.call(Function); //"[object Function]"

toString.call(/abc/); //"[object RegExp]"
```

因此，`toString`能更好地检测数据的类型。

那么对于自定义的数据类型`typeof`和`toString`能给出什么结果呢？假设有如下自定义数据类型
```javascript
function MyObject() {
    this.name = 'MyObject';
}
```
`typeof`和`toString`的检测结果是
```javascript
var obj = new MyObject;

typeof obj; //"object"

toString.call(obj); //"[object Object]"
```
因此，对于自定义类型， `typeof`和`toString`都不能满足我们的需求。

## instanceof
对于检测自定义类型，使用`instanceof`是一个有效的方法，它能判断给定的数据是否是某一类型的一个实例。
```javascript
var obj = new MyObject;

obj instanceof MyObject; //true
```

## oftype.js
`oftype.js`是一个简单小巧的检查JavaScript变量运行时的库，在node.js中通过命令`npm install oftype`安装。通过下面的代码来检查变量类型：
```javascript
var oftype = require('oftype');
oftype(some_var, EXPECTED_TYPE);
```
例如：
```javascript
var oftype = require('oftype');

var x = 123;
oftype(x, Number); //true;

var y = 'abc';
oftype(y, String); //true;

var z = new Date();
oftype(z, Date); //true;
```

对于自定义类型数据也可以检查，例如：
```javascript
function MyObj() {
    this.name = 'ABC';
}

var oftype = require('oftype');
var x = new MyObj();

oftype(x, MyObject); //true;
```

`undefined`和`null`是两个特殊的类型，`undefined`是一个类型标识符，该类型只有一个值，也就是其本身`undefined`. 因此对`undefined`的类型检查有如下代码：
```javascript
var x = undefined;
var oftype = require('oftype');

// 仅在x是undefined的情况下返回true
oftype(x, undefined); //true;
```

`null`是一个特殊的值，不属于任何类型，所以检查它的代码应该是如下：
```javascript
var x = null;
var oftype = require('oftype');

// 仅在x是null的情况下返回true
oftype(x, null); //true;
```

然而，有时我们希望null是Object类型的一个特殊值，因此可以加一个参数`nullAsObject: true`到函数调用中：
```javascript
var x = null;
var oftype = require('oftype');

oftype(x, Object); //false;
oftye(x, Object, {nullAsObject: true}); //true;
```

更多的时候，我们可能希望一次设置参数后，整个程序能检测`null`为`Object`类型，而不需要每次函数调用都给传参数。这时，可以通过设置`oftype`的全局参数来实现:
```javascript
var oftype = require('oftype');
oftype.nullAsObject = true;

var x = null;
var y = null;

oftype(x, Object); //true;
oftype(y, Object); //true;
```

参数`nullAsObject`的默认值是`false`

值得一提的是，原始数据类型（primitive types）的声明有两种方式：字面量（literal）和构造函数方式。理论上，通过构造函数构造的原始类型归属Object类型。然而这种情况下我们仍然期望它是原始数据类型。这时可以通过`primitiveObject`参数来控制：
```javascript
var oftype = require('oftype');
var x = new Number(123);

oftype(x, Number, {primitiveObject: true}); //true;
```

同`nullObject`参数类似，这个参数也可以全局设置。这个参数的默认值是`true`。
