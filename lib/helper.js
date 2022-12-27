/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { param } from "./param.js";

const $addClass = {
  value: function(name){
    this.classList.add(name);
    return this;
  },
  ...param
};
  
const $removeClass = {
  value: function(name){
    this.classList.remove(name);
    return this;
  },
  ...param
};

const $toggleClass = {
  value: function(name){
    this.classList.toggle(name);
    return this;
  },
  ...param
};

const $hasClass = {
  value: function(name){
    return this.classList.contains(name);
  },
  ...param
};

const $html = {
  value: function(value = null){
    if (value == null) return this.innerHTML;
    this.innerHTML = value;
    return this;
  },
  ...param
}

const $css = {
  value: function(name, value = null){
    if(value == null) return this.style[name];
    this.style[name] = value;
    return this;
  },
  ...param
};

const $text = {
  value: function(value = null){
    if(value == null) return this.textContent;
    this.textContent = value;
    return this;
  },
  ...param
};

const $attr = {
  value: function(name, value = null){
    if(value == null) return this.getAttribute(name);
    this.setAttribute(name, value);
    return this;
  },
  ...param
};

const $empty = {
  value: function(){
    while(this.firstChild) this.removeChild(this.firstChild);
    return this;
  },
  ...param
};

const $show = {
  value: function(){
    this.style.display = ""; //restore to whatever it was initially
    if(getComputedStyle(this).display === "none") this.style.display = "block";
    return this;
  },
  ...param
};

const $hide = {
  value: function(){
    this.style.display = "none";
    return this;
  },
  ...param
};

const $append = {
  value: function(html){
    this.insertAdjacentHTML("beforeend", html);
    return this;
  },
  ...param
};

const $prepend = {
  value: function(html){
    this.insertAdjacentHTML("afterbegin", html);
    return this;
  },
  ...param
};

const $on = {
  value: function(event, callback){
    this.addEventListener(event, callback, false);
    
    //Keep ref
    if (!this.$__events__) this.$__events__ = Object.create(null);
    if (!this.$__events__[event]) this.$__events__[event] = new Set();
    this.$__events__[event].add(callback); 
  },
  ...param
};

const $once = {
  value: function(event, callback){
    this.addEventListener(event, callback, {
      capture: false,
      once: true
    });
  },
  ...param
}

const $off = {
  value: function(event, callback){
    if (typeof callback === "function") {
      this.removeEventListener(event, callback, false);
      //Delete ref if any
      this.$__events__?.[event]?.delete(callback);
    } 
    else if(this.$__events__?.[event])  { //if unspecified delete all ref if any
      this.$__events__[event].forEach(cb => {
        this.removeEventListener(event, cb, false);
      });
      this.$__events__[event].clear();
    }  
  },
  ...param
}

const $click = {
  value: function(callback){
    if (typeof callback === "function") {
      this.$on("click", callback, false);
    } else {
      this.click();
    }
  },
  ...param
};

const $contextmenu = {
  value: function(callback){
    if (typeof callback === "function") {
      this.$on("contextmenu", callback, false);
    } else {
      this.dispatchEvent("contextmenu");
    }
  },
  ...param
};   

export {
  $addClass,
  $removeClass,
  $toggleClass,
  $hasClass,
  $html,
  $css,
  $text,
  $attr,
  $empty,
  $show,
  $hide,
  $append,
  $prepend,
  $on,
  $once,
  $off,
  $click,
  $contextmenu
};