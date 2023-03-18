/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import * as fx from "./fx.js";
import * as helper from "./helper.js";

const self = {
  $select: function(query){ return select(query, this) },
  $selectAll: function(query){ return selectAll(query, this) },
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

function select(query, scope = document) {
  return define(scope.querySelector(query));
}

function selectAll(query, scope = document){
  return [...scope.querySelectorAll(query)].map((el) => define(el));
}

function parent(el = null){
  return define((el) ? this.closest(el) : this.parentNode);
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
    el = prev.bind(el)(); //change prev() 'this' context
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
    el = next.bind(el)(); //change next() 'this' context
  }while(
    el && //exists
    (equal = self.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
    el.$isHidden() //is hidden
  )
  return equal ? undefined : el;
}

function append(html){
  this.insertAdjacentHTML("beforeend", html);
  return define(this.lastElementChild);
}

function prepend(html){
  this.insertAdjacentHTML("afterbegin", html);
  return define(this.firstElementChild);
}

export {
  define as $define,
  select as $select,
  selectAll as $selectAll,
};