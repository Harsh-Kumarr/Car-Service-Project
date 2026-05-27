import bookingService from "./booking.service.js";

// CREATE
export const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(
      req.user.id,
      req.body
    );

    res.status(201).json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// USER BOOKINGS
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);

    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

// ADMIN ALL BOOKINGS
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// ASSIGN MECHANIC
export const assignMechanic = async (req, res, next) => {
  try {
    const { bookingId, mechanicId } = req.body;

    const booking = await bookingService.assignMechanic(
      bookingId,
      mechanicId
    );

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// UPDATE STATUS
export const updateStatus = async (req, res, next) => {
  try {
    const { bookingId, status, note } = req.body;

    const booking = await bookingService.updateStatus(
      bookingId,
      status,
      note
    );

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};

// GET SERVICE LOGS FOR A BOOKING
export const getServiceLogs = async (req, res, next) => {
  try {
    const logs = await bookingService.getServiceLogs(
      req.params.bookingId,
      req.user.id
    );

    res.json({ success: true, logs });
  } catch (error) {
    next(error);
  }
};

export const uploadMedia = (req, res) => {
  res.json({
    success: true,
    file: req.file,
  });
};