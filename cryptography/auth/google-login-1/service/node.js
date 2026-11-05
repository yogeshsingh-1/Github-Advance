import fs from "node:fs";
const data = [
  {
    id: 1,
    name: "Yogesh Singh",
    email: "yogesh@example.com",
    age: 27,
    role: "admin",
    isActive: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    age: 25,
    role: "user",
    isActive: true,
  },
  {
    id: 3,
    name: "Priya Verma",
    email: "priya@example.com",
    age: 24,
    role: "user",
    isActive: true,
  },
  {
    id: 4,
    name: "Amit Kumar",
    email: "amit@example.com",
    age: 29,
    role: "user",
    isActive: false,
  },
  {
    id: 5,
    name: "Neha Gupta",
    email: "neha@example.com",
    age: 26,
    role: "user",
    isActive: true,
  },
  {
    id: 6,
    name: "Vikas Yadav",
    email: "vikas@example.com",
    age: 28,
    role: "moderator",
    isActive: true,
  },
  {
    id: 7,
    name: "Anjali Singh",
    email: "anjali@example.com",
    age: 23,
    role: "user",
    isActive: false,
  },
  {
    id: 8,
    name: "Rohit Mishra",
    email: "rohit@example.com",
    age: 30,
    role: "user",
    isActive: true,
  },
  {
    id: 9,
    name: "Sneha Patel",
    email: "sneha@example.com",
    age: 22,
    role: "user",
    isActive: true,
  },
  {
    id: 10,
    name: "Karan Singh",
    email: "karan@example.com",
    age: 27,
    role: "admin",
    isActive: true,
  },
];
fs.writeFileSync(
  "./user.json",
  JSON.stringify(
    data,
    (key, value) => {
        console.log(value)
      if (key === "id") {
        return crypto.randomUUID();
      }
      return value;
    },
    5,
  ),
);
