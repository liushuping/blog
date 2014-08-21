# JavaScript一个分号的麻烦
## 麻烦
最近更新了一下一些JavaScript的库文件，本来以为没什么问题，却发现整个页面都无法显示了。打开Chrome浏览器调试窗口发现是一些JavaScript库文件执行时出现各种奇怪的错误。由于引用的代码文件都是min版本，而且数量较多，所以一直摸不着头脑。

## 文件的组织
JavaScript和CSS的代码都是通过ASP.NET MVC项目来组织的，通过[Bundle](http://www.asp.net/mvc/tutorials/mvc-4/bundling-and-minification)功能来实现文件的压缩与合并。为了保留三方JavaScript库文件的copyright信息，对其只做了合并成一个文件的操作，但并未压缩。因此，为了减少文件的尺寸，三方JavaScript库文件都是引用的min版本（带copyright）。于是，很长时间问题的原因都没有查到。

不经意间把压缩的功能也打开了，也就是说ASP.NET不但会合并指定的JavaScript文件，并且压缩它们（虽然它们本身已经是压缩版本了）。这时却发现问题消失了。

## 原因
通过各种`console.log`打印信息的方式，最终发现原因是因为某个事先压缩好的文件结尾缺少了分号，造成文件合并时跟后面的代码直接连结而产生错误。这个代码是这样的结构
```javascript
(function(){})()
```
而这个文件是用[Web Essential](http://vswebessentials.com/)事先压缩的，*它居然不在文件结尾处添加分号！* 直接造成了这么大的麻烦。

## 好的习惯
因此，为了避免类似的问题，一个好的习惯是在文件末尾记得添加一个分号，让代码自律，不能对其它无辜代码造成“伤害”
```javascript
(function(){})();
```
作为预防性措施，[防卫性代码](http://en.wikipedia.org/wiki/Defensive_programming)也是很有必要的：以分号开始一个文件来防止其它不“规矩”的代码带来“伤害”
```javascript
;(function(){})();
```

Crockford在他的JavaScript代码规范中这样提到
> Put a ; (semicolon) at the end of every simple statement. 
http://javascript.crockford.com/code.html

---
By liushuping
