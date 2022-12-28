/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { param } from "./param.js";
import * as fx from "./fx.js";
import * as helper from "./helper.js";

const self = {
  $select: {
    value: function(el){ return select(el, this) },
    ...param
  },
  $selectAll: {
    value: function(el){ return selectAll(el, this) },
    ...param
  },
  $parent: {
    value: parent,
    ...param
  },
  $prev: {
    value: prev,
    ...param
  },
  $next: {
    value: next,
    ...param
  }
};

const properties = Object.assign({}, helper, fx, self);

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
  return define(this.previousElementSibling ?? this.parentElement.lastElementChild);
}

function next(){
  return define(this.nextElementSibling ?? this.parentElement.firstElementChild);
}

export {
  select as $select,
  selectAll as $selectAll,
};