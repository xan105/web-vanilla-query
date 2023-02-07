/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

const $addClass = function(name){
  this.classList.add(name);
  return this;
};
  
const $removeClass = function(name){
  this.classList.remove(name);
  return this;
};

const $toggleClass = function(name){
  this.classList.toggle(name);
  return this;
};

const $hasClass = function(name){
  return this.classList.contains(name);
};

const $html = function(value = null){
  if (value == null) return this.innerHTML;
  this.innerHTML = value;
  return this;
}

const $css = function(name, value = null){
  if(value == null) return this.style[name];
  this.style[name] = value;
  return this;
};

const $text = function(value = null){
  if(value == null) return this.textContent;
  this.textContent = value;
  return this;
};

const $attr = function(name, value = null){
  if(value == null) return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};

const $empty = function(){
  while(this.firstChild) this.removeChild(this.firstChild);
  return this;
};

const $show = function(){
  this.style.display = ""; //restore to whatever it was initially
  if(getComputedStyle(this).display === "none") this.style.display = "block";
  return this;
};

const $hide = function(){
  this.style.display = "none";
  return this;
};

const $isHidden = function(){
  return !this.checkVisibility({
    checkOpacity: true,      
    checkVisibilityCSS: true 
  });
}

const $on = function(event, callback){
  this.addEventListener(event, callback, false);
    
  //Keep ref
  if (!this.$__events__) {
    Object.defineProperty(this, "$__events__", {
      value: Object.create(null),
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  if (!this.$__events__[event]) this.$__events__[event] = new Set();
  this.$__events__[event].add(callback); 
};

const $once = function(event, callback){
  this.addEventListener(event, callback, {
    capture: false,
    once: true
  });
}

const $off = function(event, callback){
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
}

const $click = function(callback){
  if (typeof callback === "function") {
    this.$on("click", callback, false);
  } else {
    this.click();
  }
};

const $trigger = function(name){
  const event = document.createEvent("HTMLEvents");
  event.initEvent(name, false, true);
  this.dispatchEvent(event);
}

const $contextmenu = function(callback){
  if (typeof callback === "function") {
    this.$on("contextmenu", callback, false);
  } else {
    this.$trigger("contextmenu");
  }
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
  $isHidden,
  $on,
  $once,
  $off,
  $click,
  $trigger,
  $contextmenu
};