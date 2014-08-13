# JavaScript Object as a Hastable

JavaScript has primitive types (Number, Boolean and String) and complex types (built-in and user defined objects). A JavaScript object could be easily understood by considering it as a "Hashtable".

## Hastable
In general, a hashtable has below listed typical features:
* Is a set of key-value pairs
* A value can be accessed(get, set and delete) by the key
* New key-value pair can be added into a hastable
* Keys of a hashtable can be iterated

A JavaScript object is a hashtable because it has these features. let's see how they are works in JavaScript.

## JavaScript object is a set of key-value pairs
Mostly, and also is a best practice, a JavaScript object is declared literally such as:

```javascript
var obj = {
    name: 'Test Object',
    description: 'A demo object'
};
```

Obviously, it is exactly a set of key-value pairs. A value for a key could also be another object, it represents a hastale nested in another one.

## JavaScript object value can be accessed by the key
Definitely, with a given JavaScript object `obj`, we can get it's property like this `obj.name`. And for sure, if you prefer the more hastable style of getting a value (a property), you could always use `obj['name']`. Actually, the hashtable style works for all situations, but the `object.property` style does not work for situations that the key is not a valid variable name defined by the language, such as `obj['a property']`.

So, with this dot(`.`) or indexer(`[]`) operator, we can just get and set the value linked to the key:

```javascript
// getting the name
var name = obj.name;
var name2 = obj['name'];

// setting the name
obj.name = 'name1';
obj['name'] = 'name2';
```

As hashtable also support removing a key-value pair from it, JavaScript does this with `delete` operator:

```javascript
// delete the name property from obj
delete obj.name;
```

Although this is supported by JavaScript, but a best practice is avoid deleting a property because it will cause a restructure of the object. So, if a property is not used any more, just set it to `undefined` or `null`.

## New key-value pair can be added into a JavaScript object
Simply by setting a value to a non-existing property will create a new property in that object.
```javascript
// adding a new property into obj.
obj.id = '123';

// test the new added property
console.log(obj.id); //123
```

### Keys of a JavaScript object can be literated
The JavaScript `for in` loop can iterate all keys in an object
```javascript
for (var key in obj) {
    console.log(key);
}
```

So, a JavaScript object is a Hastable as it meets all features of a hastable.

## Why it is important knowing a JavaScript object is a hastable?
It answers why there is no such a hastable or dictionary object in JavaScript. 
Because all object are hastables!

It answers why below code outputs `1 2 3` rather than `a b c`, because iterating over a hastable is iterating all the keys and keys for an array object are the array indexes.

```javascript
var arr = ['a', 'b', 'c'];

for (var x in arr) {
    console.log(x);
}
```

It answers why a function can also has properties
Because function is also an object (hastable)! More details will be in my later post on "Function as first class object"
```javascript
function foo() {
}

foo.some_property = 'abc';
```

Acutally this very useful. For example suppose we have a function `product`, and to void re-calcuating the numbers that we have done before, use can use memoization:
```javascript
var history = {};

function product (n) {
    if (n == 1) {
        return 1;
    } else if (history[n] != undefined) {
        return history[n];
    } else {
        var x = n * product(n - 1);
        history[n] = x;
        return x;
    }
}
```
This is good, but not perfect. To enable memoization an extra variable `history` is declared. But actually, we could just attach this extrac variable to the function:
```javascript
function product (n) {
    if (n == 1) {
        return 1;
    } else if (product.history[n] != undefined) {
         return product.history[n];
    } else {
        var x = n * product(n - 1);
        product.history[n] = x;
        return x;
    }
}
```

It is worth mentioning that in the example, the `history` variable well demonstrated the use of a JavaScript object as a hashtable for quick searching in O(1) time complexity.

---
by liushuping

