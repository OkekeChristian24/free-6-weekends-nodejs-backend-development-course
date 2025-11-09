import { EventEmitter } from "events";

const emitter = new EventEmitter();

// Define the listener with proper typing
emitter.on("greet", (name: string) => {
    console.log(`Hello ${name}`);
});

// Emit the event
emitter.emit("greet", "Christian");
