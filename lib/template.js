/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { createSanitizer } from "./sanitizer.js";

function html(strings, ...values){ //template tagFunction
  const string = String.raw({ raw: strings }, ...values).trim();
  const template = document.createElement("template");
  const sanitizer = createSanitizer();
  template.setHTML(string, sanitizer);
  return template.content.cloneNode(true); //DocumentFragment
}

function css(strings, ...values){
  const string = String.raw({ raw: strings }, ...values).trim();
  const sheet = new CSSStyleSheet();
  /* replace() returns a Promise that resolves once any external references (@imports) are loaded;
     replaceSync() doesn’t allow external references at all. */
  sheet.replaceSync(string);
  return sheet;
}

function adoptStyleSheet(sheet, root = document){
  if (sheet instanceof CSSStyleSheet === false) return;
  const r = root instanceof ShadowRoot ? root : document;
  if (!r.adoptedStyleSheets.includes(sheet)) {
    r.adoptedStyleSheets = [...r.adoptedStyleSheets, sheet];
  }
}

export { html, css, adoptStyleSheet };