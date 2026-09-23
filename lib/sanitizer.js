/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

export function createSanitizer(){
  // Default configuration.
  const sanitizer = new Sanitizer("default"); 
  
  // However the default configuration is overly restrictive
  sanitizer.allowAttribute("id");  
  sanitizer.allowAttribute("class");
  sanitizer.allowElement({
    name: "a",
    attributes: ["href", "target"]
  });
  sanitizer.setDataAttributes(true);
  sanitizer.setComments(false);

  return sanitizer;
}


  
  
