# fork (child_process)

Node.js mein fork() ka use ek naya Node.js child process create karne ke liye hota hai, jisme tum alag JavaScript file execute kar sakte ho.

fork() is a method of Node.js's child_process module that launches a new Node.js process to execute a specified JavaScript file. It provides an IPC channel for communication between the parent and child processes."

- ye child_process module ka method hai.

# fork() kya karta hai?

Maan lo tumhari main application main.js hai aur tum koi heavy task worker.js mein run karna chahte ho.

- main.js = Parent process
- worker.js = Child process
- Dono ke paas apna alag JavaScript execution environment hota hai.
- Parent aur child send() aur 'message' event ke through messages exchange kar sakte hain.

# what is IPC communication

IPC ka full form hai Inter-Process Communication. Ye ek mechanism hai jiske through do alag processes aapas mein data ya messages exchange kar sakte hain.
Node.js mein fork() use karte waqt parent process aur child process ke beech IPC channel establish ho sakta hai.

1. IPC channel kya hai? Example se samjho
   Maan lo tumhari ERP application mein do alag Node.js processes hain:

- Parent process: Main API server
- Child process: Heavy calculation karne wala process
  Parent ko child se calculation ka result chahiye. Dono ki memory alag hai, isliye parent directly child ke variables access nahi kar sakta.
  IPC channel unke beech communication ka raasta hai.

IPC channel koi normal JavaScript variable nahi hai. Ye processes ke beech messages transfer karne ka communication mechanism hai.

Code Meaning

# fork("./worker.js")

Child process create karta hai aur default configuration mein IPC channel establish karta hai.

# child.send(data) 
Parent se child ko message bhejta hai.
# process.on("message", callback) 
Child, parent se message receive karta hai.
# process.send(result)
 Child se parent ko message bhejta hai.
# child.on("message", callback) 
Parent, child ka message receive karta hai. 


3. Interview ke liye important difference
Process aur IPC channel alag cheezein hain:

- Process: Program ka running instance, jiske paas apna execution environment aur memory hoti hai.
- IPC channel: Un processes ke beech communication ka mechanism.
