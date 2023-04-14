/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

function DOMReady(fn){
  console.warn("DOMReady() is deprecated and pending removal. Please use the promise whenReady() instead.");
  if (document.readyState !== "loading") 
    fn();
  else
    document.addEventListener("DOMContentLoaded", fn, {
      capture: false, 
      once: true
    });
}

function whenReady(){
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

export * from "./select.js";
export { 
  DOMReady, //pending removal
  whenReady
};