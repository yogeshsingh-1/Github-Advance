<!-- MongoDB Driver kya hai? -->

MongoDB Driver ek library hai jo tumhari application aur MongoDB server ke beech communication karwati hai.

Simple words me:

MongoDB Driver = Translator between your application and MongoDB.

Node.js App
      │
      │ JavaScript
      ▼
MongoDB Driver
      │
      │ MongoDB Wire Protocol
      ▼
MongoDB Server

Without driver, Node.js ko pata hi nahi hota MongoDB se kaise baat karni hai.


<!-- Install Mongo Drive -->

npm i mongodb

Ye official MongoDB Driver hai.

<!-- Driver kya provide karta hai? -->

Is package me bahut saari classes hoti hain.

const { MongoClient } = require("mongodb");

Ya ES Module

import { MongoClient } from "mongodb";
MongoClient kya hai?

Ye MongoDB Driver ki class hai.

Iska kaam:

MongoDB se connection banana
Connection pool manage karna
Database select karna
Collections access karna