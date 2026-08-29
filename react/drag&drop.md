# React Drag and Drop

Drag and Drop ka use kisi element ko ek location se doosri location par drag karke move ya copy karne ke liye kiya jata hai.

React mein Drag and Drop implement karne ke liye hum mainly **HTML5 Drag and Drop API** aur React event handlers ka use karte hain.

---

# 1. What is Drag and Drop?

Drag and Drop ka basic flow:

```text
Drag Element
     ↓
onDragStart
     ↓
Store Data
     ↓
Move Element
     ↓
onDragOver
     ↓
Drop Element
     ↓
onDrop
     ↓
Update React State
     ↓
React Re-render
```

Example:

```text
Available Items

Apple
Banana
Mango

       ↓ Drag Apple

Drop Here

Apple
```

---

# 2. `draggable`

Kisi HTML element ko draggable banane ke liye:

```jsx
<div draggable={true}>Apple</div>
```

`draggable={true}` ka matlab hai ki element ko mouse se drag kiya ja sakta hai.

Example:

```jsx
<div draggable={true}>Drag Me</div>
```

Draggable disable karne ke liye:

```jsx
<div draggable={false}>Don't Drag Me</div>
```

---

# 3. Important Drag Events

HTML5 Drag and Drop mein kuch important events hote hain:

```text
onDragStart
onDrag
onDragEnd

onDragEnter
onDragOver
onDragLeave
onDrop
```

Sabse important events:

```text
onDragStart
onDragOver
onDrop
onDragEnd
```

---

# 4. `onDragStart`

Jab user kisi draggable element ko drag karna start karta hai, `onDragStart` execute hota hai.

Example:

```jsx
<div draggable={true} onDragStart={handleDragStart}>
  Apple
</div>
```

Function:

```jsx
const handleDragStart = (e) => {
  console.log("Drag started");
};
```

Flow:

```text
User Apple ko drag karta hai
        ↓
onDragStart
        ↓
handleDragStart()
```

---

# 5. Event Object `e`

Drag events mein event object milta hai:

```jsx
const handleDragStart = (e) => {
  console.log(e);
};
```

Event object mein useful properties hoti hain:

```js
e.target;
e.currentTarget;
e.dataTransfer;
```

---

# 6. `e.target`

`e.target` batata hai ki event actually kis element se originate hua.

Example:

```jsx
<div
  draggable={true}
  onDragStart={(e) => {
    console.log(e.target);
  }}
>
  Apple
</div>
```

Yahan `e.target` Apple wala element hoga.

---

# 7. `e.currentTarget`

`e.currentTarget` batata hai ki event handler kis element par laga hua hai.

Example:

```jsx
<div
  draggable={true}
  onDragStart={(e) => {
    console.log(e.currentTarget);
  }}
>
  Apple
</div>
```

### Difference

```text
e.target
    ↓
Actual event source

e.currentTarget
    ↓
Jis element par handler laga hai
```

---

# 8. `dataTransfer`

`dataTransfer` Drag and Drop ka bahut important part hai.

Iska use drag ke time data store karne aur drop ke time data retrieve karne ke liye hota hai.

```js
e.dataTransfer;
```

Basic flow:

```text
Drag Start
    ↓
setData()
    ↓
dataTransfer
    ↓
Drop
    ↓
getData()
```

---

# 9. `setData()`

Drag start hone par data store karne ke liye:

```js
e.dataTransfer.setData("text/plain", item);
```

Syntax:

```js
setData(type, data);
```

Example:

```js
e.dataTransfer.setData("text/plain", "Apple");
```

Ab drag data mein:

```text
Type:
text/plain

Data:
Apple
```

store hai.

---

# 10. `getData()`

Drop hone par stored data retrieve karne ke liye:

```js
const item = e.dataTransfer.getData("text/plain");
```

Agar drag start par:

```js
e.dataTransfer.setData("text/plain", "Apple");
```

store kiya tha, to drop par:

```js
e.dataTransfer.getData("text/plain");
```

return karega:

```text
Apple
```

---

# 11. `onDragOver`

Jab dragged element drop area ke upar move karta hai, `onDragOver` event fire hota hai.

Example:

```jsx
<div onDragOver={handleDragOver}>Drop Here</div>
```

Function:

```js
const handleDragOver = (e) => {
  e.preventDefault();
};
```

---

# 12. Why `preventDefault()`?

Default browser behavior mein drop operation automatically allowed nahi hota.

Isliye:

```js
e.preventDefault();
```

use karke browser ko batate hain:

```text
"Is element par drop allow karo."
```

