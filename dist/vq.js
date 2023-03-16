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
var $fadeOut = function(duration = 400) {
  const el = this;
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
var $fadeIn = function(duration = 400) {
  const el = this;
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
  $attr: () => $attr,
  $click: () => $click,
  $contextmenu: () => $contextmenu,
  $css: () => $css,
  $empty: () => $empty,
  $hasClass: () => $hasClass,
  $hide: () => $hide,
  $html: () => $html,
  $isHidden: () => $isHidden,
  $off: () => $off,
  $on: () => $on,
  $once: () => $once,
  $removeClass: () => $removeClass,
  $show: () => $show,
  $text: () => $text,
  $toggleClass: () => $toggleClass,
  $trigger: () => $trigger
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
var $isHidden = function() {
  return !this.checkVisibility({
    checkOpacity: true,
    checkVisibilityCSS: true
  });
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
var $trigger = function(name) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(name, false, true);
  this.dispatchEvent(event);
};
var $contextmenu = function(callback) {
  if (typeof callback === "function") {
    this.$on("contextmenu", callback, false);
  } else {
    this.$trigger("contextmenu");
  }
};

// lib/select.js
var self = {
  $select: function(query) {
    return select(query, this);
  },
  $selectAll: function(query) {
    return selectAll(query, this);
  },
  $parent: parent,
  $prev: prev,
  $next: next,
  $append: append,
  $prepend: prepend
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
function select(query, scope = document) {
  return define(scope.querySelector(query));
}
function selectAll(query, scope = document) {
  return [...scope.querySelectorAll(query)].map((el) => define(el));
}
function parent(el = null) {
  return define(el ? this.closest(el) : this.parentNode);
}
function prev() {
  let el = this;
  do {
    el = el.previousElementSibling ?? el.parentElement?.lastElementChild;
  } while (el && el.checkVisibility({
    checkOpacity: true,
    checkVisibilityCSS: true
  }) === false);
  return define(el);
}
function next() {
  let el = this;
  do {
    el = el.nextElementSibling ?? el.parentElement?.firstElementChild;
  } while (el && el.checkVisibility({
    checkOpacity: true,
    checkVisibilityCSS: true
  }) === false);
  return define(el);
}
function append(html) {
  this.insertAdjacentHTML("beforeend", html);
  return define(this.lastElementChild);
}
function prepend(html) {
  this.insertAdjacentHTML("afterbegin", html);
  return define(this.firstElementChild);
}

// lib/index.js
function DOMReady(fn) {
  if (document.readyState !== "loading")
    fn();
  else
    document.addEventListener("DOMContentLoaded", fn);
}
export {
  define as $define,
  select as $select,
  selectAll as $selectAll,
  DOMReady
};
