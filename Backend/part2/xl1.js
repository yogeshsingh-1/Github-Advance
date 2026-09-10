import XLSX from "xlsx";
import fs from "fs";

const workbook = XLSX.readFile("./Excel.xlsx");
for (const sheets of workbook.SheetNames) {
  //   console.log(sheets);
  //   console.log(workbook.Sheets[sheets]);
  const sheet = workbook.Sheets[sheets];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
//   fileName = fileName + a++ + ".json";
  fs.writeFileSync("data.json", JSON.stringify(jsonData));
}
