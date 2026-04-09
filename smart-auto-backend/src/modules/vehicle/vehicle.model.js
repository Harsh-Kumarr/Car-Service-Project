import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🚗 VEHICLE DETAILS
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "cng", "electric", "hybrid"],
      required: true,
    },

    vin: {
      type: String, // chassis number
    },

    // 👤 OWNER DETAILS
    ownerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    alternatePhone: {
      type: String,
    },

    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);