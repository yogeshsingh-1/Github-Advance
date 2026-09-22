<!-- Paytm Payment gateway integration -->

# Architecture ->

PaymentOrder
PaymentTransaction
PaymentCallback

# Role of PaymentOrder model

Ye customer ne payment initiate kiya uska business-level record hai.

# Role of PaymentTransaction model

Ye actual gateway transaction attempt ko represent karega.

# Role of PaymentCallback model

Ye gateway se aane wale callback/webhook/response ka audit record hona chahiye.

# Package of using In Paytm Payment Gateway implementation

npm i paytm-pg-node-sdk paytmchecksum
