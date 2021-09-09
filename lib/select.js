/*
MIT License

Copyright (c) 2020-2021 Anthony Beaumont

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import * as fx from "./fx.js";
import * as helper from "./helper.js";

const self = {
  _select: {
    value: function(el){ return select(el, this) },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _selectAll: {
    value: function(el){ return selectAll(el, this) },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _parent: {
    value: parent,
    configurable: false,
    enumerable: false,
    writable: false
  }
};

const props = Object.assign({}, helper, fx, self);

function select(el, scope = document) {
  let selector = scope.querySelector(el);
  if (selector && selector instanceof HTMLElement)
    Object.defineProperties(selector, props);
  return selector;
}

function selectAll(el, scope = document){
  let selectors = [...scope.querySelectorAll(el)];
  return selectors.map((selector) => { 
    if (selector && selector instanceof HTMLElement) 
      Object.defineProperties(selector, props);
    return selector;
  });
}

function parent(el = null){
  let selector = (el) ? this.closest(el) : this.parentNode;
  if (selector && selector instanceof HTMLElement)
    Object.defineProperties(selector, props); 
  return selector;
}

export {
  select,
  selectAll
};