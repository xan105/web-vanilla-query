var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// lib/param.js
var param = {
  configurable: false,
  enumerable: false,
  writable: false
};

// lib/fx.js
var fx_exports = {};
__export(fx_exports, {
  $fadeIn: () => $fadeIn,
  $fadeOut: () => $fadeOut
});
var $fadeOut = {
  value: (duration = 400) => {
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
  },
  ...param
};
var $fadeIn = {
  value: (duration = 400) => {
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
  },
  ...param
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
  $on: () => $on,
  $prepend: () => $prepend,
  $removeClass: () => $removeClass,
  $show: () => $show,
  $text: () => $text,
  $toggleClass: () => $toggleClass
});
var $addClass = {
  value: function(name) {
    this.classList.add(name);
    return this;
  },
  ...param
};
var $removeClass = {
  value: function(name) {
    this.classList.remove(name);
    return this;
  },
  ...param
};
var $toggleClass = {
  value: function(name) {
    this.classList.toggle(name);
    return this;
  },
  ...param
};
var $hasClass = {
  value: function(name) {
    return this.classList.contains(name);
  },
  ...param
};
var $html = {
  value: function(value = null) {
    if (!value)
      return this.innerHTML;
    this.innerHTML = value;
    return this;
  },
  ...param
};
var $css = {
  value: function(name, value) {
    this.style[name] = value;
    return this;
  },
  ...param
};
var $text = {
  value: function(value = null) {
    if (!value)
      return this.textContent;
    this.textContent = value;
    return this;
  },
  ...param
};
var $attr = {
  value: function(name, value = null) {
    if (value === null)
      return this.getAttribute(name);
    this.setAttribute(name, value);
    return this;
  },
  ...param
};
var $empty = {
  value: function() {
    while (this.firstChild)
      this.removeChild(this.firstChild);
    return this;
  },
  ...param
};
var $show = {
  value: function() {
    this.style.display = "";
    if (getComputedStyle(this).display === "none")
      this.style.display = "block";
    return this;
  },
  ...param
};
var $hide = {
  value: function() {
    this.style.display = "none";
    return this;
  },
  ...param
};
var $append = {
  value: function(html) {
    this.insertAdjacentHTML("beforeend", html);
    return this;
  },
  ...param
};
var $prepend = {
  value: function(html) {
    this.insertAdjacentHTML("afterbegin", html);
    return this;
  },
  ...param
};
var $click = {
  value: function(callback) {
    if (typeof callback === "function") {
      this.addEventListener("click", callback, false);
    } else {
      this.click();
    }
  },
  ...param
};
var $on = {
  value: function(event, callback) {
    this.addEventListener(event, callback, false);
  },
  ...param
};
var $contextmenu = {
  value: function(callback) {
    this.addEventListener("contextmenu", callback, false);
  },
  ...param
};

// lib/select.js
var self = {
  $select: {
    value: function(el) {
      return select(el, this);
    },
    ...param
  },
  $selectAll: {
    value: function(el) {
      return selectAll(el, this);
    },
    ...param
  },
  $parent: {
    value: parent,
    ...param
  },
  $prev: {
    value: prev,
    ...param
  },
  $next: {
    value: next,
    ...param
  }
};
var properties = Object.assign({}, helper_exports, fx_exports, self);
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
  return define(this.previousElementSibling);
}
function next() {
  return define(this.nextElementSibling);
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
