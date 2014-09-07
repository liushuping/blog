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


