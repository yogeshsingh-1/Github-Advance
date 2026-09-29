# Paytm UPI Payment Channels: Collect, Intent, and Push

## 1. Introduction

UPI is a payment method that lets a customer pay directly from a bank account using a UPI-enabled app.

In a payment integration, the customer may complete a UPI payment through different flows. **UPI Collect**, **UPI Intent**, and **UPI Push** are terms used to describe these flows, but their exact meaning can vary by payment provider and integration.

For Paytm, always verify the channel names and behavior against the documentation for your specific integration and merchant account.

## 2. UPI Collect

In a UPI Collect flow, the customer provides a UPI ID (also called a VPA). A payment request is sent to that UPI address, and the customer approves it in their UPI app.

### Typical flow

1. The customer selects UPI Collect at checkout.
2. The customer enters their UPI ID.
3. A collect request is sent to the customer's UPI app.
4. The customer reviews and approves the request.
5. The customer authorizes the payment, for example with their UPI PIN.
6. The payment result is returned to the merchant.

**Key point:** The merchant initiates a request to the customer's UPI ID, and the customer approves it.

## 3. UPI Intent

In a UPI Intent flow, the merchant's website or app launches a compatible UPI app on the customer's device.

### Typical flow

1. The customer selects UPI at checkout.
2. The customer chooses a supported UPI app, or the device opens an available app.
3. The UPI app opens with the payment details pre-filled.
4. The customer checks the details and authorizes the payment.
5. The customer returns to the merchant app or website.
6. The merchant verifies the final payment status with the payment provider.

**Key point:** The customer is taken to a UPI app to authorize the payment. They usually do not need to type their UPI ID into the merchant checkout.

## 4. UPI Push

“UPI Push” is used inconsistently across payment documentation, so do not assume it always means a separate checkout channel.

In the general UPI sense, a payer-initiated payment is one where the customer starts the payment from their own UPI app. For example, the customer may scan a merchant QR code or enter the merchant's UPI ID in their app.

However, **Paytm uses specific API channel names**, and `UPIPUSH` may refer to a particular supported flow in that API. Do not infer its exact behavior from the phrase “UPI Push” alone.

## 5. Comparison

| Feature | UPI Collect | UPI Intent | Customer-initiated UPI payment |
|---|---|---|---|
| Who starts the flow? | Merchant sends a request | Merchant checkout launches a UPI app | Customer starts in their UPI app |
| UPI ID entry at checkout | Usually required | Usually not required | Not necessarily |
| UPI app used | Customer approves the request in an app | App is opened through the intent flow | Customer opens or uses their app |
| Typical example | Enter UPI ID, then approve request | Select PhonePe/GPay and authorize | Scan a merchant QR code in a UPI app |

The last column describes a general customer-initiated UPI payment, not necessarily a distinct Paytm API channel.

## 6. What do `mode` and `channel` mean in Paytm?

- `mode` identifies the broad payment method, such as `UPI`.
- `channels` can be used to restrict which supported channel(s) are available within a mode, where the relevant Paytm API supports this.

Illustrative example:

```typescript
enablePaymentMode: [
    {
        mode: "UPI",
        channels: ["UPIPUSH"]
    }
]
```

This requests that UPI be enabled with the specified channel. It does **not** by itself prove what user experience that channel will produce. Confirm the accepted value and behavior in the documentation for your Paytm product and test it in staging.

## 7. Implementation notes

1. Use only channel values supported by your Paytm integration.
2. Do not assume that channel names are interchangeable across payment gateways.
3. Test the payment flow in staging with the merchant's actual configuration.
4. Verify the final payment status on the backend. Do not treat a browser redirect alone as proof of successful payment.
5. Keep payment-mode restrictions on the backend, and generate the request checksum/signature according to Paytm's requirements.

## 8. Summary

- **UPI Collect:** Customer enters a UPI ID and approves a payment request.
- **UPI Intent:** Checkout opens a compatible UPI app for the customer to authorize payment.
- **UPI Push:** The term can mean a customer-initiated UPI payment generally, but Paytm's `UPIPUSH` is an API-specific channel value whose exact behavior must be verified.
- **`mode`:** The broad payment method, such as UPI.
- **`channel`:** A supported flow or channel within that payment method.

## References

- Paytm Initiate Transaction API: https://www.paytmpayments.com/docs/api/initiate-transaction-api
- Paytm JS Checkout documentation: https://www.paytmpayments.com/docs/jscheckout-initiate-payment
