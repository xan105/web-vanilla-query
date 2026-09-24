/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

export function createSanitizer(config) {
  const sanitizer = new Sanitizer("default");
  
  for (const element of config.elements){
    if (typeof element === "string") {
      sanitizer.allowElement(element);
    } else {
      const { name, attributes } = element;
      sanitizer.allowElement({ name, attributes });
    }
  }
  
  for (const attribute of config.attributes){
    sanitizer.allowAttribute(attribute);
  }

  // ?. because not yet supported by safari
  sanitizer.setComments?.(config.comments ?? false);
  sanitizer.setDataAttributes?.(config.dataAttributes ?? false);

  return sanitizer;
}

export function html(options) {
  return function (strings, ...values) {
    const string = String.raw({ raw: strings }, ...values).trim();
    const template = document.createElement("template");
    template.setHTML(string, {
      sanitizer: options ?? "default"
    });
    const fragment = template.content.cloneNode(true);
    return fragment;
  };
}

export function htmlUnsafe(options) {
  return function (strings, ...values) {
    const string = String.raw({ raw: strings }, ...values).trim();
    const template = document.createElement("template");
    template.setHTMLUnsafe(string, {
      sanitizer: options ?? "default"
    });
    const fragment = template.content.cloneNode(true);
    return fragment;
  };
}

export function css(strings, ...values){
  const string = String.raw({ raw: strings }, ...values).trim();
  const sheet = new CSSStyleSheet();
  /* replace() returns a Promise that resolves once any external references (@imports) are loaded;
     replaceSync() doesn’t allow external references at all. */
  sheet.replaceSync(string);
  return sheet;
}

export function adoptStyleSheet(sheet, shadow = document){
  if (sheet instanceof CSSStyleSheet === false) return;
  const root = shadow instanceof ShadowRoot ? shadow : document;
  if (!root.adoptedStyleSheets.includes(sheet)) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }
}