/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import * as fx from "./fx.js";
import * as helper from "./helper.js";

const self = {
  $select: function(el){ return select(el, this) },
  $selectAll: function(el){ return selectAll(el, this) },
  $parent: parent,
  $prev: prev,
  $next: next,
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

function select(el, scope = document) {
  return define(scope.querySelector(el));
}

function selectAll(el, scope = document){
  return [...scope.querySelectorAll(el)].map((e) => define(e));
}

function parent(el = null){
  return define((el) ? this.closest(el) : this.parentNode);
}

function prev(){
  let el = this;
  do{
    el = el.previousElementSibling ?? 
         el.parentElement?.lastElementChild; //restart from end
  }while(el && el.checkVisibility({ //skip hidden
    checkOpacity: true,      
    checkVisibilityCSS: true 
  }) === false)
  return define(el);
}

function next(){
  let el = this;
  do{
    el = el.nextElementSibling ?? 
         el.parentElement?.firstElementChild; //restart from top
  }while(el && el.checkVisibility({ //skip hidden
    checkOpacity: true,      
    checkVisibilityCSS: true 
  }) === false)
  return define(el);
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
  select as $select,
  selectAll as $selectAll,
};