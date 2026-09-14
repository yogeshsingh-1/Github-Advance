import mongoose, { Document, Schema } from "mongoose";

// export interface IPaymentCallback extends Document {
//   paymentOrderId: mongoose.Types.ObjectId;
//   paymentTransactionId?: mongoose.Types.ObjectId;

//   orderId: string;

//   gateway: "PAYTM";

//   status?: string;
//   txnId?: string;
//   txnAmount?: string;
//   paymentMode?: string;
//   responseCode?: string;
//   responseMessage?: string;

//   callbackData: Record<string, unknown>;

//   checksumVerified: boolean;
//   statusVerified: boolean;

//   receivedAt: Date;

//   createdAt: Date;
//   updatedAt: Date;
// }

const paymentCallbackSchema = new Schema(
  {
    paymentOrderId: {
      type: Schema.Types.ObjectId,
      ref: "PaymentOrder",
      required: true,
      index: true,
    },

    paymentTransactionId: {
      type: Schema.Types.ObjectId,
      ref: "PaymentTransaction",
      index: true,
    },

    orderId: {
      type: String,
      required: true,
      index: true,
    },

    gateway: {
      type: String,
      enum: ["PAYTM"],
      required: true,
      default: "PAYTM",
    },

    status: {
      type: String,
      trim: true,
    },

    txnId: {
      type: String,
      trim: true,
      index: true,
    },

    txnAmount: {
      type: String,
      trim: true,
    },

    paymentMode: {
      type: String,
      trim: true,
    },

    responseCode: {
      type: String,
      trim: true,
    },

    responseMessage: {
      type: String,
      trim: true,
    },

    callbackData: {
      type: Schema.Types.Mixed,
      required: true,
    },

    checksumVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    statusVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    receivedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const PaymentCallback = mongoose.model(
  "PaymentCallback",
  paymentCallbackSchema,
);

export default PaymentCallback;
