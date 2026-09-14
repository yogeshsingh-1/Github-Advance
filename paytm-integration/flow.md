1. Customer clicks Pay
   ↓
2. Backend creates unique OrderId
   ↓
3. Backend stores order as PENDING
   ↓
4. Backend calls Paytm Initiate Transaction API
   ↓
5. Paytm returns txnToken
   ↓
6. Backend sends txnToken to frontend
   ↓
7. Frontend opens Paytm Checkout
   ↓
8. Customer completes payment
   ↓
9. Paytm sends callback
   ↓
10. Backend verifies checksum/response
    ↓
11. Backend calls Transaction Status API
    ↓
12. Verify amount + OrderId + status
    ↓
13. Update database
    ↓
14. If SUCCESS → PAID
    ↓
15. Fulfill order/service
