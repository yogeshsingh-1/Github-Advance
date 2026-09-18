import Course from "../models/CourseModel.js";
import PaymentOrder from "../models/PaymentOrderModel.js";
import axios from "axios";
import PaytmChecksum from "paytmchecksum";
import PaymentTransaction from "../models/PaytmTransactionModel.js";
import PaymentCallback from "../models/PaymentCallbackModel.js";
import Razorpay from "razorpay";
// export default class PaymentController {

//   Mid = "Resell00448805757124";
//   Key = "KXHUJH&Ywq9pUkkr";
//   Website = "WEBSTAGING";
//   createOrder = async (req, res) => {
//     try {
//       console.log(req.body);
//       const amount = parseFloat(req.body?.amount) ?? 0;
//       console.log("amount", amount);
//       const orderId = `ord-${Date.now()}`;
//       await PaymentOrder.create({
//         orderId: orderId,
//         // userId: 1,
//         amount: amount,
//         currency: "INR",
//         status: "PENDING",
//         // Paytm details
//         txnToken: "",
//         txnId: "",
//         paymentMode: "ONLINE",
//         // responseCode: "200",
//         // responseMessage: string,
//         // Paytm callback data
//         callbackReceivedAt: Date.now(),
//       });
//       var custId = `CUST_${Date.now()}`;
//       var params = {};
//         /* initialize an array */
//         (params["MID"] = this.Mid),
//         (params["WEBSITE"] = "DEFAULT"),
//         (params["CHANNEL_ID"] = "WEB"),
//         (params["INDUSTRY_TYPE_ID"] = "Retail"),
//         (params["ORDER_ID"] = orderId),
//         (params["CUST_ID"] = custId),
//         (params["TXN_AMOUNT"] = amount),
//         (params["CALLBACK_URL"] = "http://localhost:3000/api/callback"),
//         (params["EMAIL"] = "ys3254287@gmail.com"),
//         (params["MOBILE_NO"] = "7498608775");

//       var paytmChecksum = await PaytmChecksum.generateSignature(params, this.Key);
//       let paytmParams = {
//         ...params,
//         CHECKSUMHASH: paytmChecksum,
//       };
//       return res.status(200).json(paytmParams);

//       // return res.status(200).json({
//       //   status: true,
//       //   msg: "success",
//       // });
//     } catch (e) {
//       throw e;
//     }
//   };
// }

// MID: pFlPqO65242180644612
// Test Key: pLQiACAYVH7Urbal

// test-apiKey = rzp_test_TcQQ44qPAyI5QD
// test-apiKeySecret = NDYsYge0yP5uT40V0DY28ubS
export default class PaymentController {
  Mid = "Resell00448805757124";
  Key = "KXHUJH&Ywq9pUkkr";
  Website = "WEBSTAGING";
  // Razorpay apiKey and apiSecret
  razorpayApiKey = "rzp_test_TcQQ44qPAyI5QD";
  razorpayApiKeySecret = "NDYsYge0yP5uT40V0DY28ubS";
  // Mid = "pFlPqO65242180644612";
  // Key = "pLQiACAYVH7Urbal";
  // Website = "WEBSTAGING";

