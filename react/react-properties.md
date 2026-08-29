# e.target.scrollHeight

Element ke andar ka total content height batata hai, including wo content jo currently visible nahi hai.

# e.target.scrollLeft

Ye scrollHeight ka horizontal version hai.

Element ke andar ka total content width.

# e.target.scrollTop

Ye batata hai ki element vertically kitna scroll ho chuka hai.

Initialy ye batata hai ki
Initial position: 0
100px down:

scrollTop = 100

# e.target.scrollLeft

Ye batata hai ki element horizontally kitna scroll ho chuka hai.

←─────────────── 300px visible ───────────────→

┌───────────────────────────────────────────────┐
│ content │
└───────────────────────────────────────────────┘
→
scroll

# e.target.clientHeight

ye element ke visible/inner area ki height batata hai, pixels (px) mein.

| Property       | Meaning                                      | Direction     |
| -------------- | -------------------------------------------- | ------------- |
| `scrollHeight` | Total content ki height (visble + unvisible) | ↕️ Vertical   |
| `scrollTop`    | Kitna vertically scroll hua                  | ↕️ Vertical   |
| `scrollWidth`  | Total content ki width                       | ↔️ Horizontal |
| `scrollLeft`   | Kitna horizontally scroll hua                | ↔️ Horizontal |

# e.target.clientHeight

Element ke andar ka visible height batata hai.
Isme generally:

✅ content
✅ padding
❌ border

# e.target.clientWidth

Element ke andar ka visible width batata hai.

Isme generally:

✅ content
✅ padding
❌ border

include hota hai.

# e.target.clientTop

Ye element ke top border ki width batata hai.

clientTop top se element ke bahar ki distance nahi hai. Ye top border ki thickness hai.

# e.target.clientLeft

Ye element ke left border ki width batata hai.

| Property       | Value | Meaning                          |
| -------------- | ----: | -------------------------------- |
| `clientHeight` | `300` | Inner visible height = **300px** |
| `clientWidth`  | `385` | Inner visible width = **385px**  |
| `clientTop`    |   `2` | Top border = **2px**             |
| `clientLeft`   |   `2` | Left border = **2px**            |

clientHeight → element ki andar wali height
clientWidth → element ki andar wali width

clientTop → top border ki thickness
clientLeft → left border ki thickness

# e.target.draggable  -> true/false
Batata hai ki jis HTML element par event hua hai, kya us element ko drag kiya ja sakta hai ya nahi.