var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// lib/fx.js
var fx_exports = {};
__export(fx_exports, {
  $fadeIn: () => $fadeIn,
  $fadeOut: () => $fadeOut
});
var $fadeOut = (duration = 400) => {
  const el = void 0;
  return new Promise((resolve) => {
    el.style["pointer-events"] = "none";
    el.style.opacity = 1;
    let previous = +new Date();
    (function fade() {
      el.style.opacity = +el.style.opacity - (new Date() - previous) / duration;
      previous = +new Date();
      if (+el.style.opacity <= 0) {
        el.style.display = "none";
        el.style.removeProperty("opacity");
        el.style["pointer-events"] = "";
        return resolve(el);
      } else if (+el.style.opacity > 0)
        requestAnimationFrame(fade);
    })();
  });
};
var $fadeIn = (duration = 400) => {
  const el = void 0;
  return new Promise((resolve) => {
    el.style["pointer-events"] = "none";
    el.style.opacity = 0;
    el.style.display = "";
    if (getComputedStyle(el).display === "none")
      el.style.display = "block";
    let previous = +new Date();
    (function fade() {
      el.style.opacity = +el.style.opacity + (new Date() - previous) / duration;
      previous = +new Date();
      if (+el.style.opacity >= 1) {
        el.style.removeProperty("opacity");
        el.style["pointer-events"] = "";
        return resolve(el);
      } else if (+el.style.opacity < 1)
        requestAnimationFrame(fade);
    })();
  });
};

// lib/helper.js
var helper_exports = {};
__export(helper_exports, {
  $addClass: () => $addClass,
  $append: () => $append,
  $attr: () => $attr,
  $click: () => $click,
  $contextmenu: () => $contextmenu,
  $css: () => $css,
  $empty: () => $empty,
  $hasClass: () => $hasClass,
  $hide: () => $hide,
  $html: () => $html,
  $off: () => $off,
  $on: () => $on,
  $once: () => $once,
  $prepend: () => $prepend,
  $removeClass: () => $removeClass,
  $show: () => $show,
  $text: () => $text,
  $toggleClass: () => $toggleClass
});
var $addClass = function(name) {
  this.classList.add(name);
  return this;
};
var $removeClass = function(name) {
  this.classList.remove(name);
  return this;
};
var $toggleClass = function(name) {
  this.classList.toggle(name);
  return this;
};
var $hasClass = function(name) {
  return this.classList.contains(name);
};
var $html = function(value = null) {
  if (value == null)
    return this.innerHTML;
  this.innerHTML = value;
  return this;
};
var $css = function(name, value = null) {
  if (value == null)
    return this.style[name];
  this.style[name] = value;
  return this;
};
var $text = function(value = null) {
  if (value == null)
    return this.textContent;
  this.textContent = value;
  return this;
};
var $attr = function(name, value = null) {
  if (value == null)
    return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};
var $empty = function() {
  while (this.firstChild)
    this.removeChild(this.firstChild);
  return this;
};
var $show = function() {
  this.style.display = "";
  if (getComputedStyle(this).display === "none")
    this.style.display = "block";
  return this;
};
var $hide = function() {
  this.style.display = "none";
  return this;
};
var $append = function(html) {
  this.insertAdjacentHTML("beforeend", html);
  return this;
};
var $prepend = function(html) {
  this.insertAdjacentHTML("afterbegin", html);
  return this;
};
var $on = function(event, callback) {
  this.addEventListener(event, callback, false);
  if (!this.$__events__) {
    Object.defineProperty(this, "$__events__", {
      value: /* @__PURE__ */ Object.create(null),
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  if (!this.$__events__[event])
    this.$__events__[event] = /* @__PURE__ */ new Set();
  this.$__events__[event].add(callback);
};
var $once = function(event, callback) {
  this.addEventListener(event, callback, {
    capture: false,
    once: true
  });
};
var $off = function(event, callback) {
  if (typeof callback === "function") {
    this.removeEventListener(event, callback, false);
    this.$__events__?.[event]?.delete(callback);
  } else if (this.$__events__?.[event]) {
    this.$__events__[event].forEach((cb) => {
      this.removeEventListener(event, cb, false);
    });
    this.$__events__[event].clear();
  }
};
var $click = function(callback) {
  if (typeof callback === "function") {
    this.$on("click", callback, false);
  } else {
    this.click();
  }
};
var $contextmenu = function(callback) {
  if (typeof callback === "function") {
    this.$on("contextmenu", callback, false);
  } else {
    this.dispatchEvent("contextmenu");
  }
};

// lib/select.js
var self = {
  $select: function(el) {
    return select(el, this);
  },
  $selectAll: function(el) {
    return selectAll(el, this);
  },
  $parent: parent,
  $prev: prev,
  $next: next
};
var param = {
  configurable: false,
  enumerable: false,
  writable: false
};
var properties = Object.assign({}, helper_exports, fx_exports, self);
for (const k in properties) {
  if (Object.hasOwn(properties, k))
    properties[k] = { value: properties[k], ...param };
}
function define(el) {
  if (el && el instanceof HTMLElement) {
    Object.defineProperties(el, properties);
  }
  return el;
}
function select(el, scope = document) {
  return define(scope.querySelector(el));
}
function selectAll(el, scope = document) {
  return [...scope.querySelectorAll(el)].map((e) => define(e));
}
function parent(el = null) {
  return define(el ? this.closest(el) : this.parentNode);
}
function prev() {
  return define(this.previousElementSibling ?? this.parentElement?.lastElementChild);
}
function next() {
  return define(this.nextElementSibling ?? this.parentElement?.firstElementChild);
}

// lib/index.js
function DOMReady(fn) {
  if (document.readyState !== "loading")
    fn();
  else
    document.addEventListener("DOMContentLoaded", fn);
}
export {
  select as $select,
  selectAll as $selectAll,
  DOMReady
};
