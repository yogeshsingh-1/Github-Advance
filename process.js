// console.log(process.stdin)  ->Readable stream
// console.log(process.stdout) ->Writeable stream
// console.log(process.stderr) ->Writeable stream

// file descriptor
// process.stdin.fd -> 0
// process.stdout.fd -> 1
// process.stderr.fd  -> 2

process.stdin.on("data", (chunk) => {
  //   console.log(chunk.toString());

  process.stdout.write(chunk.toString());
});
process.stdin.on("end", () => {
  process.stdout.write("Finish");
});
const a =
  "https://www.google.com/search?q=vmware+install+windows+11&sca_esv=a3c6ed50d1eb053c&rlz=1C1GCEB_enIN1163IN1163&sxsrf=APpeQntAMwo5N7H_RqOrT-2wU7gQAr17yw%3A1792841980192&ei=_Jjcav6aC8fvseMPu8v7iAE&biw=1280&bih=551&oq=vmware+in&gs_lp=Egxnd3Mtd2l6LXNlcnAiCXZtd2FyZSBpbioFCAEYgAQyChAAGIAEGBQYhwIyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyCBAAGIAEGLQHMgUQABiABDIFEAAYgARIyxJQY1idCXABeAGQAQCYAZABoAGsA6oBAzAuM7gBA8gBAPgBAZgCBKAC2wTCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICDhAAGOQCGNYEGLAD2AEBwgIUEC4Y3AYYuAYY2gYYyAMYsAPYAQHCAhcQLhjcBhi4BhjaBhjYAhjIAxiwA9gBAcICDRAAGIAEGIoFGEMYsQPCAgoQABiABBiKBRhDmAMAiAYBkAYTugYGCAEQARgJkgcDMS4zoAfLD7IHAzAuM7gHsQTCBwUzLTMuMcgHOYAIAQ&sclient=gws-wiz-serp";

const b = URL.parse(a);
console.log(b);
console.log(b.search);
const query = new URLSearchParams(b.search);
console.log("query", query);
const obj = Object.fromEntries(query.entries());
console.log("hi", obj);
