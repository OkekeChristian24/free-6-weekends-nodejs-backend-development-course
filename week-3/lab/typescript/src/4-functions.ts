/*
====== FUNCTIONS ======
You can define types for parameters and return values.
*/
function greet(name: string, greeting?: string): void {
    console.log(`${greeting || "Hello"}, ${name}!`);
}

function add(a: number, b: number): number {
    return a + b;
}

greet("Christian"); // "Hello, Christian!"
greet("Christian", "Hi"); // "Hi, Christian!"

console.log(add(34, 67));
