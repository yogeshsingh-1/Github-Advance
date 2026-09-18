async function paytmCheckout() {
  try {
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
      // merchant: {
      //   mid: "Resell00448805757124",
      //   redirect: false,
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

    console.log(config);

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
