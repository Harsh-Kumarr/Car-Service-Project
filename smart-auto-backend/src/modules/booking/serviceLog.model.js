import mongoose from "mongoose";

const serviceLogSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  updates: [
    {
      status: String,
      note: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model("ServiceLog", serviceLogSchema);