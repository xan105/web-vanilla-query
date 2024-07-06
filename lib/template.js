/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { sanitize } from "dompurify";

function html(strings, ...values){ //template tagFunction
  const string = String.raw({ raw: strings }, ...values).trim();
  const template = document.createElement("template");
  template.innerHTML = sanitize(string);
  const instance = template.content.cloneNode(true); //DocumentFragment
  return instance.firstElementChild;
}

function css(strings, ...values){
  const string = String.raw({ raw: strings }, ...values).trim();
  const sheet = new CSSStyleSheet();
  /* replace() returns a Promise that resolves once any external references (@imports) are loaded;
     replaceSync() doesn’t allow external references at all. */
  sheet.replaceSync(string);
  return sheet;
}

export { html, css };