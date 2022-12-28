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
  $next: next
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
  return define(this.previousElementSibling ?? this.parentElement?.lastElementChild);
}

function next(){
  return define(this.nextElementSibling ?? this.parentElement?.firstElementChild);
}

export {
  select as $select,
  selectAll as $selectAll,
};