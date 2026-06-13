import express from "express";
import multer from "multer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Multer में file को 2 जगह store कर सकते हैं:

// Disk Storage → Hard Disk में save
// Memory Storage → RAM में save

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.resolve(__dirname, "upload");
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
const upload = multer({
  dest: "assest/",
  storage: multer.memoryStorage(),
});
// const storage = multer.memoryStorage();

// क्योंकि file disk पर save ही नहीं होती।

// File सिर्फ RAM में buffer के रूप में रहती है:

// req.file.buffer

// अगर memoryStorage के साथ file को किसी path पर save करना है, तो तुम्हें खुद fs.writeFile() करना पड़ेगा।

// | Storage Type       | Custom Destination Path? | File Save कहाँ होती है? |
// | ------------------ | ------------------------ | ----------------------- |
// | `diskStorage()`    | ✅ Yes (`destination`)    | Direct Disk             |
// | `memoryStorage()`  | ❌ No                     | RAM (`buffer`)          |
// | `dest: "uploads/"` | ✅ Yes                    | Direct Disk             |

// diskStorage() में uploaded data temporary chunks के रूप में RAM में आता है, disk पर write होने के बाद उसकी memory automatically Garbage Collector द्वारा free कर दी जाती है। पूरी file RAM में store नहीं रहती।

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", upload.single("avatar"), (req, res) => {
  const file = req.file;
  const writestream = fs.createWriteStream("output.mp4");
  writestream.write(file.buffer);
  writestream.end();
  const files = req.files;
  return res.send("hi");
});

app.get("/single", upload.array("avatar", 20), (req, res) => {
  const file = req.files;
  return res.send("hi");
});
// const uploadMiddleware = upload.fields("avatar");
const uploadMiddleware = upload.fields([
  { name: "avatar", maxCount: 2 },
  { name: "gallery", maxCount: 2 },
]);
app.get("/upload", uploadMiddleware, (req, res) => {
  const file = req.files;
  return res.send("hi");
});
app.listen(3000, () => console.log(`server is listen on 3000`));

// File तो पहले RAM में आती है, फिर disk पर जाती है। तो memoryStorage() और diskStorage() कैसे अलग-अलग manage करते हैं?

// जब file upload होती है

// Browser file को छोटे-छोटे chunks में भेजता है:

// File
//  ↓
// HTTP Request
//  ↓
// Chunk1
// Chunk2
// Chunk3
// ...

// Node.js इन chunks को stream के रूप में receive करता है।

// 1. memoryStorage()

// Multer सभी chunks को collect करके एक बड़ा Buffer बनाता है।

// Chunk1
// Chunk2
// Chunk3
//    ↓
// Buffer.concat(...)
//    ↓
// req.file.buffer    पूरी file RAM में रहती है।

// 2. diskStorage()

// Multer chunks को RAM में collect नहीं करता।

// जैसे-जैसे chunk आता है, वैसे-वैसे write stream से disk पर लिख देता है।

// इसलिए पूरी file RAM में नहीं रखनी पड़ती।

// memoryStorage() → सारे chunks जोड़कर पूरी file RAM में Buffer बनाता है।

// diskStorage() → chunks आते ही stream के जरिए सीधे disk पर लिखता जाता है, इसलिए पूरी file RAM में store नहीं होती।