  // https://github.com/razorpay/razorpay-node/releases/
  createRazorPayMentOrder = async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: this.razorpayApiKey,
        key_secret: this.razorpayApiKeySecret,
      });
      var options = {
        amount: 50000, // Amount is in currency subunits.
        currency: "INR",
        receipt: "order_rcptid_11",
        method: "netbanking" | "upi" | "card" | "emandate" | "nach",
      };
      const razorpayOrder = await razorpay.orders.create(options);
      const { id, amount_paid, status, token } = razorpayOrder;
      return { id, amount_paid, status, token };
    } catch (e) {
      throw e;
    }
  };

  createOrder = async (req, res) => {
    try {
      const { amount } = req.body;

      // 1. Validate amount
      if (!amount || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount",
        });
      }

      const finalAmount = Number(amount);
      console.log("MID:", this.Mid);
      console.log("KEY EXISTS:", !!this.Key);
      // 2. Generate our internal order ID
      const orderId = `ORD_${Date.now()}`;

      // 3. Generate customer ID
      const custId = `CUST_${Date.now()}`;

      /*
       * 4. Create our internal PaymentOrder
       */
      const paymentOrder = await PaymentOrder.create({
        orderId,
        amount: finalAmount,
        currency: "INR",
        status: "PENDING",
        paymentMode: "ONLINE",
      });

      /*
       * 5. Create Paytm request body
       */
      const body = {
        requestType: "Payment",
        mid: this.Mid,
        websiteName: "WEBSTAGING",
        orderId,
        callbackUrl: "http://localhost:3000/paytm/callback",
        txnAmount: {
          value: `${finalAmount.toFixed(2)}`,
          currency: "INR",
        },
        userInfo: {
          custId,
        },
      };

      /*
       * 6. Generate Paytm checksum/signature
       */
      const signature = await PaytmChecksum.generateSignature(
        JSON.stringify(body),
        this.Key
      );
      // o5j5zVOQAf1TewSDcEUSt8iYkFGnkK0OiUQGnzyyaVI880owVJa48U4CuTbHq0MSTdXBaXb2J35nY9jGIXmBmp0aANosFMw5xdHKxC8I7o8=

      // 0wu/prkvBbT9IwGOX9DeAWk6D/l8hEM9Z6/eAb1byK/gatjIQzhyGgbgPSEdodxSMHyyLjJlf3gnqwPQDnmM6BQPFGnLYyJcdOVQo63x+7s=

      /*
       * 7. Create final Paytm request
       */
      const paytmRequest = {
        body,
        head: {
          signature,
        },
      };

      /*
       * 8. Call Paytm Initiate Transaction API
       */
      const PAYTM_INITIATE_TRANSACTION_URL = `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${this.Mid}&orderId=${orderId}`;

      const response = await axios.post(
        PAYTM_INITIATE_TRANSACTION_URL,
        paytmRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Paytm Response:", response.data);

      /*
       * 9. Get transaction token
       */
      const txnToken = response.data?.body?.txnToken;

      if (!txnToken) {
        console.error("Paytm did not return txnToken:", response.data);

        return res.status(502).json({
          success: false,
          message: "Failed to initialize Paytm transaction",
          paytmResponse: response.data,
        });
      }

      /*
       * 10. Save txnToken in our PaymentOrder
       */
      paymentOrder.txnToken = txnToken;

      await paymentOrder.save();

      /*
       * 11. Send only required information to frontend
       */
      return res.status(200).json({
        success: true,

        paymentOrderId: paymentOrder._id,

        orderId,

        amount: finalAmount.toFixed(2),
        txnToken,
      });
    } catch (error) {
      console.error("Create payment order error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  callBackRequest = async (req, res) => {
    try {
      const callbackData = Object.assign({}, req.body);

      const {
        ORDERID,
        STATUS,
        RESPMSG,
        RESPCODE,
        TXNAMOUNT,
        TXNID,
        PAYMENTMODE,
      } = callbackData;

      const paytmChecksum = callbackData.CHECKSUMHASH;

      // CHECKSUMHASH ko signature verification se pehle remove karo
      delete callbackData.CHECKSUMHASH;

      // 1. Verify Paytm checksum
      const isVerifySignature = PaytmChecksum.verifySignature(
        callbackData,
        this.Key,
        paytmChecksum
      );

      if (!isVerifySignature) {
        console.log("Checksum verification failed");

        await PaymentOrder.updateOne(
          { orderId: ORDERID },
          {
            $set: {
              status: "FAILED",
              responseCode: RESPCODE,
              responseMessage: "Invalid Paytm checksum",
              callbackReceivedAt: new Date(),
            },
          }
        );

        return res.status(400).json({
          success: false,
          message: "Invalid checksum",
        });
      }

      console.log("Checksum Matched");

      // 2. Find PaymentOrder
      const order = await PaymentOrder.findOne({
        orderId: ORDERID,
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Payment order not found",
        });
      }

      // 3. Verify amount
      if (Number(TXNAMOUNT) !== Number(order.amount)) {
        console.log("Payment amount mismatch");

        // Refund Paytm payment
        const refund = await initiatePaytmRefund({
          orderId: ORDERID,
          txnId: TXNID,
          refundAmount: TXNAMOUNT,
        });

        console.log("Refund initiated:", refund);

        await PaymentOrder.updateOne(
          { _id: order._id },
          {
            $set: {
              status: "REFUND_PENDING",
              txnId: TXNID,
              responseCode: RESPCODE,
              responseMessage: "Payment amount mismatch. Refund initiated.",
              callbackReceivedAt: new Date(),
            },
          }
        );

        return res.redirect(
          `http://localhost:5173/payment-result?orderId=${ORDERID}&status=refund_pending`
        );
      }
      // 4. Insert PaymentTransaction
      const paymentTransaction = await PaymentTransaction.create({
        transactionId: TXNID,
        paymentOrderId: order._id,

        // Agar userId PaymentOrder mein hai
        userId: order.userId,

        gateway: "PAYTM",

        gatewayTransactionId: TXNID,

        amount: Number(TXNAMOUNT),

        currency: "INR",

        status: STATUS === "TXN_SUCCESS" ? "SUCCESS" : "FAILED",

        paymentMethod: PAYMENTMODE,

        responseCode: RESPCODE,

        responseMessage: RESPMSG,

        gatewayResponse: callbackData,
      });

      // 5. Update PaymentOrder
      await PaymentOrder.updateOne(
        {
          _id: order._id,
        },
        {
          $set: {
            status: STATUS === "TXN_SUCCESS" ? "SUCCESS" : "FAILED",

            txnId: TXNID,

            paymentMode: PAYMENTMODE,

            responseCode: RESPCODE,

            responseMessage: RESPMSG,

            callbackReceivedAt: new Date(),
          },
        }
      );

      // 6. Store callback for audit/debugging
      await PaymentCallback.create({
        paymentOrderId: order._id,

        paymentTransactionId: paymentTransaction._id,

        orderId: ORDERID,

        gateway: "PAYTM",

        status: STATUS,

        txnId: TXNID,

        txnAmount: TXNAMOUNT,

        paymentMode: PAYMENTMODE,

        responseCode: RESPCODE,

        responseMessage: RESPMSG,

        callbackData,

        checksumVerified: true,

        statusVerified: false,

        receivedAt: new Date(),
      });

      // 7. Redirect frontend
      const queryParams = new URLSearchParams({
        orderId: ORDERID,
        status: STATUS,
        message: RESPMSG,
      });

      return res.redirect(
        `http://localhost:5173/payment-result?${queryParams.toString()}`
      );
    } catch (error) {
      console.error("Paytm callback error:", error);

      return res.status(500).json({
        success: false,
        message: "Payment callback processing failed",
      });
    }
  };

  //  initiatePaytmRefund = async ({
  // //   orderId,
  // //   txnId,
  // //   refundAmount,
  // // }: {
  // //   orderId: string;
  // //   txnId: string;
  // //   refundAmount: string;
  // // }) => {
  // //   const refId = `REF_${Date.now()}`;

  // //   const body = {
  // //     mid: process.env.PAYTM_MID,
  // //     txnType: "REFUND",
  // //     orderId,
  // //     txnId,
  // //     refId,
  // //     refundAmount: Number(refundAmount).toFixed(2),
  // //   };

  // //   const signature = await PaytmChecksum.generateSignature(
  // //     JSON.stringify(body),
  // //     process.env.PAYTM_KEY!,
  // //   );

  // //   const requestBody = {
  // //     body,
  // //     head: {
  // //       signature,
  // //     },
  // //   };

  // //   const url =
  // //     `https://securegw-stage.paytm.in/refund/api/v1/async/refund` +
  // //     `?mid=${process.env.PAYTM_MID}` +
  // //     `&orderId=${orderId}`;

  // //   const response = await axios.post(url, requestBody, {
  // //     headers: {
  // //       "Content-Type": "application/json",
  // //     },
  // //   });

  // //   return {
  // //     refId,
  // //     response: response.data,
  // //   };
  // // };
}

// Mobile:   77777 77777
// Password: Paytm12345
// OTP:      489871

// {
//     "success": true,
//     "paymentOrderId": "6aa7a9126f39a71ab47f9dc3",
//     "orderId": "ORD_1789372690888",
//     "amount": 8998,
//     "paytmRequest": {
//         "body": {
//             "requestType": "Payment",
//             "mid": "Resell00448805757124",
//             "websiteName": "WEBSTAGING",
//             "orderId": "ORD_1789372690888",
//             "callbackUrl": "http://localhost:3000/payment/callback",
//             "txnAmount": {
//                 "value": "8998.00",
//                 "currency": "INR"
//             },
//             "userInfo": {
//                 "custId": "CUST_1789372690888"
//             }
//         },
//         "head": {
//             "signature": "UlV9UCohaae/3gYKMZjIpdtPHXQzxDVWAyUqSfjgwVpi4Q4nueWZDKVdqvmIozDdw3YUG4OVVypgNqNoGMqgzccfcrc+9htKIxLDE+280U8="
//         }
//     }
// }
