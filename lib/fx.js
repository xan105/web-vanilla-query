/*
MIT License

Copyright (c) Anthony Beaumont

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const _fadeOut = {
  value: (duration = 400) => {
   let el = this;
     
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
  configurable: false,
  enumerable: false,
  writable: false
};
  
const _fadeIn = { 
  value: (duration = 400) => {
    let el = this;
      
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
  configurable: false,
  enumerable: false,
  writable: false
};

export {  
  _fadeOut,
  _fadeIn
};