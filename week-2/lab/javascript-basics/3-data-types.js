/*
====== DATA TYPES ======
Data types define the kind of value a variable can hold. For example, a number, string, boolean, object, etc.
They help JavaScript know how to store, compare, and manipulate values.

JavaScript has two categories of data types:
- Primitive types (immutable, stored directly)
- Non-primitive / Reference types (stored by reference)

Javascript has 7 Primitive and 1 Non-Primitive data types

Primitive Types:
| Type        | Description                                       | Example                                  |
| ----------- | ------------------------------------------------- | ---------------------------------------- |
| `String`    | Text data                                         | `"Hello"`, `'World'`, `` `Hi ${name}` `` |
| `Number`    | Numeric values (integers, floats, special values) | `42`, `3.14`, `NaN`, `Infinity`          |
| `BigInt`    | Large integers beyond `Number` limit              | `12345678901234567890n`                  |
| `Boolean`   | True or false values                              | `true`, `false`                          |
| `undefined` | Declared variable but not assigned                | `let x; // undefined`                    |
| `null`      | Intentionally empty value                         | `let y = null;`                          |
| `Symbol`    | Unique identifiers                              | `Symbol('id')`                           |


They are called primitive wrappers objects. They are created when you use the constructor function associated with them

Non-Primitive Types: They are known as objects
- Object
- Array
- Function
- Map
- Set

*/

// ====== Primitive Types ======
// 1. Strings
let name = "Alice";
let city = new String("London");
let city2 = String("New York");
let greeting = `Hello, ${name}! Welcome to ${city}`; // Template literal
console.log(greeting); // "Hello, Alice! Welcome to London"

// 2. Numbers
let age = 25;
let price = 19.99;
let hex = 0xf00d;
let total = age + price;
console.log(total); // 44.99

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log("abc" * 3); // NaN (Not a Number)

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324

/*
// 3. BigInt - Used when numbers exceed the safe integer limit (2^53 - 1).
Introduced in ES2020, BigInt allows working with arbitrarily large integers safely.
You can use BigInt for cryptography, financial systems, or blockchain data.
*/
let big = 123456789012345678901234567890n;
let small = 10n;
console.log(big + small); // 123456789012345678901234567900n
// BigInt cannot be mixed directly with regular numbers:
// console.log(10n + 5); // TypeError
console.log(10n + BigInt(5)); // 15n

// 4. Boolean
let isLoggedIn = true;
let isAdmin = false;
console.log(isLoggedIn && isAdmin); // false

// 5. Undefined
let username;
console.log(username); // undefined

// 6. Null
let data = null;
console.log(data); // null
console.log(typeof null); // "object" (this is a JS bug)

// 7. Symbol
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false

/*
====== Non-Primitive Types ======
All non-primitive type is considered as an object type

*/

/* 
// 8. Object
An Object is a variable that can hold many variables.
Objects are collections of key-value pairs, where each key (known as property names) has a value.
Objects can describe anything like houses, cars, people, animals, or any other subjects.

Methods for Defining JavaScript Objects
1. Using an Object Literal
2. Using the new Keyword
5. Using Object.create()
6. Using Object.fromEntries()
3. Using an Object Constructor
4. Using Object.assign()
*/

// i. Using an Object Literal
let person1 = {
    name: "John",
    age: 25,
    isStudent: false,
};

// ii. Using the new Keyword
const person2 = new Object({
    name: "Neil",
    age: 25,
    isStudent: false,
});
console.log(person2.name); // "Neil"

// iii. Using Object.create()
const person3 = {
    firstName: "Jane",
    lastName: "Doe",
};
const lady = Object.create(person3);
lady.firstName = "Linda";
console.log(lady.firstName); // "Linda"

// iv. Using Object.fromEntries()
const fruitCounts = [
    ["apples", 300],
    ["pears", 900],
    ["bananas", 500],
];
const obj = Object.fromEntries(fruitCounts);
console.log(obj);

// Access properties in an object
const career = "Software Engineer";
let person4 = {
    name: "John",
    age: 25,
    career,
    "best food": "Rice and Chicken",
    isStudent: false,
};

// Dot notation
console.log(person4.name); // "John"
// Bracket notation
console.log(person4["age"]); // "25"
const prop = "best food";
console.log(person4[prop]); // "Rice and Chicken"
console.log(person4["best food"]); // "Rice and Chicken"

// 9. Array
let colors = ["red", "green", "blue"];
const cars = new Array("Benz", "Volvo", "BMW");

console.log(cars[0]); // "Benz"
console.log(colors[1]); // "green"

// 10. Function
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"

function add(value1, value2) {
    const sum = value1 + value2;
    return; // No return value
}
console.log(add(3, 5)); // undefined

console.log(typeof function () {}); // "function"
// Arrow function
const arrowFunc = () => {};

/*
====== How JS Stores Primitive and Non-Primitive
- Primitive: In stack by value
- Non-Primitive: In heap by reference
*/

let x = 10;
let y = x;
y = 20;
console.log(x); // 10 (independent copy)

let obj1 = { name: "John" };
let obj2 = obj1;
obj2.name = "Jane";
console.log(obj1.name); // "Jane" (same reference)

console.log(0.11 + 0.2 === 0.31);
/*
====== Properties and Methods of Array and String ======
Strings are read-only,
Arrays are mutable and can contain any data type.
*/

// === Common properties and methods ===
// <--- Common property --->
// length: Returns number of elements/characters
console.log("Christian".length);
console.log([1, 2, 3, 4, 5, 6].length);

