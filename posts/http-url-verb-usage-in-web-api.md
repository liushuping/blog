## 起因 
根据[维基百科的定义](http://en.m.wikipedia.org/wiki/Web_API)：Web API是指面向Web服务器或者Web浏览器以及其它HTTP客户端的API(应用程序编程接口)。Web API有不同的实现风格，比如常见的RPC和REST风格。而任何一种实现都是在HTTP基础之上的，HTTP消息的结构是Web API构成的主要元素，如HTTP URL，状态码(Status Code)和HTTP 方法(Verb)等。 
 
随着Web的蓬勃发展，大量的信息和数据出现在网络。因此，基于资源(Resource)的RESTful Web API变的异常流行。数量众多的关于如何设计优秀的REST API的文章等层出不穷。比如阮一峰的[RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html) ，其中也提到了一篇不错的文章[Principle of good RESTful API design](http://codeplanet.io/principles-good-restful-api-design/)。文章都提到了很多关于RESTful API的实用方法和原则。遗憾的是，有一些关于URL和HTTP Verb使用中容易误解的细节都没有被提及。 
 
结合我在学习和使用Web API的过程中的一些心得，我想就URL和HTTP Verb的几个小细节谈一下。由于讨论不局限在REST上，因此是Web API的讨论。 
 
## 关于URL 
在按照RESTful来设计的Web API中，URL所代表的正是它字面上所描述的意思：统一资源定位。也就是说URL在RESTful Web API中是对资源的位置标识。 
 
因此一条规则是：*在RESTful  Web API的URL中尽量不要附加跟资源定位无关的信息*  
 
比如下面示例都是良好的RESTful Web API可能的URL，URL中的所有信息都是用来定位资源的。 
``` 
/api/books 
/api/books/book-id 
/api/books?author=crockford 
``` 
而下面的这个例子则可能不是一些优秀的RESTful Web API所具备的URL，因为books资源的定位完全不依赖于访问这个API的用户登录时间。 
``` 
/api/books?user_login_on=2014-07-1 
``` 
 
然而以RPC风格设计的Web API中，URL失去了它字面所描述的意思。这时设计者期望的URL更是一个过程(procedure)名字，一个存在于服务器上的过程的名字。这种情况下，过程需要的"参数"都放在HTTP请求的body中。如下面的示例： 
``` 
/api/get-all-books 
/api/get-book 
/api/update-book 
``` 
"过程"需要的参数都建议放在HTTP body中。参数若放到URL中，便会破坏以URL来描述过程名的目的。比如下面的代码： 
``` 
/api/get-book?id=123 
``` 
从URL的整体来看，这已经不能算是一个过程的描述了，它带有了一些多余的干扰信息。 
 
## 关于HTTP Verb 
合理地配合URL使用HTTP Verb(动词)则可以定义语义良好的Web API。语义良好是用户能直观从API名本身了解其用途的基础，而不需过多地依赖相关解释性文档。 
 
在RESTful的Web API中，HTTP Verb的使用是应该尽量按照每一个Verb本身字面的意思来使用的。这样CRUD的做操作很容易映射到POST，GET，PUT，DELETE。当然还有一些其它的Verb也都可以映射到一些相关的操作，比如PATCH可以映射到Resource的局部更新。这儿需要提及一点的是，REST的使用一定要做到实用主义，而不是教条主义。教条主义也许会要求所有的Verb都严格地映射到相关指定的操作，然而受到各种实际情况的限制，这样的要求通常很难达到。比如限制读取操作一定要用GET方法，那么当Resource的描述超过浏览器对URL长度限制的情况时，API的实现就陷入两难境地。因此做为实用主义的RESTful Web API，我们首选RESTful的相关规则，然而在特殊情况下允许变通。 
 
下面的示例URL是一下良好的RESTful Web API的URL和Verb组合： 
``` 
HTTP 1.1 GET /api/books  
HTTP 1.1 POST /api/books 
HTTP 1.1 GET /api/books/123 
HTTP 1.1 PUT /api/books/123 
HTTP 1.1 DELETE /api/books/123  
``` 
那么在RPC风格的Web API中Verb的使用有什么规则呢？在前面介绍了，RPC风格的Web API中URL用做描述一个过程的名字，过程就代表了一个“动作”或“方法”。因此，HTTP Verb本身所表示的意思在RPC风格的Web API中也便不再重要，或者说是与URL所描述的“过程”有些冲突。然而，HTTP要求请求中必须有Verb，因此在实现RPC风格的Web API中只要选取一致的Verb即可。 
 
下面的示例就是一些不合适的URL和Verb组合，容易给使用者造成困惑： 
``` 
HTTP 1.1 GET /api/get-books 
HTTP 1.1 GET /api/get-book 
HTTP 1.1 PUT /api/update-book 
HTTP 1.1 DELETE /api/delete-book 
``` 
 
那么选取那个Verb呢？还是在前面的介绍中，建议把“过程”需要的参数放在HTTP body中。因此GET verb就被排除在外了（因为HTTP标准定义GET类型的HTTP请求不带body）。综合分析一下其它Verb后，POST便是一个不错的选择。PUT和DELETE都具有明显的意义，容易让用户产生一定误解。在RPC风格的Web API中，就可以把POST理解成“执行”。发一个HTTP请求就可理解为：执行一个由URL所描述的存在于服务器的远程过程。 
 
下面的示例URL就是一些不错的RPC风格的Web API例子： 
``` 
HTTP 1.1 POST /api/get-books 
HTTP 1.1 POST /api/get-book 
HTTP 1.1 POST /api/update-book 
HTTP 1.1 POST /api/delete-book 
``` 
 
## 总结 
总结有如下几点： 
* 在RESTful Web API的URL中尽量不要附加跟资源定位无关的信息。
* 在RPC风格的Web API中，URL用来描述“过程”的名字，过程需要的参数建议放在HTTP body中。
* 在RESTful Web API中，HTTP Verb的使用要尽量保持其本身的语义性，把不同Verb映射到CRUD操作上。
* 在RPC风格的Web API中，POST方法是一个不错的选择。可以把POST理解为“执行”。因此一次请求可以理解为：“执行”（POST）一个由URL所描述的存在于服务器的“远程过程”。 

---
by liushuping
