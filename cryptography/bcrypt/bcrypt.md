# There are 2 two diffrent package for bcrypt.

1. bcrypt -> Node.js
2. bcryptjs -> In browser

Both packages are same. 
only bcrypt package behind the seen c++ ko use karta hai isiliye fast hota hai.
bcryptjs pure js use karta hai isiliye 30% slow hai.

Agar hum node.js mai use kar rhe hai toh hme bcrypt library ko use karna chaiye ye 30% fast rhegi.
Agar hum browser mai use kar rhe hai toh bcryptjs use karni chaiye.