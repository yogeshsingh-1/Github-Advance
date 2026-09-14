1. Main package

paytm-pg-node-sdk on npm

npm install paytm-pg-node-sdk

Ye Paytm ka Node.js server-side SDK hai. Isse tum payment APIs jaise transaction token/status/refund wale operations handle kar sakte ho. Paytm officially Node.js server-side SDK support karta hai.

2. Checksum package

Saath mein checksum ke liye:

paytmchecksum on npm

npm install paytmchecksum

Ye checksum generate aur verify karne ke liye hai.

Tumhare project mein roughly
React Frontend
↓
POST /payment/paytm/initiate
↓
Node.js + Express
↓
paytm-pg-node-sdk
↓
Paytm Initiate Transaction API
↓
txnToken
↓
React
↓
Paytm Checkout
↓
Payment
↓
Backend
↓
Transaction Status API
↓
SUCCESS / FAILURE

Paytm ke documented flow mein backend Initiate Transaction API call karta hai, txnToken milta hai, payment hoti hai, aur uske baad Transaction Status API se verify karna chahiye.

Main tumhe ye 2 packages recommend karunga
npm install paytm-pg-node-sdk paytmchecksum

Aur React frontend mein paytm-pg-node-sdk install mat karna. SDK/API secret credentials backend par rahenge. Human beings ne payment credentials frontend mein daalne ki galti already kaafi baar ki hai, humein us glorious tradition ko continue nahi karna.

Tumhare Node + TypeScript + Express project ke liye next step directly paytm-pg-node-sdk se Initiate Transaction API implement karna hai.


# Understanding account credentials
Account credentials are available in your dashboard for both staging and production environments. These credentials consist of the following:

MID (Merchant ID) - This is a unique identifier provided by Paytm to every merchant. MID is part of your account credentials and is different in staging and production environments. Your staging MID is available here and production MID will be available once your activation is complete.

Merchant Key - This is a unique secret key used for secure encryption of every request. This needs to be kept on server-side and should not be shared with anyone.