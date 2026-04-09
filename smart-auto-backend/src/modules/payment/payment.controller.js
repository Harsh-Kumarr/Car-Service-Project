import paymentService from "./payment.service.js";

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const result = await paymentService.createOrder(bookingId);

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res, next) => {
  try {
    const result = await paymentService.verifyPayment(req.body);

    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};