Without:

```js
e.preventDefault();
```

`onDrop` properly trigger nahi ho sakta.

Therefore:

```jsx
const handleDragOver = (e) => {
  e.preventDefault();
};
```

is very important.

---

# 13. `onDrop`

Jab user dragged element ko destination par release karta hai, `onDrop` event execute hota hai.

Example:

```jsx
<div onDragOver={handleDragOver} onDrop={handleDrop}>
  Drop Here
</div>
```

Function:

```js
const handleDrop = (e) => {
  e.preventDefault();

  const item = e.dataTransfer.getData("text/plain");

  console.log(item);
};
```

---

# 14. Complete Basic Example

```jsx
import { useState } from "react";

function App() {
  const [items, setItems] = useState(["Apple", "Banana", "Mango"]);

  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item) => {
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
    <div>
      <h2>Items</h2>

      {items.map((item) => (
        <div
          key={item}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, item)}
        >
          {item}
        </div>
      ))}

      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <h3>Drop Here</h3>

        {droppedItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

---

# 15. Complete Flow of Above Code

Suppose user drags:

```text
Apple
```

### Step 1: `draggable`

```jsx
draggable={true}
```

Browser allows Apple to be dragged.

---

### Step 2: `onDragStart`

```jsx
onDragStart={(e) =>
  handleDragStart(e, item)
}
```

For Apple:

```js
handleDragStart(e, "Apple");
```

---

### Step 3: `setData()`

```js
e.dataTransfer.setData("text/plain", "Apple");
```

Data is stored.

```text
dataTransfer
     ↓
"Apple"
```

---

### Step 4: Move over Drop Area

```text
Apple
   ↓
   ↓
   ↓
Drop Here
```

`onDragOver` fires.

```js
e.preventDefault();
```

Drop is allowed.

---

### Step 5: Drop

User releases the mouse.

```text
onDrop
  ↓
getData()
```

```js
const item = e.dataTransfer.getData("text/plain");
```

Result:

```text
Apple
```

---

### Step 6: Update State

Add Apple to dropped items:

```js
setDroppedItems((prev) => [...prev, item]);
```

Remove Apple from original items:

```js
setItems((prev) => prev.filter((currentItem) => currentItem !== item));
```

---

# 16. `useState` in Drag and Drop

React mein Drag and Drop ke UI ko control karne ke liye state important hai.

Example:

```js
const [items, setItems] = useState(["Apple", "Banana", "Mango"]);
```

Original items:

```text
Apple
Banana
Mango
```

Dropped items:

```js
const [droppedItems, setDroppedItems] = useState([]);
```

Initially:

```text
[]
```

Apple drop hone ke baad:

```text
["Apple"]
```

---

# 17. `map()`

Items ko UI mein render karne ke liye:

```jsx
{
  items.map((item) => <div key={item}>{item}</div>);
}
```

Agar:

```js
items = ["Apple", "Banana", "Mango"];
```

to React approximately ye render karega:

```jsx
<div>Apple</div>
<div>Banana</div>
<div>Mango</div>
```

---

# 18. `filter()`

Dragged item ko original list se remove karne ke liye:

```js
setItems((prev) => prev.filter((currentItem) => currentItem !== item));
```

Example:

```text
Before:

["Apple", "Banana", "Mango"]
```

Apple drag kiya.

```text
After:

["Banana", "Mango"]
```

`filter()` new array return karta hai.

---

# 19. Spread Operator `...prev`

New item ko existing state mein add karne ke liye:

```js
setDroppedItems((prev) => [...prev, item]);
```

Suppose:

```js
prev = ["Apple"];
item = "Banana";
```

Result:

```js
[...["Apple"], "Banana"];
```

Result:

```js
["Apple", "Banana"];
```

---

# 20. `effectAllowed`

Drag source par:

```js
e.dataTransfer.effectAllowed = "move";
```

Ye browser ko batata hai ki drag operation ka intended effect `move` hai.

Common values:

```text
copy
move
link
none
```

Example:

```js
e.dataTransfer.effectAllowed = "move";
```

---

# 21. `dropEffect`

Destination par:

```js
e.dataTransfer.dropEffect = "move";
```

Ye batata hai ki drop operation ka intended effect kya hai.

Example:

```js
const handleDragOver = (e) => {
  e.preventDefault();

  e.dataTransfer.dropEffect = "move";
};
```

Basic difference:

```text
effectAllowed
      ↓
Source kya operation allow karta hai?

dropEffect
      ↓
