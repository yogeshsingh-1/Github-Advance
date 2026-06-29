<!-- fs.stat() -->

fs.stat() -> Promise version -> Sirf file ki information deta hai.
fs.statsync() -> without Promise version

fs.stat() ka kaam kisi file ya directory ki information (metadata) lana hota hai.
Ye file ka content nahi padhta, sirf uske baare me information deta hai.

# imp method

1. stats.isFile()
2. stats.isDirectory()
3. stats.size
4. stats.mtime
5. stats.birthtime

res.json({
isFile: stats.isFile(), -> Check file
isDirectory: stats.isDirectory(), -> Check directory
size: stats.size, -> File size
modified: stats.mtime, -> Last modified time
created: stats.birthtime, -> Created time
});

{
"dev": 0,
"mode": 16822,
"nlink": 1,
"uid": 0,
"gid": 0,
"rdev": 0,
"blksize": 4096,
"ino": 2814749768757982,
"size": 0,
"blocks": 8,
"atimeMs": 1782729574401.67,
"mtimeMs": 1782565131932.28,
"ctimeMs": 1782565131932.28,
"birthtimeMs": 1781244568177.48
}

# example:-

const dir = await fs.readdir("./");

const result = [];

for (const file of dir) {
const stats = await fs.stat(file);

    result.push({
      name: file,
      isDirectory: stats.isDirectory(),
    });

}
