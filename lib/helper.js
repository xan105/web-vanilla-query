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

const _addClass = {
  value: function(name){
      this.classList.add(name);
      return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};
  
const _removeClass = {
  value: function(name){
    this.classList.remove(name);
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _toggleClass = {
  value: function(name){
    this.classList.toggle(name);
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _html = {
  value: function(value = null){
    if (!value) return this.innerHTML;
    this.innerHTML = value;
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
}

const _css = {
  value: function(name, value){
    this.style[name] = value;
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _text = {
  value: function(value = null){
    if(!value) return this.textContent;
    this.textContent = value;
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _attr = {
  value: function(name, value = null){
    if(!value) return this.getAttribute(name);
    this.setAttribute(name, value);
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _empty = {
  value: function(){
    while(this.firstChild) this.removeChild(this.firstChild);
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _show = {
  value: function(){
    this.style.display = ""; //restore to whatever it was initially
    if(getComputedStyle(this).display === "none") this.style.display = "block";
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _hide = {
  value: function(){
    this.style.display = "none";
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _append = {
  value: function(html){
    this.insertAdjacentHTML("beforeend", html);
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _prepend = {
  value: function(html){
    this.insertAdjacentHTML("afterbegin", html);
    return this;
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _click = {
  value: function(callback){
    if (typeof callback === "function") {
      this.addEventListener('click', callback, false);
    } else {
      this.click();
    }
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _contextmenu = {
  value: function(callback){
    this.addEventListener('contextmenu', callback, false);
  },
  configurable: false,
  enumerable: false,
  writable: false
};

const _parent = {
  value: function(el = null){
    let selector = (el) ? this.closest(el) : this.parentNode;
    if (selector) selector = Object.assign(selector, helper); //If not find don't attach helper
    return selector;
  },
  configurable: false,
  enumerable: false,
  writable: false
};    

export {
  _addClass,
  _removeClass,
  _toggleClass,
  _html,
  _css,
  _text,
  _attr,
  _empty,
  _show,
  _hide,
  _append,
  _prepend,
  _click,
  _contextmenu,
  _parent
};