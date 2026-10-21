import Razorpay from "razorpay";

const rzpInstance = new Razorpay({
  key_id: "rzp_live_REcRBWIS2B3SSa",
  key_secret: "NV27e6orRMLJ6j99LvVnCblh",
});

Razorpay.validateWebhookSignature();

const subscription =
  await rzpInstance.subscriptions.pause("sub_RQCnPpjyf8sUZX");

console.log(subscription);
