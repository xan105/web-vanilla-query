About
=====

DOM manipulation and traversal in Vanilla JS with chaining.<br/>
Like jQuery but with a Vanilla flavor 😋.

📦 Scoped `@xan105` packages are for my own personal use but feel free to use them.

Example
=======

```js
import { whenReady, $select, $selectAll } from "./path/to/vq.js"

await whenReady(); //DOM is ready
  
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
  
- `define(el: HTMLElement | Unknown): HTMLElement | Unknown`

  Add the following helpers (see below) to the given HTMLElement.

- `create(tag: string): HTMLElement`

  Create an HTML element specified by the given tag name.<br/>
  Add the following helpers (see below) to the returned HTMLElement.
  
- `createFrom(html: string): HTMLElement`

  Create an HTML element from the given html string template.<br/>
  Add the following helpers (see below) to the returned HTMLElement.

- `$select(query: string, scope?: HTMLElement = document): HTMLElement | undefined`

  Select HTMLElement matching the given query selector; relative to the given scope (document if omitted).<br/>
  Add the following helpers (see below) to the returned HTMLElement.

- `$selectAll(query: string, scope?: HTMLElement = document): HTMLElement[] | undefined[]`

  Select every HTMLElement matching the given query selector; relative to the given scope (document if omitted).<br/>
  Add the following helpers (see below) to every returned HTMLElement.
  
- `add(el: HTMLElement | string, parent?: HTMLElement = document.body): HTMLElement`

  Add given node to the end of the list of children of the specified parent node.<br/>
  If `el` is a `string` then a node will be created from the assumed tag name.<br/>
  Add the following helpers (see below) to every returned HTMLElement.
  
- `addFrom(html: string, parent?: HTMLElement = document.body): HTMLElement`
  
  Create a node from the given html string template and add it to the end of the list of children of the specified parent node.<br/>
  Add the following helpers (see below) to every returned HTMLElement.

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

  Set CSS inline style from a sheet object as 
  
  ```
  { 
    name: value,
    ...
  }
  ```

- `$text(value?: string): HTMLElement | string`

  Set text content to the given value if any.<br/>
  Otherwise returns the current value.

- `$attr(name: string, value?: string): HTMLElement | string`

  Set attribute name to the given value if any.<br/>
  Otherwise returns the current value.

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
  
- `$select(query: string): HTMLElement | undefined`

  See `$select()` above but the scope is the current HTMLElement.

- `$selectAll(query: string): HTMLElement[] | undefined[]`

  See `$selectAll()` above but the scope is the current HTMLElement.

- `$parent(query?: string): HTMLElement | undefined`

  Return the closest parent element that matches the specified query selector.<br/>
  If omitted return the parent node.

- `$prev(): HTMLElement | undefined`

  Return the previous element if any.

- `$next(): HTMLElement | undefined`

  Return the next element if any.

- `$prevUntilVisible(): HTMLElement | undefined`

  Return the previous visible element if any.

- `$nextUntilVisible(): HTMLElement | undefined`

  Return the next visible element if any.

- `$append(html: string): HTMLElement`

  Append given html to the current HTMLElement and return the newly created HTMLElement.

- `$prepend(html: string): HTMLElement`

  Prepend given html to the current HTMLElement and return the newly created HTMLElement.

- `$fadeOut(duration?: number = 400): Promise<void>`

  Fade out animation to the current HTMLElement.

- `$fadeIn(duration?: number = 400): Promise<void>`

  Fade in animation to the current HTMLElement.