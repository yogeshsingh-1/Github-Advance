import { Router } from "express";
import PaymentController from "../controller/paymentController.js";
const paytmRouter = Router();
const paymentController = new PaymentController();
// create Order for paytm
paytmRouter.post(
  "/paytm/createOrder",
  paymentController.createPaytmPaymentOrder
);
// create order for razorpay
paytmRouter.post(
  "/razorpay/createOrder",
  paymentController.createRazorPayMentOrder
);
// Initiate callback by paytm
paytmRouter.post("/callback", paymentController.callBackRequest);

export default paytmRouter;