// <--- Common methods --->
// indexOf(elem): Finds the first index of an element/substring
console.log("banana".indexOf("a")); // 1
console.log([1, 2, 3, 2].indexOf(2)); // 1

// includes(elem): Checks if element/substring exists
console.log("hello".includes("e")); // true
console.log([(1, 2, 3)].includes(2)); // true

// slice(start, end): Returns a shallow copy/substring
console.log("hello".slice(1, 4)); // "ell"
console.log([(1, 2, 3, 4)].slice(1, 3)); // [2,3]

// concat(elem): Joins two or more items
console.log("Hi".concat(" JS")); // "Hi JS"
console.log([1, 2].concat([3, 4])); // [1, 2, 3, 4]

// toString(): Converts to string representation
console.log([1, 2, 3].toString()); // "1,2,3"
console.log("abc".toString()); // "abc"

// ====== Commonly Used Array Methods ======
// === Adding/Removing Elements ===
const fruits = ["apple", "banana"];

// push(elem): Adds "cherry" to the end
fruits.push("cherry");
console.log(fruits); // ["apple", "banana", "cherry"]

// pop(): Removes "cherry" from the end
let removedFruit = fruits.pop();
console.log(removedFruit); // "cherry"

// unshift(elem): Adds "mango" to the start
fruits.unshift("mango");
console.log(fruits); // ["mango", "apple", "banana"]

// shift(): Removes "mango" from the start
removedFruit = fruits.shift();
console.log(removedFruit); // "mango"

// === Transforming/Iterating ===
const nums = [1, 2, 3];

// map(func): Creates a new array by applying a function to each element
const doubleNums = nums.map((x) => x * 2);
console.log(doubleNums); // [2, 4, 6]

// filter(func): Returns array of elements that meet a condition
const gtNums = nums.filter((x) => x > 1);
console.log(gtNums); // [2, 3]

// reduce(func): Reduces array to a single value
const sum = nums.reduce((acc, n) => acc + n, 0); // 6
console.log(sum); // 6

// forEach(func): Executes a function for each element (no return value)
nums.forEach((x) => console.log(x)); // logs 1,2,3

// some(func): Checks if any element passes a condition
const hasEvenNum = nums.some((x) => x % 2 === 0);
console.log(hasEvenNum); // true

// every(func): Checks if all elements pass a condition
const allAreEvenNum = nums.every((x) => x % 2 === 0);
console.log(allAreEvenNum); // false

// === Sorting & Converting ===
const values = [3, 1, 2];

// sort(): Sorts an array numerically or alphabetically
values.sort();
console.log(values); // [1, 2, 3];

// reverse(): Inversely sorts an array numerically or alphabetically
values.reverse();
console.log(values); // [3, 2, 1];

// join(sep): Converts array to string with separator. Default separator is comma
console.log(values.join()); // 3,2,1
console.log(values.join("-")); // 3-2-1

// concat() method as discussed above

// === Finding/Checking ===
// indexOf() method as discussed above
// includes() method as discussed above

// find(func): Returns first element matching condition
console.log(values.find((x) => x > 1));

// ====== Common String Methods ======
// === Access & Extraction ===
const word = "JavaScript";

// charAt(index): Returns character at given index
console.log(word.charAt(4)); // "S"

// at(index): Returns character (supports negative index)
console.log(word.at(-1)); // "t"

// slice(start, end): Extracts substring
// slice(start, end) method as discussed above

// Similar to slice but doesn’t support negatives
word.substring(4, 10); // "Script"

// === Searching ===
const hello = "hello world";
// indexOf() method as discussed above
// includes() method as discussed above

// startsWith(elem): Checks if starts with substring
hello.startsWith("he"); // true

// endsWith(elem): Checks if ends with substring
hello.endsWith("lo"); // false

// === Transformation ===
// trim(): Removes whitespace
console.log("  js  ".trim()); // "js"

// toUpperCase(): Converts to uppercase
console.log("hello".toUpperCase()); // "HELLO"

// toLowerCase(): Converts to lowercase
console.log("HELLO".toLowerCase()); // "hello"

// repeat(n): Repeats string n times
console.log("hi".repeat(3)); // "hihihi"

// replace(old, new): Replaces part of string
console.log("hello world".replace("world", "JS")); // "hello JS"

// === Splitting and Joining ===
const text = "a,b,c";

// split(sep): Splits string into array
text.split(","); // ["a","b","c"]

// join(sep) method as discussed above

// ====== Properties and Methods of Object ======
const user = {
    name: "John Doe",
    age: 25,
    isAdmin: true,
    hobbies: ["reading", "gaming"],
    greet: function () {
        return `Hello, John Doe!`;
    },
};

// Returns array of property names (keys)
console.log(Object.keys(user)); // [ 'name', 'age', 'isAdmin', 'hobbies', 'greet' ]

// Returns array of property values
console.log(Object.values(user)); // [ 'John Doe', 25, true, [ 'reading', 'gaming' ], [Function: greet] ]

// Returns array of [key, value] pairs
console.log(Object.entries(user)); // [["name", "John Doe"],["age", 25],["isAdmin", true],["hobbies", ["reading", "gaming"]],[ 'greet', [Function: greet] ]]

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
// Used to copy or merge properties from one or more objects into a target object.
Object.assign(target, source);
console.log(target); // { a: 1, b: 3, c: 4 }

const clone = Object.assign({}, target);
console.log(clone); // { a: 1, b: 3, c: 4 }
