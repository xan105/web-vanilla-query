/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

export function whenReady(){
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

export async function whenDefined(components = {}){
  
  const entries = Object.entries(components);
  
  for (const [ name, element ] of entries)
  {
    if(customElements.get(name))
      continue;
    else
      customElements.define(name, element);
  }

  await Promise.all(entries.map(([name]) => customElements.whenDefined(name))); 
}

export function whenLoaded(components){
  return Promise.all([
    whenReady(),
    whenDefined(components)
  ]); 
}

export * from "./select.js";
export * from "./template.js";