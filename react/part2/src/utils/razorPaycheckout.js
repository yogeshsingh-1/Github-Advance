import axiosInstance from "./axios";
async function razorPayCheckOut(e, amount) {
  try {
    debugger;
    const response = await axiosInstance.post("/payment/razorpay/createOrder", {
      amount,
    });
    console.log(response);
    debugger;
    const {
      id,
      amount: paymentAmount,
      currency,
      // status,
      // token,
    } = response.data;
    var options = {
      key: "rzp_test_TcQQ44qPAyI5QD", // Enter the Key ID generated from the Dashboard
      amount: paymentAmount, // Amount is in currency subunits.
      currency: currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:3000/payment/callback",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "<name>", //your customer's name
        email: "<email>",
        contact: "<phone>", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);

    rzp1.open();
    // e.preventDefault();
  } catch (e) {
    console.log(e);
  }
}
export default razorPayCheckOut;
