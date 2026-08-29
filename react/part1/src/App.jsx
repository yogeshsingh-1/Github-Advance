// import { useState, useRef } from "react";
// const App = () => {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(0);
//   const style = {
//     backgroundColor: "royalblue",
//     padding: "6px 30px",
//     border: "none",
//     height: "50px",
//     width: "100px",
//   };
//   const divstyle = {
//     display: "flex",
//     justifyContent: "center",
//     gap: 8,
//   };
//   console.log("child rendered");
//   console.log(countRef);
//   return (
//     <>
//       <div>ToDo APP</div>
//       {/* <div>{count}</div> */}
//       <div>{countRef.current}</div>
//       <div style={divstyle}>
//         <button
//           style={style}
//           onClick={() => setCount((prev) => prev + 1)}
//           onDoubleClick={(e) => {
//             console.log(e);
//             console.log("height", e.target.scrollHeight);
//             console.log("left", e.target.scrollLeft);
//             console.log("top", e.target.scrollTop);
//             console.log("width", e.target.scrollWidth);
//             // e.target.scrollTop = 100;
//             window.scroll = "100vw";
//           }}
//         >
//           Increase
//         </button>
//         <button style={style} onClick={() => setCount((prev) => prev - 1)}>
//           Decrease
//         </button>
//       </div>
//       <div style={divstyle}>
//         <button
//           style={style}
//           onClick={() => (countRef.current = countRef.current + 1)}
//         >
//           Increase
//         </button>
//         <button
//           style={style}
//           onClick={() => (countRef.current = countRef.current - 1)}
//         >
//           Decrease
//         </button>
//       </div>
//     </>
//   );
// };

// export default App;

// import React, { useState } from "react";

// const App = () => {
//   const [top, setTop] = useState(0);
//   const divStyle = {
//     border: "2px solid black",
//     height: "300px",
//     width: "400px",
//     overflow: "auto",
//   };
//   const scroll = (e) => {
//     console.log(e);
//     console.log("top", e.target.scrollTop);
//     console.log("height", e.target.scrollHeight);
//     console.log("Visible-height", e.target.clientHeight);
//     setTop(e.target.scrollTop);
//   };
//   const handleDragStart = (e) => {
//     if (e.target.draggable) {
//       console.log("Draggable element mil gaya:", e.target);
//     }
//   };
//   return (
//     <>
//       <div draggable={true} onDragStart={handleDragStart}>
//         Drag me
//       </div>
//       <div>Scroll me{top}</div>
//       <div style={divStyle} onScroll={scroll}>
//         <h3>Scroll Me</h3>
//         <p>Child Element 1</p>
//         <p>Child Element 2</p>
//         <p>Child Element 3</p>
//         <p>Child Element 4</p>
//         <p>Child Element 5</p>
//         <p>Child Element 6</p>
//         <p>Child Element 7</p>
//         <p>Child Element 8</p>
//         <p>Child Element 9</p>
//         <p>Child Element 10</p>
//         <p>Child Element 11</p>
//         <p>Child Element 12</p>
//         <p>Child Element 13</p>
//         <p>Child Element 14</p>
//         <p>Child Element 15</p>
//         <p>Child Element 16</p>
//         <p>Child Element 17</p>
//         <p>Child Element 18</p>
//         <p>Child Element 19</p>
//         <p>Child Element 20</p>
//       </div>
//     </>
//   );
// };

import { useState } from "react";

function App() {
  const [items, setItems] = useState(["Apple", "Banana", "Mango"]);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item) => {
    console.log(e)
    console.log("Drag started:", item);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const item = e.dataTransfer.getData("text/plain");

    console.log("Dropped:", item);

    if (!item) return;

    setDroppedItems((prev) => [...prev, item]);

    setItems((prev) => prev.filter((currentItem) => currentItem !== item));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Items</h2>

      {items.map((item) => (
        <div
          key={item}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, item)}
          style={{
            width: "200px",
            padding: "15px",
            marginBottom: "10px",
            border: "1px solid black",
            cursor: "grab",
            background: "white",
          }}
        >
          {item}
        </div>
      ))}

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          width: "300px",
          minHeight: "200px",
          marginTop: "30px",
          padding: "20px",
          border: "2px dashed black",
        }}
      >
        <h3>Drop Here</h3>

        {droppedItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
