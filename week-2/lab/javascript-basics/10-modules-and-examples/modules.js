/*
====== MODULE ======
A module is just a file that contains reusable code — variables, functions, or 
classes — that can be imported or exported to other files.

There are two module systems in JavaScript:
- CommonJS (CJS): used in older versions of Node.js (<13). File extension are .js or .cjs
- ES Modules (ESM): Used in Modern JS (browser & Node >= v13). File extension are .mjs or "type": "module" in package.json
*/

// === CommonJS ===
const { add } = require("./math");
console.log(add(5, 10)); // 15

// See modules.mjs for ES Modules examples
