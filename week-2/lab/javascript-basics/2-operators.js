/*
====== OPERATORS ======
Operators are symbols that tell JavaScript to perform certain operations on values or variables (called operands).

Arithmetic Operators: Used to perform mathematical operations.
1. +	Addition
2. -	Subtraction	
3. *	Multiplication	
4. /	Division
5. %	Modulus (Remainder)
6. **	Exponentiation
7. ++	Increment
8. --	Decrement

Assignment Operators: Used to assign values to variables.
1. =
2. +=	
3. -=	
4. *=	
5. /=	
6. %=

Comparison Operators: Used to compare two values (returns true or false).
1. ==	Equal to (loose equality)
2. ===	Strict equal to
3. !=	Not equal to
4. !==	Strict not equal to
5. >	Greater than
6. <	Less than
7. >=	Greater or equal
8. <=	Less or equal

Logical Operators: Used to combine or invert conditions.
1. && (AND)
2. || (OR)
3. ! (NOT)

Ternary Operator (? :): A shorthand for if...else.

Type Operators: typeof, instanceof

 */

// Arithmetic Operators: Used to perform mathematical operations.
let x = 5;
let y = 2;

// Addition: +
console.log(x + y); // 5 + 2 = 7

// Subtraction: -
console.log(x - y); // 5 - 2 = 3

// Multiplication: *
console.log(x * y); // 5 * 2 = 10

// Division: /
console.log(x / y); // 5 / 2 = 2.5

// Modulus (Remainder): %
console.log(x % y); // 5 % 2 = 1

// Exponentiation: **
console.log(x ** y); // 5 ** 2 = 25

// Increment: x++ or ++x
console.log(x++); // Logs before incrementing
console.log(++x); // Increments before logging

// Decrement: y-- or --y
console.log(y--); // Logs before decrementing
console.log(--y); // Decrements before logging

// Assignment Operators: Used to assign values to variables.
let a = 9; // a = 9
console.log((a += 3)); // a = a + 3
console.log((a -= 2)); // a = a - 2
console.log((a *= 4)); // a = a * 4
console.log((a /= 2)); // a = a / 2
console.log((a %= 2)); // a = a % 2

// Comparison Operators: Used to compare two values (returns true or false).
console.log(5 == "5"); // true
console.log(5 === "5"); // false
console.log(5 != "5"); // false
console.log(5 !== "5"); // true
console.log(8 > 5); // true
console.log(8 < 5); // false
console.log(8 >= 8); // true
console.log(5 <= 8); // true

// Logical Operators: Used to combine or invert conditions.
const xCoord = 6767;
const yCoord = 5733;
if (xCoord > 600 && yCoord < 700) {
    console.log("You are outside the region");
}

if (xCoord === 300 || yCoord === 350) {
    console.log("You are at the middle mark");
}

// Ternary Operator (? :): A shorthand for if...else.
let age = 18;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // "Yes"

/*
====== OPERATOR PRECENDENCE ======
Operator precedence determines the order in which operators are evaluated in an expression.
If an expression has multiple operators, JavaScript uses precedence rules to decide which one runs first.

- Parentheses (()) always come first.
- Unary operators like !, typeof, ++ come next.
- Arithmetic operators (*, /, %) before additive (+, -).
- Comparison before logical operators.
- Assignment (=, +=, etc.) happens last.

If two operators have the same precedence, JavaScript follows left-to-right associativity 
(except for **, = which are right-to-left).

*/

let result = 10 + 5 * 2;
console.log(result); // 20

let result2 = (10 + 5) * 2;
console.log(result2); // 30

let boysAge = 20;
let message = boysAge > 18 && boysAge < 30 ? "Young Adult" : "Not in range";
console.log(message); // "Young Adult"
