/*
MIT License

Copyright (c) Anthony Beaumont

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

const helper = {
  _addClass: {
    value: function(name){
        this.classList.add(name);
        return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _removeClass: {
    value: function(name){
      this.classList.remove(name);
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _toggleClass: {
    value: function(name){
      this.classList.toggle(name);
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _html: {
    value: function(value = null){
      if (!value) return this.innerHTML;
      this.innerHTML = value;
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _css: {
    value: function(name, value){
      this.style[name] = value;
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _text: {
    value: function(value = null){
      if(!value) return this.textContent;
      this.textContent = value;
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _attr: {
    value: function(name, value = null){
      if(!value) return this.getAttribute(name);
      this.setAttribute(name, value);
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _empty: {
    value: function(){
      while(this.firstChild) this.removeChild(this.firstChild);
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _show: {
    value: function(){
      this.style.display = ""; //restore to whatever it was initially
      if(getComputedStyle(this).display === "none") this.style.display = "block";
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _hide: {
    value: function(){
      this.style.display = "none";
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _append: {
    value: function(html){
      this.insertAdjacentHTML("beforeend", html);
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _prepend: {
    value: function(html){
      this.insertAdjacentHTML("afterbegin", html);
      return this;
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _click: {
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
  },
  _contextmenu: {
    value: function(callback){
      this.addEventListener('contextmenu', callback, false);
    },
    configurable: false,
    enumerable: false,
    writable: false
  }    
};

const fx = {
  _fadeOut: {
    value: (duration = 400) => {
     let el = this;
       
     return new Promise((resolve) =>{
       
       el.style["pointer-events"] = "none"; //disable event while animation
       el.style.opacity = 1;
       let previous = +new Date();
       (function fade() {
         el.style.opacity = +el.style.opacity - (new Date() - previous) / duration;
         previous = +new Date();
         if (+el.style.opacity <= 0) //anim end
         {
            el.style.display = "none";
            el.style.removeProperty("opacity");
            el.style["pointer-events"] = "";
            return resolve(el);
         }
         else if (+el.style.opacity > 0) requestAnimationFrame(fade)
       })();
          
      });
    },
    configurable: false,
    enumerable: false,
    writable: false
  },
  _fadeIn: { 
    value: (duration = 400) => {
      let el = this;
        
      return new Promise((resolve) =>{
        
        el.style["pointer-events"] = "none"; //disable event while animation
        el.style.opacity = 0;
        el.style.display = "";
        if(getComputedStyle(el).display === "none") el.style.display = "block";
        let previous = +new Date();
        (function fade() {
          el.style.opacity = +el.style.opacity + (new Date() - previous) / duration;
          previous = +new Date();
          if (+el.style.opacity >= 1) //anim end
          {
            el.style.removeProperty("opacity");
            el.style["pointer-events"] = "";
            return resolve(el);
          }
          else if (+el.style.opacity < 1) requestAnimationFrame(fade)
        })();
      
      });
    },
    configurable: false,
    enumerable: false,
    writable: false
  }
};

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

function DOMReady(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export {
  DOMReady,
  select,
  selectAll,
  select as _select,
  selectAll as _selectAll
};