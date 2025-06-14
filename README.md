About
=====

DOM manipulation and traversal in Vanilla JS with chaining.<br/>
Like jQuery but with a Vanilla flavor 😋.

📦 Scoped `@xan105` packages are for my own personal use but feel free to use them.

Example
=======

```js
import { whenReady, html, $select, $selectAll } from "./path/to/vq.js"

await whenReady(); //DOM is ready

//Creating HTMLElement
function component(){
  return html`
    <ul>
      <li>foo</li>
      <li>bar</li>
    </ul>
  `
}
$select(#mydiv).add(component());

//DOM Manipulation
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
```

Install
=======

```
npm i @xan105/vanilla-query
```

💡 The bundled library and its minified version can be found in the `./dist` folder.

### Via importmap

Create an importmap and add it to your html:

```html
  <script type="importmap">
  {
    "imports": {
      "@xan105/vanilla-query": "./path/to/node_modules/@xan105/vanilla-query/dist/vq.min.js"
    }
  }
  </script>
  <script src="./index.js" type="module"></script>
  </body>
</html>
```

index.js:

```js
import { whenReady } from "@xan105/vanilla-query"
await whenReady();
console.log("Hello world !");
```

API
===

⚠️ This module is only available as an ECMAScript module (ESM) and is intended for the browser.

## Named export

- `whenReady(): Promise<void>`

  Resolves when the DOM is ready.
  
- `whenDefined(components?: { name: HTMLElement Constructor, ... }): Promise<void>`

  Resolves when all Web Components (CustomElements) are defined.
  
- `whenLoaded(components?: { name: HTMLElement Constructor, ... }): Promise<void>`
  
  A shorthand for calling `whenReady()` + `whenDefined()`.

- ``html`string`: HTMLElement``

  Create a HTML element from the given html string template.<br/>
  _NB: This is a template literal (template string) "tagFunction"._
  
- ``css`string`: CSSStyleSheet``

  Create a CSS style sheet from the given css string template.<br/>
  _NB: This is a template literal (template string) "tagFunction"._
  
- `define(el: HTMLElement | Unknown): HTMLElement | Unknown`

  Add the following helpers (see below) to the given HTMLElement.

- `$select(query: string, scope?: HTMLElement = document): HTMLElement | undefined`

  Select HTMLElement matching the given query selector; relative to the given scope (document if omitted).<br/>
  Add the following helpers (see below) to the returned HTMLElement.
  
  NB: If the targeted element is a HTML template tag then its cloned instance is returned.

- `$selectAll(query: string, scope?: HTMLElement = document): HTMLElement[] | undefined[]`

  Select every HTMLElement matching the given query selector; relative to the given scope (document if omitted).<br/>
  Add the following helpers (see below) to every returned HTMLElement.
  
  NB: If some of the targeted elements are a HTML template tag then their cloned instance are returned.

### Helpers

- `$addClass(...names: string[]): HTMLElement`

  Add given class name(s).

- `$removeClass(...names: string[]): HTMLElement`

  Remove given class name(s).

- `$toggleClass(...names: string[]): HTMLElement`

  Toggle given class name(s): remove if exist and add it otherwise.

- `$hasClass(name: string): boolean`

  Return whether the HTMLElement has the given class name or not.

- `$html(value?: string): HTMLElement | string`

  Set innerHTML to the given value if any.<br/>
  Otherwise returns the current innerHTML.
 
- `$css(name: string, value?: string): HTMLElement | string`

  Set CSS inline style name property to the given value if any.<br/>
  Otherwise returns the current value.
  
- `$style(sheet: object): HTMLElement`

  Set CSS inline style from a sheet object representation as follows:
  
  ```
  { 
    name: "value",
    ...
  }
  ```

- `$text(value?: string): HTMLElement | string`

  Set text content to the given value if any.<br/>
  Otherwise returns the current value.

- `$attr(name: string, value?: string): HTMLElement | string`

  Set attribute name to the given value if any.<br/>
  Otherwise returns the current value.
  
- `$toggleAttr(...names: string[]): HTMLElement`

  Toggle given attribute name(s): remove if exist and add it otherwise.

- `$removeAttr(...names: string[]): HTMLElement`

  Remove given attribute name(s).

- `$empty(): HTMLElement`

  Remove all children of the HTMLElement.

- `$show(): HTMLElement`

  Show the HTMLElement.

- `$hide(): HTMLElement`

  Hide the HTMLElement.

- `$isHidden(): boolean`

  Return whether the HTMLElement is visible or not.

- `$on(eventName: string, listener: function): void`

  Add an EventListener and keep track of the listener inside the Symbol property `events`.<br/>
  Calling `$off(eventName)` will remove every known listener/handler for that event.

- `$once(eventName: string, listener: function): void`

  Add an EventListener which is automatically removed when the listener is invoked.

- `$off(eventName: string, listener?: function): void`

  _alias: $removeListener_
  
  Remove specified listener/handler for the given event.<br/>
  If omitted remove every known listener/handler for the given event.
  
- `$removeAllListeners(eventName?: string[]): void`

  Remove every known listener/handler or those of the specified eventName.

- `$click(listener?: function): void`
  
  Add a click event listener or trigger it if omitted.

- `$contextmenu(listener?: function): void`

  Add a right click event _(contextmenu)_ listener or trigger it if omitted.

- `$trigger(name: string): void`

  Trigger given HTML event name.
  
- `$select(query: string): HTMLElement | null`

  See `$select()` above but the scope is the current element.

- `$selectAll(query: string): HTMLElement[] | null[]`

  See `$selectAll()` above but the scope is the current element.
  
- `$add(el: HTMLElement | string | DocumentFragment): HTMLElement`

  Add given element to the end of the list of children of the current element.<br/>
  If `el` is a `string` then an element will be created from the assumed tag name.
  
  If `el` is a `DocumentFragment` the fragment is appended to the current element and is then returned. 

- `$parent(query?: string): HTMLElement | null`

  Return the closest parent element that matches the specified query selector.<br/>
  If omitted return the parent node.

- `$prev(): HTMLElement | null`

  Return the previous element if any.

- `$next(): HTMLElement | null`

  Return the next element if any.

- `$prevUntilVisible(): HTMLElement | null`

  Return the previous visible element if any.

- `$nextUntilVisible(): HTMLElement | null`

  Return the next visible element if any.

- `$append(html: string): HTMLElement`

  Append given html to the current HTMLElement and return the newly created HTMLElement.

- `$prepend(html: string): HTMLElement`

  Prepend given html to the current HTMLElement and return the newly created HTMLElement.

- `$fadeOut(duration?: number = 400): Promise<void>`

  Fade out animation to the current HTMLElement.

- `$fadeIn(duration?: number = 400): Promise<void>`

  Fade in animation to the current HTMLElement.
