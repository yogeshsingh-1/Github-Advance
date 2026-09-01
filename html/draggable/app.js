let container = document.querySelector(".container");
Object.assign(container.style, {
  // backgroundColor:"red",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  //   justifyContent: "center",
});
let leftDiv = document.createElement("div");
leftDiv.setAttribute("id", "left");
let rightDiv = document.createElement("div");
rightDiv.setAttribute("id", "right");
// leftDiv.setAttribute("draggable", true);
container.append(leftDiv, rightDiv);

Object.assign(leftDiv.style, {
  width: "200px",
  height: "200px",
  //   border: "2px solid black",
  flex: 1,
});
Object.assign(rightDiv.style, {
  width: "200px",
  height: "200px",
  border: "2px solid black",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

let fruits = ["Apple", "Manago", "Banana", "Grapes", "Litchi"];

for (let i = 0; i < fruits.length; i++) {
  let p = document.createElement("p");
  p.innerText = fruits[i];
  p.setAttribute("id", i);
  p.setAttribute("draggable", true);
  Object.assign(p.style, {
    border: "1px dashed black",
    textAlign: "center",
    marginBottom: "15px",
    padding: "5px",
  });
  leftDiv.append(p);
  //   console.dir(p);
}

let elements = document.querySelectorAll("#left p");

for (const element of elements) {
  element.addEventListener("dragstart", function (e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
  });
  element.addEventListener("dragend", (e) => {});
}
rightDiv.addEventListener("dragover", function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});
rightDiv.addEventListener("drop", function (e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const element = document.getElementById(id);

  rightDiv.appendChild(element);
});
leftDiv.addEventListener("dragover", function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});
leftDiv.addEventListener("drop", function (e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const element = document.getElementById(id);
  leftDiv.appendChild(element);
});
