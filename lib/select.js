/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { sanitize } from "dompurify";
import * as fx from "./fx.js";
import * as helper from "./helper.js";

const module = {
  $select: function(query){ return select(query, this) },
  $selectAll: function(query){ return selectAll(query, this) },
  $add: function(el){ return add(el, this) },
  $parent: parent,
  $prev: prev,
  $next: next,
  $prevUntilVisible: prevUntilVisible,
  $nextUntilVisible: nextUntilVisible,
  $append: append,
  $prepend: prepend
};

const param = {
  configurable: false,
  enumerable: false,
  writable: false
};

const properties = Object.assign({}, helper, fx, module);

for (const k in properties){
  if (Object.hasOwn(properties, k))
    properties[k] = { value: properties[k], ...param };
}

function extend(el){
  if(el && (
    el instanceof HTMLElement ||
    el instanceof ShadowRoot //DocumentFragment
  )) {
    Object.defineProperties(el, properties);
  }
  return el;
}

function select(query, scope = document) {
  return extend(scope.querySelector(query));
}

function selectAll(query, scope = document){
  return [...scope.querySelectorAll(query)].map((el) => extend(el));
}

function add(el, parent = document.body){
  if (el instanceof HTMLElement)
    return parent.appendChild(extend(el));
  else if (typeof el === "string")
    return parent.appendChild(extend(document.createElement(el)));
  else
    throw new TypeError("Expected type HTMLElement or string !");
}

function parent(query = null){
  if(query)
    return extend(this.closest(query));
  else if (this.parentNode && this.parentNode instanceof HTMLElement)
    return extend(this.parentNode);
  else
    return null;
}

function prev(){
  return extend(this.previousElementSibling ?? 
  this.parentElement?.lastElementChild ?? null); //restart from end
}

function next(){
  return extend(this.nextElementSibling ?? 
  this.parentElement?.firstElementChild ?? null); //restart from start
}

function prevUntilVisible(){
  const self = this;
  let el = self, equal = false;
  do{ 
    el = prev.call(el); //change prev() 'this' context
  }while(
    el && //exists
    (equal = self.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
    el.$isHidden() //is hidden
  )
  return equal ? null : el;
}

function nextUntilVisible(){
  const self = this;
  let el = self, equal = false;
  do{ 
    el = next.call(el); //change next() 'this' context
  }while(
    el && //exists
    (equal = self.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
    el.$isHidden() //is hidden
  )
  return equal ? null : el;
}

function append(html){
  this.insertAdjacentHTML("beforeend", sanitize(html));
  return extend(this.lastElementChild);
}

function prepend(html){
  this.insertAdjacentHTML("afterbegin", sanitize(html));
  return extend(this.firstElementChild);
}

export {
  extend,
  select as $select,
  selectAll as $selectAll
};