Destination par kaunsa operation hoga?
```

---

# 22. `onDragEnd`

Drag operation complete hone ke baad `onDragEnd` fire hota hai.

```jsx
<div draggable={true} onDragEnd={handleDragEnd}>
  Apple
</div>
```

```js
const handleDragEnd = () => {
  console.log("Drag finished");
};
```

Iska use cleanup ke liye kiya ja sakta hai.

---

# 23. `onDragEnter`

Jab dragged element kisi drop area mein enter karta hai:

```jsx
onDragEnter = { handleDragEnter };
```

Example:

```js
const handleDragEnter = () => {
  console.log("Drag entered");
};
```

Useful for highlighting the drop area.

---

# 24. `onDragLeave`

Jab dragged element drop area se bahar nikalta hai:

```jsx
onDragLeave = { handleDragLeave };
```

Example:

```js
const handleDragLeave = () => {
  console.log("Drag left");
};
```

---

# 25. Drop Zone Highlighting

Example:

```jsx
const [isDraggingOver, setIsDraggingOver] = useState(false);
```

Then:

```jsx
<div
  onDragEnter={() => setIsDraggingOver(true)}
  onDragLeave={() => setIsDraggingOver(false)}
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    setIsDraggingOver(false);
    handleDrop(e);
  }}
>
  Drop Here
</div>
```

Concept:

```text
Drag enters
    ↓
isDraggingOver = true
    ↓
Change UI

Drag leaves
    ↓
isDraggingOver = false
```

---

# 26. Transfer ID Instead of Text

Real applications mein usually item ka text transfer nahi karte.

Bad approach:

```js
e.dataTransfer.setData("text/plain", item.name);
```

Better approach:

```js
e.dataTransfer.setData("itemId", item.id);
```

Example object:

```js
const item = {
  id: 101,
  name: "Apple",
};
```

Store:

```js
e.dataTransfer.setData("itemId", item.id);
```

Retrieve:

```js
const itemId = e.dataTransfer.getData("itemId");
```

Then state se actual item find kar sakte ho.

---

# 27. Dragging Objects

Suppose:

```js
const items = [
  {
    id: 1,
    name: "Apple",
  },
  {
    id: 2,
    name: "Banana",
  },
  {
    id: 3,
    name: "Mango",
  },
];
```

Drag:

```jsx
onDragStart={(e) =>
  handleDragStart(e, item)
}
```

Function:

```js
const handleDragStart = (e, item) => {
  e.dataTransfer.setData("itemId", String(item.id));
};
```

Drop:

```js
const itemId = e.dataTransfer.getData("itemId");
```

Then:

```js
const item = items.find((item) => item.id === Number(itemId));
```

This is closer to real-world applications.

---

# 28. Multiple Drop Zones

Drag and Drop ka next level multiple drop zones hain.

Example:

```text
TODO              IN PROGRESS          DONE

Task 1            Task 3               Task 5
Task 2            Task 4
```

User:

```text
Task 1
   ↓
IN PROGRESS
```

To application ko pata hona chahiye:

```text
Which item?
     +
Which drop zone?
```

---

# 29. Reordering

Drag and Drop ka important use case list reordering hai.

Before:

```text
Apple
Banana
Mango
Orange
```

Mango ko Apple ke upar drag karne par:

```text
Mango
Apple
Banana
Orange
```

Iske liye concepts:

```text
draggedIndex
targetIndex
array manipulation
```

samajhna important hai.

---

# 30. Drag and Drop with API

Real application mein drag hone ke baad backend ko bhi update karna pad sakta hai.

Example:

```text
Frontend
   ↓
Drag Task
   ↓
Drop into DONE
   ↓
Update React State
   ↓
API Request
   ↓
Backend
   ↓
Database
```

Example API:

```js
await axios.put(`/tasks/${taskId}`, {
  status: "DONE",
});
```

---

# 31. Native Drag and Drop vs Library

React mein Drag and Drop do ways se implement kar sakte ho.

## Native HTML5 API

```text
draggable
onDragStart
onDragOver
onDrop
dataTransfer
```

Advantages:

- Browser built-in
- No extra dependency
- Basic drag-and-drop ke liye useful

---

## React Drag and Drop Libraries

Advanced applications ke liye libraries use ki ja sakti hain.

Examples:

```text
dnd-kit
react-dnd
```

Lekin library use karne se pehle native Drag and Drop ka basic concept samajhna useful hai.

---

# 32. Important Properties

Drag and Drop ke liye:

```js
e.target;
e.currentTarget;
e.dataTransfer;
```

DataTransfer ke liye:

```js
e.dataTransfer.setData();
e.dataTransfer.getData();
e.dataTransfer.effectAllowed;
e.dataTransfer.dropEffect;
```

Mouse position ke liye advanced cases mein:

```js
e.clientX;
e.clientY;
```

use kiya ja sakta hai.

---

# 33. Complete Drag and Drop Flow

```text
                DRAGGABLE
                    │
                    ↓
              onDragStart
                    │
                    ↓
               setData()
                    │
                    ↓
              dataTransfer
                    │
                    ↓
             Dragging...
                    │
                    ↓
               onDragOver
                    │
                    ↓
             preventDefault()
                    │
                    ↓
                 onDrop
                    │
                    ↓
               getData()
                    │
                    ↓
              Update State
                    │
                    ↓
             React Re-render
                    │
                    ↓
              Updated UI
