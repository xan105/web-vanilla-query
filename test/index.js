import { whenReady, $select } from "@xan105/vanilla-query";

await whenReady();

const el = $select("body>span");
el.$text("Hello world !");
console.dir(el);