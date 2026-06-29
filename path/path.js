//      ./ -> Same Directory
//      ../ -> Jish Directory per ho uske parrent par jaho
import path from "node:path";
console.log(path.normalize("../../../test")); // ../../../test
console.log(path.normalize("/../../../test")); // /test
// root per jao than parent per phir parent phir parent phir milege test toh path.normalize  normalize kar deta hai kyuki root ka koi parent nhi hota hai.
