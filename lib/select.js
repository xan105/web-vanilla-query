/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { sanitize } from "dompurify";
import * as fx from "./fx.js";
import * as helper from "./helper.js";

const self = {
  $select: function(query){ return select(query, this) },
  $selectAll: function(query){ return selectAll(query, this) },
  $add: function(el){ return add(el, this) },
  $addFrom: function(html){ return addFrom(html, this) },
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

const properties = Object.assign({}, helper, fx, self);

for (const k in properties){
  if (Object.hasOwn(properties, k))
    properties[k] = { value: properties[k], ...param };
}

function define(el){
  if (el && el instanceof HTMLElement){
    Object.defineProperties(el, properties);
  }
  return el;
}

function create(tag){
  const el = document.createElement(tag.toString());
  return define(el);
}

function createFrom(html){
  const template = document.createElement("template");
  template.innerHTML = sanitize(html);
  const instance = template.content.cloneNode(true); //DocumentFragment
  return define(instance.firstElementChild);
}

function select(query, scope = document) {
  return define(scope.querySelector(query));
}

function selectAll(query, scope = document){
  return [...scope.querySelectorAll(query)].map((el) => define(el));
}

function add(el, parent = document.body){
  if (el instanceof HTMLElement)
    return parent.appendChild(define(el));
  else
    return parent.appendChild(create(el));
}

function addFrom(html, parent = document.body){
  return parent.appendChild(createFrom(html));
}

function parent(query = null){
  return define(query ? this.closest(query) : this.parentNode);
}

function prev(){
  return define(this.previousElementSibling ?? 
  this.parentElement?.lastElementChild); //restart from end
}

function next(){
  return define(this.nextElementSibling ?? 
  this.parentElement?.firstElementChild); //restart from start
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
  return equal ? undefined : el;
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
  return equal ? undefined : el;
}

function append(html){
  this.insertAdjacentHTML("beforeend", sanitize(html));
  return define(this.lastElementChild);
}

function prepend(html){
  this.insertAdjacentHTML("afterbegin", sanitize(html));
  return define(this.firstElementChild);
}

export {
  define,
  create,
  createFrom,
  define as $define, //backwards compatibility
  select as $select,
  selectAll as $selectAll,
  add as $add,
  addFrom as $addFrom
};