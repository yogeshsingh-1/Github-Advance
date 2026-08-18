import XLSX from "xlsx";
import fs from "fs";

const workbook = XLSX.readFile("coa.xlsx");
console.log(workbook.SheetNames);

let a = 1;
for (const sheets of workbook.SheetNames) {
  let fileName = `data`;
  const sheet = workbook.Sheets[sheets];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  fileName = fileName + a++ + ".json";
  fs.writeFileSync(fileName, JSON.stringify(jsonData));
}
// const jsonData = XLSX.utils.sheet_to_json(sheet);
// console.log(jsonData);

const fileName = "data1.json";
const datas = JSON.parse(fs.readFileSync(fileName));
const parent1 = [];

for (let data of datas) {
  console.log(data);
  if (data["Parent ID"] === 29) {
    console.log(data);
    parent1.push(data);
  }
}
fs.writeFileSync("parent29.json", JSON.stringify(parent1));
