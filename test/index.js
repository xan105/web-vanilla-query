import { whenReady, $select } from "@xan105/vanilla-query";

await whenReady();

const el = $select("body>span");
el.$text("Hello world !");
el.$on("click", ()=>{ console.log("click!") });
console.dir(el);