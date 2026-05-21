import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    parts: [
      {
        name: String,
        price: Number,
      },
    ],
    laborCost: Number,
    tax: Number,
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);