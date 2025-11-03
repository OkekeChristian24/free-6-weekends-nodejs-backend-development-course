/*
====== PRIMITIVE WRAPPER OBJECTS ======
In JavaScript, primitive values (strings, numbers, booleans) are not objects, 
but they have access to methods and properties through Primitive Wrapper Objects.
When you try to access a property or method on a primitive, JavaScript automatically
 wraps it in a temporary object, uses the method/property, then discards the wrapper.
*/

// Primitive string
let str = "hello";

// Behind the scenes: JavaScript creates a temporary String object
let temp = new String(str); // Temporary wrapper
let result = temp.toUpperCase(); // Method call
temp = null; // Wrapper discarded

console.log(str.toUpperCase()); // "HELLO" - works!
console.log(str.length); // 5 - works!

// Primitive number
let num = 42; // Primitive number
num.foo = "bar"; // Tries to add property (creates temporary Number wrapper)
console.log(num.foo); // undefined (wrapper discarded, property lost)

// Explicit wrapper object behaves differently
let numObj = new Number(42); // Persistent object
numObj.foo = "bar";
console.log(numObj.foo); // "bar" (persists because it's an object)

// Comparison
let strPrimitive = "test"; // typeof: "string"
let strWrapper = new String("test"); // typeof: "object"

console.log(typeof strPrimitive); // Output: "string"
console.log(typeof strWrapper); // Output: "object"

console.log(strPrimitive === strWrapper); // Output: false (different types)
console.log(strPrimitive == strWrapper); // Output: true (loose equality coerces wrapper to primitive)
