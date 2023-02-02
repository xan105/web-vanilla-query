About
=====

DOM manipulation and traversal in Vanilla JS with chaining.<br/>
Like jQuery but with a Vanilla flavor 😋.

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

⚠️ This module is only available as an ECMAScript module (ESM) and is intended for the browser.

## Named export

- DOMReady(callback)
- $select(el, scope = document)¹
- $selectAll(el, scope = document)¹

¹ `$select()` and `$selectAll()` add the following helper fn to the returned HTMLElement:

- $addClass(name)
- $removeClass(name)
- $toggleClass(name)
- $hasClass(name)
- $html(value = null)² 
- $css(name, value = null)²
- $text(value = null)²
- $attr(name, value = null)²
- $empty()
- $show()
- $hide()
- $append(html)
- $prepend(html)
- $click(callback) or $click()² `no chain`
- $on(event, callback) `no chain`
- $off(event, callback) or $off(event)³ `no chain`
- $once(event, callback) `no chain`
- $trigger(name) `no chain`
- $contextmenu(callback) or $contextmenu()² `no chain`
- $select(el)
- $selectAll(el)
- $parent(el = null)
- $prev()
- $next()
- $fadeOut(duration = 400) `promise`
- $fadeIn(duration = 400) `promise`

² Set _or_ get value / trigger callback when omitted

³ eventListeners created by `$on()` (_including $click(), $contextmenu()_) are stored in the "hidden" property `$__events__`. Calling `$off(event)` will remove every known handler for that event.

💡 Unless otherwise specified each return itself so you can chain the methods.