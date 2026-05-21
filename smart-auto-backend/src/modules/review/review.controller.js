import reviewService from "./review.service.js";

// CREATE or UPDATE review
export const createOrUpdateReview = async (req, res, next) => {
  try {
    const review = await reviewService.createOrUpdate(req.user.id, req.body);
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// GET ALL reviews (public)
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getAll();
    res.json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

// GET my review
export const getMyReview = async (req, res, next) => {
  try {
    const review = await reviewService.getMyReview(req.user.id);
    res.json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// DELETE review
export const deleteReview = async (req, res, next) => {
  try {
    const result = await reviewService.deleteReview(req.user.id);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};
