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

const $on = function(eventName, listener){
  this.addEventListener(eventName, listener, false);
    
  //Keep ref
  let events = Object.getOwnPropertySymbols(this)
                .find((symbol) => symbol.description === "events");
  if (!events) {
    //Use symbol property to avoid name clashing
    events = Symbol("events");
    Object.defineProperty(this, events, {
      value: Object.create(null),
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  this[events][eventName] ??= new Set();
  this[events][eventName].add(listener); 
};

const $once = function(eventName, listener){
  this.addEventListener(eventName, listener, {
    capture: false,
    once: true
  });
}

const $off = function(eventName, listener){

  const events = Object.getOwnPropertySymbols(this)
                .find((symbol) => symbol.description === "events");

  if (typeof listener === "function") {
    this.removeEventListener(eventName, listener, false);
    this[events]?.[eventName]?.delete(listener); //Delete ref if any
  } 
  else if(this[events]?.[eventName])  { //if unspecified delete all ref if any
    this[events][eventName].forEach(cb => {
      this.removeEventListener(eventName, cb, false);
    });
    this[events][eventName].clear();
  }  
}

const $removeAllListeners = function(eventName = []){
  const events = Object.getOwnPropertySymbols(this)
                 .find((symbol) => symbol.description === "events");
  if (!events) return;
  
  for (const [ name ] of Object.entries(this[events])) {
    if(eventName.length > 0 && !eventName.includes(name)) continue;
    this.$off(name);
  }
}

const $click = function(listener){
  if (typeof listener === "function") {
    this.$on("click", listener);
  } else {
    this.click();
  }
};

const $trigger = function(name){
  const event = document.createEvent("HTMLEvents");
  event.initEvent(name, false, true);
  this.dispatchEvent(event);
}

const $contextmenu = function(listener){
  if (typeof listener === "function") {
    this.$on("contextmenu", listener);
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
  $off as $removeListener,
  $removeAllListeners,
  $click,
  $trigger,
  $contextmenu
};