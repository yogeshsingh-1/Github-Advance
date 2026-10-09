import axiosInstance from "./axios";
async function paytmCheckout(amount) {
  try {
    debugger;
    // 2. Create payment order on backend
    // const response = await axiosInstance.post("/payment/paytm/createOrder", {
    //   amount,
    // });
    const response = await axiosInstance.post("/api/billing/payment-orders", {
      amount: 1000,
      UKey: "7504142759637422000",
      Mode: 1,
      TenantBillingDetails: {
        Name: "Anurag Nigam",
        Email: "ys3254287@gmail.com",
        Mobile: "4564464564",
        UserName: "cool_sharma12",
        ContactPerson: "456456",
        BillingAddress: "dfgdfg\n",
        City: "Lucknow",
        StateCode: "01",
        StateName: "Jammu And Kashmir",
        Pincode: "543534",
        CountryCode: "JI",
        CountryName: "India JI",
        GSTIN: "51323231321",
        TradeName: "Yogesh Singh",
      },
    });
    debugger;
    // const { orderId, txnToken, amount: paymentAmount } = response.data;
    const {
      OrderId: orderId,
      Amount: paymentAmount,
      TxnToken: txnToken,
    } = response.data.Data;
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
      error.response?.data || error.message,
    );
  }
}

export default paytmCheckout;
