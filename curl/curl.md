# CURL request

cURL ek command-line tool hai jiska use karke hum kisi server ko HTTP request bhej sakte hain aur uska response dekh sakte hain.

cURL request ko simple language mein samjho. Ye backend development mein APIs test karne ke kaam aati hai. Naam thoda ajeeb hai, kaam kaafi useful.

# Client server ko request kaise bhejega?

- Browser se bhej sakte ho.
- React frontend se bhej sakte ho.
- Postman se bhej sakte ho.
- Terminal se cURL ke through bhi bhej sakte ho.

# Step 1: Terminal open karo

curl https://httpbin.org/get

# Step 2: GET request bhejna

GET ka use server se data fetch karne ke liye hota hai.
curl -X GET https://httpbin.org/get

Yahan:

- curl request bhejne ka tool hai.
- -X GET HTTP method specify karta hai.
- URL batata hai ki request kahan bhejni hai.
  Note: -X GET likhna optional hai, kyunki cURL by default GET request bhejta hai.

# Step 3: POST request bhejna

Ab server ko data bhejte hain.

curl -X POST https://httpbin.org/post
-H "Content-Type: application/json"
-d "{\"name\":\"Yogesh\",\"age\":27}"

-X -> POST POST method use karo
-H -> HTTP header set karo
Content-Type: application/json Request body JSON format mein hai
-d -> Request body mein data bhejo

curl.exe -X POST "http://localhost:8001/auth/login" -d '{"Token":"123456","UserName":"cool_sharma12","Password":"12345"}'

curl -X POST "http://localhost:8001/auth/login" -H "Content-Type: application/json" -d "{\"Token\":\"123456\",\"UserName\":\"cool_sharma12\",\"Password\":\"12345\"}"
