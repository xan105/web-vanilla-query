/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

function DOMReady(fn) {
  if (document.readyState !== "loading")
    fn();
  else
    document.addEventListener('DOMContentLoaded', fn);
}

export * from "./select.js";
export { DOMReady };