```

---

# 34. Learning Roadmap

Drag and Drop ko is order mein learn karo:

## Level 1: Basic

Learn:

```text
draggable
onDragStart
onDragEnd
```

---

## Level 2: Drop

Learn:

```text
onDragOver
onDrop
preventDefault()
```

---

## Level 3: Data Transfer

Learn:

```text
dataTransfer
setData()
getData()
```

---

## Level 4: React State

Learn:

```text
useState
map()
filter()
spread operator
```

---

## Level 5: Multiple Drop Zones

Learn:

```text
Item identify karna
Drop zone identify karna
State update karna
```

---

## Level 6: Reordering

Learn:

```text
draggedIndex
targetIndex
Array reordering
```

---

## Level 7: UI Feedback

Learn:

```text
onDragEnter
onDragLeave
onDragOver
Conditional styling
```

---

## Level 8: Real Application

Learn:

```text
Object IDs
API integration
Backend update
Database update
```

---

## Level 9: Libraries

Finally learn:

```text
dnd-kit
react-dnd
```

---

# 35. Practice Project

Best practice project:

## Kanban Board

Create:

```text
TODO
IN PROGRESS
DONE
```

Example:

```text
┌─────────────┐
│    TODO     │
├─────────────┤
│ Task 1      │
│ Task 2      │
│ Task 3      │
└─────────────┘

       ↓ Drag

┌─────────────┐
│ IN PROGRESS │
├─────────────┤
│ Task 2      │
└─────────────┘

       ↓ Drag

┌─────────────┐
│    DONE     │
├─────────────┤
│ Task 2      │
└─────────────┘
```

Is project mein tum practice karoge:

```text
draggable
onDragStart
onDragOver
onDrop
dataTransfer
useState
map
filter
IDs
Multiple drop zones
Reordering
Conditional rendering
API integration
```

---

# 36. Most Important Concepts

Agar short mein yaad rakhna hai:

```text
draggable
    ↓
Element ko drag karne allow karta hai

onDragStart
    ↓
Drag start hone par execute hota hai

setData()
    ↓
Drag data store karta hai

onDragOver
    ↓
Drop area ke upar dragging ke time execute hota hai

preventDefault()
    ↓
Drop allow karta hai

onDrop
    ↓
Drop hone par execute hota hai

getData()
    ↓
Stored drag data retrieve karta hai

setState()
    ↓
React UI update karta hai
```

---

# 37. One-Line Revision

```text
draggable
→ Element ko drag karo

onDragStart
→ Drag start hua

setData()
→ Data store karo

onDragOver
→ Drop area par aaye

preventDefault()
→ Drop allow karo

onDrop
→ Item drop hua

getData()
→ Data nikalo

setState()
→ React UI update karo
```

---

# 38. Final Mental Model

Drag and Drop ko is tarah imagine karo:

```text
SOURCE
┌─────────────┐
│    Apple    │
└─────────────┘
       │
       │ draggable
       ↓
  onDragStart
       │
       ↓
   setData()
       │
       ↓
  dataTransfer
       │
       │
       │ dragging
       ↓
DESTINATION
┌─────────────────┐
│    Drop Here    │
└─────────────────┘
       │
       ↓
   onDragOver
       │
       ↓
 preventDefault()
       │
       ↓
     onDrop
       │
       ↓
   getData()
       │
       ↓
  setDroppedItems()
       │
       ↓
   React re-render
```

**Core formula:**

```text
DRAG
  ↓
STORE DATA
  ↓
MOVE
  ↓
ALLOW DROP
  ↓
DROP
  ↓
GET DATA
  ↓
UPDATE STATE
  ↓
RENDER
```

Ye sequence samajh lena Drag and Drop ka foundation hai. Uske baad Kanban board aur reordering practice karoge to concept properly solid hoga.
