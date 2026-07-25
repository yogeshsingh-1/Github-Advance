| Feature             | `type`   | `interface`    |
| ------------------- | -------- | -------------- |
| Object define       | ✅       | ✅             |
| Extend kar sakte ho | ✅ (`&`) | ✅ (`extends`) |
| Declaration merging | ❌       | ✅             |
| Union (`\|`)        | ✅       | ❌             |
| Intersection (`&`)  | ✅       | ❌             |
| Primitive alias     | ✅       | ❌             |
| Tuple               | ✅       | ❌             |
| Function type       | ✅       | ✅             |

<!-- Union ya Complex Type ke liye → type -->

type Status = "Pending" | "Approved" | "Rejected";

type ID = string | number;

<!-- Tuple Ke liye -->

type Point = [number, number];

<!-- Intersection -->
type Person = {
  name: string;
};

type Employee = Person & {
  salary: number;
};

<!-- Declaration Merging (Sirf Interface) -->

interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "Yogesh",
  age: 25,
};

Type me ye error dega.


<!-- Function Type -->

type Sum = (a: number, b: number) => number;

interface Sum {
  (a: number, b: number): number;
}


<!-- Real Project Rule -->
interface use karo jab:
DTOs
Request/Response models
Database Models
Entity
Class implement karni ho
Object shape define karna ho

<!-- type use karo jab: -->
Union
Intersection
Primitive alias
Tuple
Utility types (Partial, Pick, Omit, Record, etc.)
Complex type expressions

