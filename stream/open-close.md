<!-- open close conecpt -->

appendFile() और createWriteStream() में सबसे बड़ा फर्क open/close के concept में ही है।

1. appendFile()

हर बार call करने पर file open → write → close होती है।

await fs.promises.appendFile("file.txt", "Hello");
await fs.promises.appendFile("file.txt", "World");

Internal flow:

1st call
open file
↓
write Hello
↓
close file

2nd call
open file
↓
write World
↓
close file

अगर 1000 बार appendFile() चलाओगे:

1000 open
1000 write
1000 close

इसलिए बार-बार call करने पर performance कम हो सकती है।

2. createWriteStream()

createWriteStream() file को एक बार open करता है।

फिर कई बार write कर सकता है।

अंत में end() पर close करता है।

const stream = fs.createWriteStream("file.txt");

stream.write("Hello");
stream.write("World");

stream.end();

Internal flow:

open file (1 time)
↓
write Hello
↓
write World
↓
close file (on end())

अगर 1000 writes हों:

1 open
1000 write
1 close

इसलिए यह ज्यादा efficient है।

| Function              | Open       | Write  | Close      |
| --------------------- | ---------- | ------ | ---------- |
| `appendFile()`        | हर call पर | 1 बार  | हर call पर |
| `createWriteStream()` | 1 बार      | कई बार | `end()` पर |

appendFile() में data पहले RAM में रहता है, फिर OS buffer के through disk पर write होता है; जबकि createWriteStream() data को छोटे-छोटे chunks में handle करता है।
