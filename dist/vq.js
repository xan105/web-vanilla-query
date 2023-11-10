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
  return new Promise((resolve) => {
    const el = this;
    const root = document.querySelector("body");
    root.style["pointer-events"] = "none";
    el.style.opacity = 1;
    let previous = +/* @__PURE__ */ new Date();
    (function fade() {
      el.style.opacity = +el.style.opacity - (/* @__PURE__ */ new Date() - previous) / duration;
      previous = +/* @__PURE__ */ new Date();
      if (+el.style.opacity <= 0) {
        el.style.display = "none";
        el.style.removeProperty("opacity");
        root.style["pointer-events"] = "";
        return resolve();
      } else if (+el.style.opacity > 0)
        requestAnimationFrame(fade);
    })();
  });
};
var $fadeIn = function(duration = 400) {
  return new Promise((resolve) => {
    const el = this;
    const root = document.querySelector("body");
    root.style["pointer-events"] = "none";
    el.style.opacity = 0;
    el.style.display = "";
    if (getComputedStyle(el).display === "none")
      el.style.display = "block";
    let previous = +/* @__PURE__ */ new Date();
    (function fade() {
      el.style.opacity = +el.style.opacity + (/* @__PURE__ */ new Date() - previous) / duration;
      previous = +/* @__PURE__ */ new Date();
      if (+el.style.opacity >= 1) {
        el.style.removeProperty("opacity");
        root.style["pointer-events"] = "";
        return resolve();
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
  $removeAllListeners: () => $removeAllListeners,
  $removeClass: () => $removeClass,
  $removeListener: () => $off,
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
var $on = function(eventName, listener) {
  this.addEventListener(eventName, listener, false);
  let events = Object.getOwnPropertySymbols(this).find((symbol) => symbol.description === "events");
  if (!events) {
    events = Symbol("events");
    Object.defineProperty(this, events, {
      value: /* @__PURE__ */ Object.create(null),
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  this[events][eventName] ??= /* @__PURE__ */ new Set();
  this[events][eventName].add(listener);
};
var $once = function(eventName, listener) {
  this.addEventListener(eventName, listener, {
    capture: false,
    once: true
  });
};
var $off = function(eventName, listener) {
  const events = Object.getOwnPropertySymbols(this).find((symbol) => symbol.description === "events");
  if (typeof listener === "function") {
    this.removeEventListener(eventName, listener, false);
    this[events]?.[eventName]?.delete(listener);
  } else if (this[events]?.[eventName]) {
    this[events][eventName].forEach((cb) => {
      this.removeEventListener(eventName, cb, false);
    });
    this[events][eventName].clear();
  }
};
var $removeAllListeners = function(eventName = []) {
  const events = Object.getOwnPropertySymbols(this).find((symbol) => symbol.description === "events");
  if (!events)
    return;
  for (const [name] of Object.entries(this[events])) {
    if (eventName.length > 0 && !eventName.includes(name))
      continue;
    this.$off(name);
  }
};
var $click = function(listener) {
  if (typeof listener === "function") {
    this.$on("click", listener);
  } else {
    this.click();
  }
};
var $trigger = function(name) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(name, false, true);
  this.dispatchEvent(event);
};
var $contextmenu = function(listener) {
  if (typeof listener === "function") {
    this.$on("contextmenu", listener);
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
  $prevUntilVisible: prevUntilVisible,
  $nextUntilVisible: nextUntilVisible,
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
function parent(query = null) {
  return define(query ? this.closest(query) : this.parentNode);
}
function prev() {
  return define(this.previousElementSibling ?? this.parentElement?.lastElementChild);
}
function next() {
  return define(this.nextElementSibling ?? this.parentElement?.firstElementChild);
}
function prevUntilVisible() {
  const self2 = this;
  let el = self2, equal = false;
  do {
    el = prev.bind(el)();
  } while (el && //exists
  (equal = self2.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
  el.$isHidden());
  return equal ? void 0 : el;
}
function nextUntilVisible() {
  const self2 = this;
  let el = self2, equal = false;
  do {
    el = next.bind(el)();
  } while (el && //exists
  (equal = self2.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
  el.$isHidden());
  return equal ? void 0 : el;
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
  console.warn("DOMReady() is deprecated and pending removal. Please use the promise whenReady() instead.");
  if (document.readyState !== "loading")
    fn();
  else
    document.addEventListener("DOMContentLoaded", fn, {
      capture: false,
      once: true
    });
}
function whenReady() {
  return new Promise((resolve) => {
    if (document.readyState !== "loading")
      resolve();
    else
      document.addEventListener("DOMContentLoaded", () => resolve(), {
        capture: false,
        once: true
      });
  });
}
export {
  define as $define,
  select as $select,
  selectAll as $selectAll,
  DOMReady,
  define,
  whenReady
};
