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







