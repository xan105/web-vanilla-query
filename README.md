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
  
  el
  .$css("background","blue")
  .$fadeIn(400)
  .then(function(){ 
    this.$css("background","green") 
  }.bind(el));

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

- DOMReady(callback: function) `no chain`

- $define(HTMLElement): HTMLElement¹
- $select(query: string, scope = document): HTMLElement¹
- $selectAll(query: string, scope = document): HTMLElement¹

¹ `$select()`, `$selectAll()` and `$define()` add the following helper fn to the returned HTMLElement.

- $addClass(name: string)
- $removeClass(name: string)
- $toggleClass(name: string)
- $hasClass(name: string)
- $html(value?: string)² 
- $css(name: string, value?: string)²
- $text(value?: string)²
- $attr(name: string, value?: string)²
- $empty()
- $show()
- $hide()
- $isHidden() `no chain`
- $append(html: string)
- $prepend(html: string)
- $click(callback: function) or $click()² `no chain`
- $on(event: string, callback: function) `no chain`
- $off(event: string, callback: function) or $off(event)³ `no chain`
- $once(event: string, callback: function) `no chain`
- $trigger(name: string) `no chain`
- $contextmenu(callback: function) or $contextmenu()² `no chain`
- $select(query: string)
- $selectAll(query: string)
- $parent(el?: string)
- $prev()
- $next()
- $prevUntilVisible()
- $nextUntilVisible()
- $fadeOut(duration?: number = 400) `promise`
- $fadeIn(duration?: number = 400) `promise`

² Set _or_ get value / trigger callback when omitted

³ eventListeners created by `$on()` (_including $click(), $contextmenu()_) are stored in the "hidden" property `$__events__`. Calling `$off(event)` will remove every known handler for that event.

💡 Unless otherwise specified each return itself so you can chain the methods.