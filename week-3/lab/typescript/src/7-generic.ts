/*
====== GENERICS ======
Generics make code reusable and type-safe. It can be used with functions, classes, interfaces, etc.

*/
function identity<T>(value: T): T {
    return value;
}

let num = identity<number>(42);
let str = identity<string>("Hello");

let names: Array<string> = ["Christian", "Alice", "Bob"];
let anotherMixedArray: Array<string | number> = ["apple", 2, "orange", 3]; // Or using the Array<T> generic syntax:
