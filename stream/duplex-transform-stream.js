import { Duplex, Transform } from "stream";

// हम एक custom duplex stream बना रहे हैं।

// Duplex में दो methods implement करनी पड़ती हैं:

// read() → data provide करने के लिए
// write() → incoming data handle करने के लिए

const duplex = new Duplex({
  read(size) {
    // जब stream से data read किया जाएगा, तब Node.js read() call करेगा।
    this.push("Hello"); // Readable side में "Hello" भेज रहा है।
    this.push("World");
    this.push(null); // this.push(null) -> null बताता है, ki ab aur data nhi hai. (EOS) End of Stream/End of File
  },
  write(chunk, encoding, callback) {
    // जब कोई stream में data write करेगा:
    console.log("Received:", chunk.toString());
    callback();
  },
});

duplex.write("Himanshu");
duplex.on("data", (chunk) => {
  console.log("Read:", chunk.toString());
});
