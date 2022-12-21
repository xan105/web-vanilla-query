About
=====

Like jQuery but with a Vanilla flavor.<br/>
Simple DOM manipulation and traversal in "Vanilla JS" with chaining.<br/>

📦 Scoped `@xan105` packages are for my own personal use but feel free to use them.

Example
=======

```js
import { DOMReady, $select, $selectAll } from "./path/to/vq.js"

DOMReady(()=>{
  
  $select("#div .child[data-attr='val']").$css("background","red").$text("Hello World");
  
  const el = $select("#div");
  el.$hide();
  el.$css("background","blue").$fadeIn(400).then((it) => it.$css("background","green"));
 
  $selectAll(li)[0].$text("0");
  $selectAll(li).forEach(el => el.$css("color","black"));
  
  $select("#div .child").$css("background","red").$select(".child").$selectAll("p");
  
  //...
});
```

Install
=======

```
npm i @xan105/vanilla-query
```

### Optional 

Create an importmap:

```json
{
  "imports": {
    "@xan105/vanilla-query": "./path/to/node_modules/@xan105/vanilla-query/dist/vq.min.js"
  }
}
```

index.html:

```html
  <script src="./importmap.json" type="importmap"></script>
  <script src="./index.js" type="module"></script>
  </body>
</html>
```

index.js:

```js
import { DOMReady } from "@xan105/vanilla-query"
DOMReady(()=>{ 
  console.log("Hello world !");
});
```

API
===

⚠️ This is intended for the browser.

## Named export

- DOMReady(callback)
- $select(el, scope = document)¹
- $selectAll(el, scope = document)¹

¹ `$select()` and `$selectAll()` add the following helper fn to the returned HTMLElement:

- $addClass(name)
- $removeClass(name)
- $toggleClass(name)
- $hasClass(name)
- $html(value)
- $css(name, value)
- $text(value)
- $attr(name, value)
- $empty()
- $show()
- $hide()
- $append(html)
- $prepend(html)
- $click(callback) `no chain`
- $on(event, callback) `no chain`
- $contextmenu(callback) `no chain`
- $select(el)
- $selectAll(el)
- $parent(el = null)
- $prev()
- $next()
- $fadeOut(duration = 400) `promise`
- $fadeIn(duration = 400) `promise`

💡 Unless otherwise specified each return itself so you can chain the methods.