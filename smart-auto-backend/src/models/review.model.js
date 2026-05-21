import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      maxlength: 500,
    },
    serviceType: {
      type: String,
      default: "General",
    },
  },
  { timestamps: true }
);

// One review per user (can update later)
reviewSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
