setTimeout(() => console.log("Macrotask - setTimeout"), 0);

Promise.resolve().then(() => console.log("Microtask - Promise"));

function add(a, b) {
    return a + b;
}

console.log(add(34, 68));

console.log("Synchronous");
