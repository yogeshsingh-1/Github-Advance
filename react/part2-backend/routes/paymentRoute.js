import { Router } from "express";
import PaymentController from "../controller/paymentController.js";
const paytmRouter = Router();
const paymentController = new PaymentController();
// create Order
paytmRouter.post("/createOrder", paymentController.createOrder);
// Initiate callback by paytm
paytmRouter.post("/callback", paymentController.callBackRequest);

export default paytmRouter;
