
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  cardNo: {
    type: Number,
    required: true,
  },
  holderName: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },

});

export default mongoose.model("PaymentModel", paymentSchema);