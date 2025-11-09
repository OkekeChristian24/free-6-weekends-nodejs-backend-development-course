const os = require("os");

console.log("Operating System Info:");
console.log("----------------------");
console.log("OS Type:", os.type());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Count:", os.cpus().length);
console.log("Total Memory (GB):", (os.totalmem() / 1024 ** 3).toFixed(2));
console.log("Free Memory (GB):", (os.freemem() / 1024 ** 3).toFixed(2));
console.log("Home Directory:", os.homedir());
console.log("Hostname:", os.hostname());
console.log("Uptime (hours):", (os.uptime() / 3600).toFixed(2));
