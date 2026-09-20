import axiosInstance from "./axios";
async function paytmCheckout(amount) {
  try {
    debugger;
    // 2. Create payment order on backend
    const response = await axiosInstance.post("/payment/paytm/createOrder", {
      amount,
    });
    const { orderId, txnToken, amount: paymentAmount } = response.data;
    debugger;
    // 3. Prepare Paytm Checkout configuration
    const config = {
      root: "",

      flow: "DEFAULT",

      data: {
        orderId,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: String(paymentAmount),
      },
      // payMode: {
      //   order: ["UPI", "CARD"],
      //   //  order: ["UPI", "CARD", "NET_BANKING","WALLET","EMI"],
      // },
      // payMode: {
      //   filter: {
      //     include: ["UPI", "CARD"],
      //     exclude: ["NET_BANKING"],
      //   },
      //   order: ["UPI", "CARD"],
      // },
      // payMode: {
      //   filter: {
      //     exclude: ["NET_BANKING", "EMI"],
      //   },
      //   order: ["UPI", "CARD"],
      // },
      handler: {
        transactionStatus: function (paymentStatus) {
          console.log("Transaction Status:", paymentStatus);
        },

        notifyMerchant: function (eventName, data) {
          console.log("Paytm Event:", eventName);
          console.log("Paytm Data:", data);
        },
      },
    };

    // console.log(config);

    // 4. Initialize Paytm Checkout
    await window.Paytm.CheckoutJS.init(config);

    // 5. Open Paytm Checkout
    window.Paytm.CheckoutJS.invoke();
  } catch (e) {
    console.error(
      "Paytm Payment Error:",
      error.response?.data || error.message
    );
  }
}

export default paytmCheckout;
