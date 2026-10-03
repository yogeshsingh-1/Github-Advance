import os from "node:os";
// console.log(os)
console.log(os.hostname()); // hostname
console.log(os.loadavg());
console.log(os.uptime()); // Returns the system uptime in number of seconds.
console.log(os.freemem()); // Returns the amount of free system memory in bytes as an integer.
console.log(os.totalmem()); // Returns the total amount of system memory in bytes as an integer.
console.log(os.cpus()); // Returns an array of objects containing information about each logical CPU core.
console.log(os.networkInterfaces()); //  Returns an object containing network interfaces that have been assigned a network address.
   
