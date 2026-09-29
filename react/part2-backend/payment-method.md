# Paytm Payment Mode and Channel Documentation

## 1. Introduction

Paytm Payment Gateway provides different payment methods through which customers can pay for an order.

During payment integration, we can control which payment methods are available to customers using the following parameters:

* `enablePaymentMode`
* `disablePaymentMode`

These parameters are passed in the request body of the **Initiate Transaction API**.

Official Documentation: [Paytm Initiate Transaction API](https://www.paytmpayments.com/docs/api/initiate-transaction-api)

## 2. What is Payment Mode?

A payment mode represents the type of payment method selected by the customer.

For example, a customer can pay using UPI, a credit card, a debit card, or net banking.

### Supported Payment Modes

| Mode                   | Description                          |
| ---------------------- | ------------------------------------ |
| `UPI`                  | Unified Payments Interface           |
| `CREDIT_CARD`          | Credit card payment                  |
| `DEBIT_CARD`           | Debit card payment                   |
| `NET_BANKING`          | Payment through internet banking     |
| `EMI`                  | Payment through eligible EMI options |
| `BALANCE`              | Paytm Wallet                         |
| `PPBL`                 | Paytm Payments Bank                  |
| `PAYTM_DIGITAL_CREDIT` | Paytm Postpaid                       |

The availability of these modes depends on the merchant account, Paytm configuration, and the payment flow being used.

## 3. What is a Payment Channel?

A payment channel represents a specific way of processing a payment within a payment mode.

For example, UPI supports different channels, such as UPI Collect and UPI Intent and UPI Push.

### Supported Channels

| Payment Mode | Channel          | Description              |
| ------------ | ---------------- | ------------------------ |
| UPI          | `UPI`            | UPI Collect              |
| UPI          | `UPIPUSH`        | UPI Intent               |
| UPI          | `UPIPUSHEXPRESS` | UPI Push                 |
| Credit Card  | `VISA`           | Visa card network        |
| Credit Card  | `MASTER`         | Mastercard network       |
| Credit Card  | `AMEX`           | American Express network |
| Debit Card   | `VISA`           | Visa card network        |
| Debit Card   | `MASTER`         | Mastercard network       |
| Debit Card   | `AMEX`           | American Express network |

For Net Banking, Paytm also supports bank-specific restrictions through the `banks` parameter.

**Note:** The exact availability of channels and banks depends on Paytm's current integration and merchant configuration.

## 4. Difference Between Mode and Channel

Consider the following example:

```json
{
  "mode": "UPI",
  "channels": ["UPIPUSH"]
}
```

In this example:

* `mode: "UPI"` specifies the payment method.
* `channels: ["UPIPUSH"]` restricts the UPI payment method to the specified channel.

Therefore, the mode defines the payment category, while the channel defines the supported payment option within that category.

## 5. What is enablePaymentMode?

The `enablePaymentMode` parameter specifies which payment modes should be available to customers.

If this parameter is provided, only the listed payment modes and their specified restrictions are available for the transaction.

### Example 1: Allow Only UPI

```json
{
  "enablePaymentMode": [
    {
      "mode": "UPI"
    }
  ]
}
```

**Result:** Only UPI is enabled through this configuration.

### Example 2: Allow Only UPI Intent

```json
{
  "enablePaymentMode": [
    {
      "mode": "UPI",
      "channels": ["UPIPUSH"]
    }
  ]
}
```

**Result:** UPI is restricted to the specified `UPIPUSH` channel.

### Example 3: Allow UPI and Cards

```json
{
  "enablePaymentMode": [
    {
      "mode": "UPI"
    },
    {
      "mode": "CREDIT_CARD"
    },
    {
      "mode": "DEBIT_CARD"
    }
  ]
}
```

**Result:** UPI, credit cards, and debit cards are enabled. Other payment modes are not included in the allowed list.

## 6. What is disablePaymentMode?

The `disablePaymentMode` parameter specifies which payment modes should be unavailable for a transaction.

### Example 1: Disable Net Banking

```json
{
  "disablePaymentMode": [
    {
      "mode": "NET_BANKING"
    }
  ]
}
```

**Result:** Net Banking is disabled for the transaction.

### Example 2: Disable EMI

```json
{
  "disablePaymentMode": [
    {
      "mode": "EMI"
    }
  ]
}
```

**Result:** EMI is disabled.

### Example 3: Disable Net Banking and EMI

```json
{
  "disablePaymentMode": [
    {
      "mode": "NET_BANKING"
    },
    {
      "mode": "EMI"
    }
  ]
}
```

**Result:** Net Banking and EMI are disabled. Other eligible payment modes may remain available.

## 7. How to Disable a Specific Channel

We can also disable a particular channel without disabling the entire payment mode.

### Example: Disable UPI Intent

```json
{
  "disablePaymentMode": [
    {
      "mode": "UPI",
      "channels": ["UPIPUSH"]
    }
  ]
}
```

**Result:** The specified UPI channel is disabled, while other eligible UPI channels may remain available.

This is useful when we want to restrict a specific payment option rather than disabling the complete payment method.

## 8. Complete Integration Example

The following example shows how payment mode restrictions can be added to the Initiate Transaction API request.

```typescript
const paytmParams = {
    body: {
        requestType: "Payment",
        mid: MID,
        websiteName: "WEBSTAGING",
        orderId: orderId,

        txnAmount: {
            value: amount.toFixed(2),
            currency: "INR"
        },

        userInfo: {
            custId: String(tenantId)
        },

        // Allow only UPI and card payments
        enablePaymentMode: [
            {
                mode: "UPI"
            },
            {
                mode: "CREDIT_CARD"
            },
            {
                mode: "DEBIT_CARD"
            }
        ]
    }
};
```

The backend must generate the request signature using the complete request body according to Paytm's checksum documentation.

## 9. Important Points

1. `enablePaymentMode` is used to allow specific payment modes.
2. `disablePaymentMode` is used to block specific payment modes.
3. `mode` identifies the payment method.
4. `channels` restricts the available payment channels within a mode.
5. If `enablePaymentMode` is provided, only the listed payment modes are available.
6. Payment restrictions should be configured on the backend.
7. Payment methods and channels must be tested using the appropriate Paytm staging credentials.
8. The final availability of a payment option depends on Paytm's merchant configuration and supported payment flow.

## 10. Conclusion

Payment mode and channel restrictions allow merchants to control the payment options available to customers.

For example, an ERP subscription system can use `enablePaymentMode` to allow UPI and card payments while excluding other payment modes.

Similarly, `disablePaymentMode` can be used to disable specific payment methods or channels without changing the overall payment integration.

These configurations are passed through the Initiate Transaction API and are handled by Paytm's payment gateway.
