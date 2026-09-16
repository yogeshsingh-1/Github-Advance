// try {

//   // const { orderId, txnToken, amount: paymentAmount } = response.data;
//   const { OrderId, TxnToken, Amount: paymentAmount } = response.data;
//   // 3. Prepare Paytm Checkout configuration
//   const config = {
//     root: "",

//     flow: "DEFAULT",

//     data: {
//       OrderId,
//       token: TxnToken,
//       tokenType: "TXN_TOKEN",
//       amount: paymentAmount.toString(),
//     },

//     handler: {
//       notifyMerchant: (eventName, data) => {
//         console.log("Paytm Event:", eventName);
//         console.log("Paytm Data:", data);
//       },
//     },
//   };

//   // 4. Initialize Paytm Checkout
//   await window.Paytm.CheckoutJS.init(config);

//   // 5. Open Paytm Checkout
//   window.Paytm.CheckoutJS.invoke();
// } catch (error) {
//   console.error("Paytm Payment Error:", error.response?.data || error.message);
// }
const a = 9999;

console.log(a.toFixed(5));
// <!-- <script
//   type="application/javascript"
//   crossorigin="anonymous"
//   src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/YOUR_MID.js"
// ></script> -->
// <!-- <script
//   type="application/javascript"
//   src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/${merchantId}.js"
//   crossorigin="anonymous"
// ></script> -->
// <!-- 
// <script type="application/javascript" src="{HOST}/merchantpgpui/checkoutjs/merchants/{MID}.js" onload="onScriptLoad();" crossorigin="anonymous"></script>
// <script> --></script>