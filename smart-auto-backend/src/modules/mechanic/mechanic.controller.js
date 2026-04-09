import mechanicService from "./mechanic.service.js";

// GET ASSIGNED JOBS
export const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await mechanicService.getAssignedJobs(req.user.id);

    res.json({ success: true, jobs });
  } catch (error) {
    next(error);
  }
};

// UPDATE STATUS
export const updateJobStatus = async (req, res, next) => {
  try {
    const { bookingId, status, note } = req.body;

    const booking = await mechanicService.updateJobStatus(
      req.user.id,
      bookingId,
      status,
      note
    );

    res.json({ success: true, booking });
  } catch (error) {
    next(error);
  }
};