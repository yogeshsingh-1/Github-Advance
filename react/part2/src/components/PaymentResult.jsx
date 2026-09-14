const PaymentResult = () => {
  const params = new URLSearchParams(window.location.search);

  const status = params.get("status");
  const orderId = params.get("orderId");

  const success = status === "TXN_SUCCESS";

  return (
    <div>
      <h1>{success ? "Payment Successful" : "Payment Failed"}</h1>

      <p>Order ID: {orderId}</p>

      {success ? (
        <p>Your payment was successful.</p>
      ) : (
        <p>Your payment could not be completed.</p>
      )}
    </div>
  );
};

export default PaymentResult;
