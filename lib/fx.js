/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

const $fadeOut = function(duration = 400){
  return new Promise((resolve) => {
    const el = this;
    const root = document.querySelector("body");
    root.style["pointer-events"] = "none"; //disable any mouse event while animation
    el.style.opacity = 1;
    let previous = +new Date();
    (function fade() {
      el.style.opacity = +el.style.opacity - (new Date() - previous) / duration;
      previous = +new Date();
      if (+el.style.opacity <= 0) //anim end
      {
        el.style.display = "none";
        el.style.removeProperty("opacity");
        root.style["pointer-events"] = "";
        return resolve();
      }
      else if (+el.style.opacity > 0) requestAnimationFrame(fade)
    })(); 
  });
};
  
const $fadeIn = function(duration = 400){
  return new Promise((resolve) => {
    const el = this;
    const root = document.querySelector("body");
    root.style["pointer-events"] = "none"; //disable any mouse event while animation
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
        root.style["pointer-events"] = "";
        return resolve();
      }
      else if (+el.style.opacity < 1) requestAnimationFrame(fade)
    })();
  });
};

export {  
  $fadeOut,
  $fadeIn
};