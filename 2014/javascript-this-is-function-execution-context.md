#JavaScript this is the Function Execution Context

`this` keyword in JavaScript is confusing for a lot developers who come from OO world (i.e. Java, C++ or C#) as they assume it should behave exactly the same as in other languages for example `this` in C++. Actually `this` keyword in JavaScript is totally different from it in most OO languages.

##What does `this` refer to in JavaScript
In one word, *`this` in JavaScript refers to the function execution context*. More specifically, `this` keyword in a function refers to the object to which the function belongs when it is executing. 

For example, below code defines a function `foo` which sets `this.name` to value `foo`.
```javascript
function foo() {
    this.name = 'foo';
}
```
If directly run this function, the `name` property will be set to `window` object (in browser) or `global` object (in node.js) because in this case `foo` belongs to `window` or `global` object. In other word, `window` or `global` is the execution context of function `foo`.

If a function is declared as a property of an object, `this` from it will be the reference to the object. For example, in below code `this` in function `foo` refers to the object `obj`.
```javascript	
var obj = {
    foo: function() {
        this.name = 'foo';
    }
}
```

A function can also be used as a `class` to generate a new instance with the `new` operator.
```javascript
function MyObj() {
    this.name = 'MyObj';
}

var obj = new MyObj();
```
In above code, object `obj` is a new instance of  `MyObj`, so `obj` has a property named `name` with value `"MyObj"`. However, if we don't use `new` operator but just directly call function like `var x = MyObj();`. As a result, we get `undefined` for x because function `MyObj` has no return. Even worse is that it also has side effects: it generates a `name` property on `window` or `global` object!  So naming convention is important, if a function is declared in Pascal naming it is pretended to be used as a class rather than a plain function!

##`this` can be changed in different run time
There will be no confusion if `this` constantly refers to the same object. Unfortunately it is not, the above `MyObj` example has already demonstrated this.

Actually there are a lot other examples showing that `this` could refer to different objects in different conditions. For example, the `foo` function is defined on object `obj1`, so the `this` keyword refers to `obj1`. But later on I assigned the `foo` function to object `obj2` then the `this` keyword in `foo` (the one which belongs to `obj2`) will refer to `obj2`
```javascript
var obj1 = {
    foo: function() {
        this.name = 'foo';
    }
};

var obj2 = {};
obj2.foo = obj1.foo;
```

In the code, there are 2 copies of function `foo`, one is in object `obj1` and another one is in object `obj2`. 

JavaScript also support changing the function execution context when running the function. Suppose we have an object `obj3` as below:
```javascript
var obj3 = {};
```
Then we could even execute the `foo` function on `obj3`:
```javascript
obj1.foo.call(obj3);
```
In this situation, the `this` keyword in `foo` function refers to the actual parent object which is `obj3`.

##Why it is important knowing `this` is function execution context
Let's see an example of using jQuery. Suppose we register a callback on a button's click event:
```javascript
$('.button').click(function() {
    console.log(this);
});
```
What is `this` from the code refers to? it refers to the element that jQuery has selected, in this case is the '.button'. If we are not aware of this, we may have written below code:
```javascript
function MyObj() {
    this.name = 'MyObj';
    this.register = function() {
        $('.button').click(function() {
            // expected to output 'MyObj';
            console.log(this.name);
        });
    };
}

var obj = new MyObj();
obj.register();
```
Then we expected the output of clicking the button is 'MyObj', but actually not, because the jQuery has its own function execution definition which is the element itself. 

##How to explicitly set the function execution context
In most cases if a function is called by our own code, we could simply use `call` or `apply` function to change the fuction execution context. However, in some cases the function is a callback and we have no control of how the function is called. So, in this condition `Function.prototype.bind` will help us by binding a function to a specific object. Still take the jQuery example:
```javascript
function MyObj() {
    this.name = 'MyObj';
    this.register = function() {
        var callback = function() {
            // expected to output 'MyObj';
            console.log(this.name);
        };
        
        //bind the callback to this (the instance of MyObj);
        callback = callback.bind(this);
        
        $('.button').click(callback);
    };
}

var obj = new MyObj();
obj.register();
```

Some JavaScript library also implemented this, for example underscore.js is a great library we could use, it has a lot functional programming style functions, from which the `bind` and `bindAll` are the functions for changing a function's execution context. it is an equivalent of `Function.prototype.bind`.

Somethimes we also use the `that` pattern to solve the issue. `that` is a clone of `this` by using closure. By doing this, we avoid the changing of `this` reference.
```javascript
function MyObj() {
    this.name = 'MyObj';
    this.register = function() {
        var that = this;
        $('.button').click(function() {
            // expected to output 'MyObj';
            console.log(that.name);
        });
    };
}

var obj = new MyObj();
obj.register();
```
---
by liushuping
