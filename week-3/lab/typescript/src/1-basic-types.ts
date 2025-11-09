// ====== BASIC TYPES ======
// Number
let age: number = 30;
let price: number = 99.99;
let hex: number = 0xf00d;
let bigNum: number = 1e6; // 1 million

// String
let name: string = "Christian Okeke";
let email: string = `chrischimezie24@gmail.com`;

// Boolean
let isActive: boolean = true;
let hasAccess: boolean = false;

// BigInt (for very large integers)
let largeNumber: bigint = 9007199254740991n;
let anotherBig: bigint = BigInt("12345678901234567890");

// Symbol (unique and immutable identifiers)
let sym1: symbol = Symbol("id");
let sym2: symbol = Symbol("id"); // sym1 !== sym2

// Null & Undefined ()
let nothing: null = null;
let notDefined: undefined = undefined;

// <------ Special Types ------>
// any (disables type checking, use sparingly)
let anything: any = 42;
anything = "could be string";
anything.toUpperCase();

// unknown (safer alternative to any, requires type checking before use).
let userInput: unknown = 67;
userInput = "some data";

// userInput.toUpperCase();
// Must narrow type before using
if (typeof userInput === "string") {
    userInput.toUpperCase();
}

// void (for functions with no return value)
function logMessage(msg: string): void {
    console.log(msg);
    // No return allowed (or only `undefined`)
    // return null // Error: Type 'null' is not assignable to type 'void'
    // return undefined // Works
}

// never (for functions that never return, like those that throw errors)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}

// === Type Annotation & Inference
let allowedAge: number = 30; // Annotatiion
let userName = "JohnDoe"; // Inference
// allowedAge = "35"; // Error: Type 'string' is not assignable to type 'number'.
// userName = 45 // Error: Type 'number' is not assignable to type 'string'.
