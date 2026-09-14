# Main minimum practical structure ye :

1. PaymentOrder Main collection

Ye customer ke payment order ko represent karegi.
PaymentOrder
├── orderId
├── userId
├── amount
├── currency
├── status
├── txnId
├── paymentMode
├── responseCode
├── responseMessage
├── createdAt
└── updatedAt

2. PaymentTransaction Recommended

Agar tum proper payment system bana rahe ho, transaction ko order se separate rakhna useful hai.

Ek order ke against multiple transaction attempts ho sakte hain.

PaymentTransaction
├── transactionId
├── orderId
├── userId
├── gateway
├── gatewayTransactionId
├── amount
├── status
├── paymentMethod
├── responseCode
├── responseMessage
├── gatewayResponse
├── createdAt
└── updatedAt

3. PaymentWebhook / PaymentCallback Recommended
   Paytm callback/webhook ka raw response separately store karna debugging aur reconciliation ke liye kaafi useful hai.

PaymentCallback
├── orderId
├── txnId
├── gateway
├── status
├── responseCode
├── responseMessage
├── payload
├── receivedAt
└── processedAt

4. Refund Only if your application supports refunds

Agar customer payment karne ke baad refund possible hai:

PaymentOrder
│
└── Refund
├── refundId
├── orderId
├── txnId
├── amount
├── status
├── gatewayRefundId
├── reason
├── createdAt
└── updatedAt

## Recommended architecture

                    ┌─────────────────┐
                    │     User        │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  PaymentOrder   │
                    │                 │
                    │ ORD_001         │
                    │ ₹500            │
                    │ PENDING         │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ PaymentTransaction│
                    │                 │
                    │ PAYTM           │
                    │ TXN_001         │
                    │ PENDING         │
                    └────────┬────────┘
                             │
                             ▼
                         Paytm
                             │
                             ▼
                    ┌─────────────────┐
                    │ PaymentCallback │
                    │                 │
                    │ TXN_SUCCESS     │
                    └────────┬────────┘
                             │
                             ▼
                    Transaction Status
                             │
                             ▼
                    ┌─────────────────┐
                    │ Update Transaction│
                    │ SUCCESS         │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Update Order    │
                    │ PAID/SUCCESS   │
                    └─────────────────┘
