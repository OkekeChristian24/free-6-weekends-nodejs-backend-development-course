/*
====== SCOPES ======
The 4 Main Types of Scope in JavaScript
1. Global Scope: Accessible anywhere in the code e.g. Outside all functions/blocks.
2. Function Scope: Accessible only inside a specific function e.g. Created with var or inside a function.
3. Block Scope: Accessible only inside { ... } blocks e.g. Created with let or const.
4. Lexical Scope (Closures): Inner functions have access to variables of their parent functions e.g. Defines how scopes are nested.

*/

// === Global Scope ===
let language = "Javascript";
global.language = "Typescript";

function greet() {
    console.log("Hello from ", language); // Hello from Javascript
}

greet();
console.log(language); // Javascript
console.log(global.language); // Typescript

// === Function Scope ===
function sayHi() {
    let userName = "Alice";
    console.log("Hi " + userName);
}

sayHi();
// console.log(userName); // ReferenceError: userName is not defined

// === Block Scope ===
// Only variables declared with let or const respects this directive
function count() {
    const number = 3;
    if (number > -1) {
        // Use var, let, const to define type variable and see the difference.
        let type = "Positive";
        // var type = "Positive";
        console.log(type); // Positive
    }

    // If type is declared with var, no error
    // console.log(type); // If type is declared with let or const, you get -> ReferenceError: type is not defined
}

count();

// === Lexical Scope (Closures) ===
// A function inside another function can access variables from
// its outer (parent) scope.
function outerFunction() {
    const name = "John";

    function innerFunction() {
        console.log(name);
    }

    innerFunction();
}

outerFunction(); // Output: John
// Even if the outerFunction function has finished executing, the innerFunction function still “remembers” the parent’s variables. That is known as closure behavior.

/**
====== SCOPE CHAIN ======
When you reference a variable, JavaScript looks for it in the following order:
1. Current block/function scope
2. Parent function’s scope
3. Global scope
4. Throws ReferenceError if not found
 */

const globalVar = "global";

function outer() {
    const outerVar = "outer";

    function inner() {
        const innerVar = "inner";
        console.log(innerVar); // inner
        console.log(outerVar); // outer
        console.log(globalVar); // global
        // console.log(notDefinedVar); // ReferenceError: notDefinedVar is not defined
    }

    inner();
}

outer();
