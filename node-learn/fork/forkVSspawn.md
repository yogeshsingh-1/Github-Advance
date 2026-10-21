# spawn() aur fork() dono ka kaam ek naya child process start karna hai. Difference ye hai ki us process mein chalana kya hai.

# spawn

spawn se hum ping cmd and python and ffmpeg.
Maan lo tumhe system ka node command execute karna hai.

spawn()
General-purpose process
Kisi command ya executable ko run karta hai. Output ko streams ke through receive kar sakte ho.
Example: ping, python, ffmpeg, ya koi external program.

# fork

Ek alag Node.js process mein JavaScript file execute karta hai. Parent aur child ke beech IPC communication built-in hota hai.
Example: worker.js mein background calculation karna.

# spawn() choose karo

- External executable run karna ho.
- ffmpeg se video convert karna ho.
- Python script ya system utility run karni ho.
- Large output ko stream karna ho.

# fork() choose karo

- Apni Node.js JavaScript file alag process mein chalani ho.
- Parent aur worker ko messages exchange karne hon.
- CPU-intensive processing ko main process se isolate karna h
