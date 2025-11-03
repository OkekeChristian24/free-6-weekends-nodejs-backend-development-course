/* 
====== VARIABLES ======
Declared with var, let, const, automatically

Variables are identified with unique names called identifiers.

The rules for constructing names (identifiers) are:
- Names can contain letters, digits, underscores, and dollar signs.
- Names must begin with a letter, a $ sign or an underscore (_).
- Names are case sensitive (X is different from x).
- Reserved words (JavaScript keywords) cannot be used as names.

Valid Javascript variables: _age, $name5, house2rent, user_name
Invalid Javascript variables: 5name, name-age, 
*/

/* 
=== Using var ===
- Function-scoped (NOT block-scoped)
- Can be redeclared and updated
- Hoisted (moved to the top of its scope but initialized as undefined)
*/

// <--- Redeclared and updated --->
var name = "Alice";

console.log(name);

var name = "John";
console.log(name);

name = "Chris";
console.log(name);

// <--- Function-scoped --->
function greet() {
    if (true) {
        var message = "Hello";
    }
    console.log(message); // // Works! var is not block-scoped
}
greet();

/* 
=== Using let ===
let: 
- Block-scoped (only exists inside { ... })
- Can be updated, but not redeclared in the same scope
- Hoisted, but not initialized (in “Temporal Dead Zone” until declared)

Best for: variables whose values change over time
*/

// <--- Updated --->
let age = 22;
age = 99; // You can update it
console.log(age); // 99

// <--- Cannot redeclare in same scope --->
// let age = 45; // Error: Identifier 'age' has already been declared

// <--- Block-scoped --->
if (true) {
    let greeting = "Hi!";
    console.log(greeting);
}
// console.log(greeting); // Error: greeting is not defined

/*
=== Using const ===
const:
- Block-scoped (like let)
- Cannot be updated or redeclared
- Must be initialized when declared
*/

const PI = 3.14159;
console.log(PI); // 3.14159

// <--- Cannot reassign --->
// PI = 3.14; // Error: Assignment to constant variable

// <--- Block-scoped --->
if (true) {
    const city = "Lagos";
    console.log(city); // "Lagos"
}
// console.log(city) // Error: city is not defined

/*
=== Automatically ===
Undeclared variables are automatically declared when first used
*/

boys = 5;
girls = 67;
totalStudent = boys + girls;
console.log(totalStudent);
