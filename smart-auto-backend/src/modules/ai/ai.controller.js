import aiService from "./ai.service.js";

export const diagnose = async (req, res, next) => {
  try {
    const { issue } = req.body;

    if (!issue) {
      return res.status(400).json({
        success: false,
        message: "Issue description is required",
      });
    }

    const result = await aiService.diagnose(issue);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};