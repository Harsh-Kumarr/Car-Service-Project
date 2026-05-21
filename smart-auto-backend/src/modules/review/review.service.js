import Review from "../../models/review.model.js";
import AppError from "../../utils/AppError.js";

class ReviewService {
  // CREATE or UPDATE review
  async createOrUpdate(userId, data) {
    const { rating, review, serviceType } = data;

    if (!rating || !review) {
      throw new AppError("Rating and review are required", 400);
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("Rating must be between 1 and 5", 400);
    }

    // Upsert: create if not exists, update if exists
    const result = await Review.findOneAndUpdate(
      { userId },
      { rating, review, serviceType: serviceType || "General" },
      { upsert: true, new: true, runValidators: true }
    );

    return result;
  }

  // GET ALL reviews (public — for landing page testimonials)
  async getAll() {
    return Review.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(20);
  }

  // GET user's own review
  async getMyReview(userId) {
    return Review.findOne({ userId });
  }

  // DELETE review
  async deleteReview(userId) {
    const review = await Review.findOneAndDelete({ userId });

    if (!review) {
      throw new AppError("Review not found", 404);
    }

    return { message: "Review deleted successfully" };
  }
}

export default new ReviewService();
