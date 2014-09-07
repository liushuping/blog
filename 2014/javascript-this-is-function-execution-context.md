#JavaScript this is the function execution context

`this` keyword in JavaScript is confusing for a lot developers who come from OO world (i.e. Java, C++ or C#)as they assume it should behave exactly the same as in other languages for example `this` in C++. Actually `this` keyword in JavaScript is totally different from `this` in most OO languages.

##What does `this` refer to in JavaScript
In one word, `this` in JavaScript refers to the function execution context. More specificly, `this` keyword in a function refers to the object to which the function belongs when it is executing. 

For example, below code defines a function `foo` which sets `this.name` to value `foo`.
```javascript
function foo() {
    this.name = 'foo';
}
```
If directly run this function, the `name` property will be set to `window` object (in browser) or `global` object (in node.js) because in this case, `foo` belongs to `window` or `global` object. In other word, `window` or `global` is the execution context of function `foo`.

If a function is declared as a property of an object, then `this` from the function will be the reference to the object. For example, in below code `this` in function `foo` refers to the object `obj`.
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
In above code, object `obj` is a new instance of  `MyObj`, so `obj` has a property named `name` with value `"MyObj"`. However, if we don't use `new` operator but just directly call function like `var x = MyObj();`. As a result, we get `undefined` for x becasue function `MyObj` has no return. Even worse is that it also has side effects: it generates a `name` property on `window` or `global` object!  So naming convention is important, if a function is declared in Pascal naming it is pretented to be used as a class rather than a plain function!

##`this` can be changed in different run time
