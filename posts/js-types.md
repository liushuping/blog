# 你是如何检查JavaScript数据类型的？

JavaScript的数据是动态类型，运行时可以动态改变变量的数据类型。然而程序中仍然有很多情况需要判断当前变量的数据类型。那么有什么有效的方法吗？

JavaScript中数据类型有`String`, `Number`, `Boolean`, `Array`, `Object` 和`Undefined`类型。另外，正则表达式类型`RegExp`和时间类型`Date`也是常见的类型。因此，我们希望能对一个变量正确地检查出这些类型。

## typeof
`typeof` 是JavaScript的关键字，能检查出给定变量的类型。对上述类型用`typeof`做一个测试：
```javascript
typeof 123 //"number"

typeof 'abc' //"string"

typeof true //"boolean"

typeof [1, 2, 3] //"object"

typeof undefined //"undefined"

typeof (new Date) //"object"

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

toString.call(/abc/); //"[object RegExp]"
```

因此，`toString`能更好地检测数据的类型。

那么对于自定义的数据类型`typeof`和`toString`能给出什么结果呢？假设有如下自定义数据类型
```javascript
function MyObject() {
    this.name = 'MyObject';
}
```
`typeof`和`toString'的检测结果是
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
