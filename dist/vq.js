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
      } else if (+el.style.opacity > 0) requestAnimationFrame(fade);
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
    if (getComputedStyle(el).display === "none") el.style.display = "block";
    let previous = +/* @__PURE__ */ new Date();
    (function fade() {
      el.style.opacity = +el.style.opacity + (/* @__PURE__ */ new Date() - previous) / duration;
      previous = +/* @__PURE__ */ new Date();
      if (+el.style.opacity >= 1) {
        el.style.removeProperty("opacity");
        root.style["pointer-events"] = "";
        return resolve();
      } else if (+el.style.opacity < 1) requestAnimationFrame(fade);
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
  $removeAttr: () => $removeAttr,
  $removeClass: () => $removeClass,
  $removeListener: () => $off,
  $show: () => $show,
  $style: () => $style,
  $text: () => $text,
  $toggleAttr: () => $toggleAttr,
  $toggleClass: () => $toggleClass,
  $trigger: () => $trigger
});
var $addClass = function(...names) {
  for (const name of names) this.classList.add(name);
  return this;
};
var $removeClass = function(...names) {
  for (const name of names) this.classList.remove(name);
  return this;
};
var $toggleClass = function(...names) {
  for (const name of names) this.classList.toggle(name);
  return this;
};
var $hasClass = function(name) {
  return this.classList.contains(name);
};
var $html = function(value = null) {
  if (value == null) return this.getHTML();
  this.setHTML(value, { sanitizer: "default" });
  return this;
};
var $css = function(name, value = null) {
  if (value == null) return this.style[name];
  this.style[name] = value;
  return this;
};
var $style = function(sheet) {
  for (const [name, value] of Object.entries(sheet))
    this.style[name] = value;
  return this;
};
var $text = function(value = null) {
  if (value == null) return this.textContent;
  this.textContent = value;
  return this;
};
var $attr = function(name, value = null) {
  if (value == null) return this.getAttribute(name);
  this.setAttribute(name, value);
  return this;
};
var $toggleAttr = function(...names) {
  for (const name of names) this.toggleAttribute(name);
  return this;
};
var $removeAttr = function(...names) {
  for (const name of names) this.removeAttribute(name);
  return this;
};
var $empty = function() {
  while (this.firstChild) this.removeChild(this.firstChild);
  return this;
};
var $show = function() {
  this.style.display = "";
  if (getComputedStyle(this).display === "none") this.style.display = "block";
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
    events = /* @__PURE__ */ Symbol("events");
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
  if (!events) return;
  for (const [name] of Object.entries(this[events])) {
    if (eventName.length > 0 && !eventName.includes(name)) continue;
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
var module = {
  $select: function(query) {
    return select(query, this);
  },
  $selectAll: function(query) {
    return selectAll(query, this);
  },
  $add: function(el) {
    return add(el, this);
  },
  $parent: parent,
  $prev: prev,
  $next: next,
  $prevUntilVisible: prevUntilVisible,
  $nextUntilVisible: nextUntilVisible
};
var param = {
  configurable: false,
  enumerable: false,
  writable: false
};
var properties = Object.assign({}, helper_exports, fx_exports, module);
for (const k in properties) {
  if (Object.hasOwn(properties, k))
    properties[k] = { value: properties[k], ...param };
}
function extend(el) {
  if (el && (el instanceof HTMLElement || el instanceof DocumentFragment || el instanceof ShadowRoot)) {
    Object.defineProperties(el, properties);
  }
  return el;
}
function select(query, scope = document) {
  const el = scope.querySelector(query);
  if (el?.tagName === "TEMPLATE") {
    const clone = el.content.cloneNode(true);
    return extend(clone);
  }
  return extend(el);
}
function selectAll(query, scope = document) {
  return [...scope.querySelectorAll(query)].map((el) => {
    if (el?.tagName === "TEMPLATE") {
      const clone = el.content.cloneNode(true);
      return extend(clone);
    }
    return extend(el);
  });
}
function add(el, parent2 = document.body) {
  if (el instanceof HTMLElement) {
    return parent2.appendChild(extend(el));
  } else if (el instanceof DocumentFragment) {
    parent2.appendChild(el);
    return extend(parent2);
  } else if (typeof el === "string") {
    return parent2.appendChild(extend(document.createElement(el)));
  } else {
    throw new TypeError("Expected type HTMLElement, DocumentFragment or string !");
  }
}
function parent(query = null) {
  if (query)
    return extend(this.closest(query));
  else if (this.parentNode && this.parentNode instanceof HTMLElement)
    return extend(this.parentNode);
  else
    return null;
}
function prev() {
  return extend(this.previousElementSibling ?? this.parentElement?.lastElementChild ?? null);
}
function next() {
  return extend(this.nextElementSibling ?? this.parentElement?.firstElementChild ?? null);
}
function prevUntilVisible() {
  const self = this;
  let el = self, equal = false;
  do {
    el = prev.call(el);
  } while (el && //exists
  (equal = self.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
  el.$isHidden());
  return equal ? null : el;
}
function nextUntilVisible() {
  const self = this;
  let el = self, equal = false;
  do {
    el = next.call(el);
  } while (el && //exists
  (equal = self.isEqualNode(el)) === false && //is a sibling (yet to loop through them all)
  el.$isHidden());
  return equal ? null : el;
}

// lib/template.js
function createSanitizer(config) {
  const sanitizer = new Sanitizer("default");
  for (const element of config.elements) {
    if (typeof element === "string") {
      sanitizer.allowElement(element);
    } else {
      const { name, attributes } = element;
      sanitizer.allowElement({ name, attributes });
    }
  }
  for (const attribute of config.attributes) {
    sanitizer.allowAttribute(attribute);
  }
  sanitizer.setComments?.(config.comments ?? false);
  sanitizer.setDataAttributes?.(config.dataAttributes ?? false);
  return sanitizer;
}
function html(options) {
  return function(strings, ...values) {
    const string = String.raw({ raw: strings }, ...values).trim();
    const template = document.createElement("template");
    template.setHTML(string, {
      sanitizer: options ?? "default"
    });
    const fragment = template.content.cloneNode(true);
    return fragment;
  };
}
function htmlUnsafe(options) {
  return function(strings, ...values) {
    const string = String.raw({ raw: strings }, ...values).trim();
    const template = document.createElement("template");
    template.setHTMLUnsafe(string, {
      sanitizer: options ?? "default"
    });
    const fragment = template.content.cloneNode(true);
    return fragment;
  };
}
function css(strings, ...values) {
  const string = String.raw({ raw: strings }, ...values).trim();
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(string);
  return sheet;
}
function adoptStyleSheet(sheet, shadow = document) {
  if (sheet instanceof CSSStyleSheet === false) return;
  const root = shadow instanceof ShadowRoot ? shadow : document;
  if (!root.adoptedStyleSheets.includes(sheet)) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }
}

// lib/index.js
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
async function whenDefined(components = {}) {
  const entries = Object.entries(components);
  for (const [name, element] of entries) {
    if (customElements.get(name))
      continue;
    else
      customElements.define(name, element);
  }
  await Promise.all(entries.map(([name]) => customElements.whenDefined(name)));
}
function whenLoaded(components) {
  return Promise.all([
    whenReady(),
    whenDefined(components)
  ]);
}
export {
  select as $select,
  selectAll as $selectAll,
  adoptStyleSheet,
  createSanitizer,
  css,
  extend,
  html,
  htmlUnsafe,
  whenDefined,
  whenLoaded,
  whenReady
};
