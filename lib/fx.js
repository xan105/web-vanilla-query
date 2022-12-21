/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { param } from "./param.js";

const $fadeOut = {
  value: (duration = 400) => {
   const el = this;
     
   return new Promise((resolve) =>{
     
     el.style["pointer-events"] = "none"; //disable event while animation
     el.style.opacity = 1;
     let previous = +new Date();
     (function fade() {
       el.style.opacity = +el.style.opacity - (new Date() - previous) / duration;
       previous = +new Date();
       if (+el.style.opacity <= 0) //anim end
       {
          el.style.display = "none";
          el.style.removeProperty("opacity");
          el.style["pointer-events"] = "";
          return resolve(el);
       }
       else if (+el.style.opacity > 0) requestAnimationFrame(fade)
     })();
        
    });
  },
  ...param
};
  
const $fadeIn = { 
  value: (duration = 400) => {
    const el = this;
      
    return new Promise((resolve) =>{
      
      el.style["pointer-events"] = "none"; //disable event while animation
      el.style.opacity = 0;
      el.style.display = "";
      if(getComputedStyle(el).display === "none") el.style.display = "block";
      let previous = +new Date();
      (function fade() {
        el.style.opacity = +el.style.opacity + (new Date() - previous) / duration;
        previous = +new Date();
        if (+el.style.opacity >= 1) //anim end
        {
          el.style.removeProperty("opacity");
          el.style["pointer-events"] = "";
          return resolve(el);
        }
        else if (+el.style.opacity < 1) requestAnimationFrame(fade)
      })();
    
    });
  },
  ...param
};

export {  
  $fadeOut,
  $fadeIn
};