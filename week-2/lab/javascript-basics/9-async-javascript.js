/*
====== ASYNC JAVASCRIPT ======
JavaScript is single-threaded — it has one call stack, meaning it runs one task at a time.

But the event loop coordinates asynchronous tasks (like setTimeout, fetch, etc.) by 
interacting with the Web APIs, callback queue, and microtask queue.

=== How it works ===
- Call Stack: Where functions are executed.
- Web APIs: Browser or Node.js APIs that handle async operations.
- Callback Queue (Macrotask Queue): Stores callbacks from timers, events, etc.
- Microtask Queue: Stores Promises and async/await callbacks.
- Event Loop: Continuously checks if the call stack is empty and moves queued tasks in.
*/

// === Execution Order ===
console.log("Start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise resolved"));

console.log("End");
/*
Output:

Start
End
Promise resolved
Timeout callback

*/

// === Callbacks ===
// A function passed as an argument to another function.
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received!");
    }, 1000);
}

fetchData((data) => console.log(data));
// Output after 1s: Data received!

// === Promises ===
// Promises represent a future value (pending → fulfilled → rejected).
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise resolved!"), 1000);
    // setTimeout(() => reject("Promise rejected!"), 1000);
});

promise
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => console.log("Done"));

// === async/await ===
// Syntactic sugar over Promises — makes async code look synchronous.
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data fetched!"), 1000);
    });
}

async function fetchData() {
    console.log("Fetching...");
    const result = await getData();
    console.log(result);
    console.log("Done");
}

fetchData();

// Output:
// Fetching...
// Data fetched!
// Done

/* 
=== Microtasks vs Macrotasks ===
Microtasks always run before the next macrotask.

Microtasks: 
- Sources: Promises, async/await
- Queue: Microtask Queue
- Example: Promise.then(), queueMicrotask()

Macrotasks:
- Sources: Timers, I/O, UI events
- Queue: Callback (Macrotask) Queue
- Example: setTimeout, setInterval,
*/
setTimeout(() => console.log("Macrotask - setTimeout"), 0);

Promise.resolve().then(() => console.log("Microtask - Promise"));

function add(a, b) {
    return a + b;
}

console.log(add(34, 68));

console.log("Synchronous");
/*
Output:
102
Synchronous
Microtask - Promise
Macrotask - setTimeout
*/
