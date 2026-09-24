import { whenReady, $select, html } from "@xan105/vanilla-query";

await whenReady();

const el = $select("body>span");
el.$text("Hello world !");
el.$on("click", ()=>{ console.log("click!") });
console.dir(el);

const sanitizer = new Sanitizer("default");
sanitizer.allowElement({
  name: "a",
  attributes: ["href", "target", "rel"]
});
sanitizer.allowElement({
  name: "button"
});
sanitizer.allowAttribute("id");  
sanitizer.allowAttribute("class");
sanitizer.setDataAttributes(true);
sanitizer.setComments(false);

const template = html(sanitizer)`
  <a href="#" target="_blank" rel="noopener noreferrer">target link</a>
  <button>btn</button>
`;
document.body.appendChild(template);