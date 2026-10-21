import { useState } from "react";
const DropDown = () => {
  const [items, setItems] = useState(["Apple", "Banana", "Mango"]);
  const [droppedItems, setDroppedItems] = useState([]);
  sessionStorage.setItem("");
  const handleDragStart = (e, item) => {
    console.log(e);
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
};

export default DropDown;
