const asyncHandler = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    // console.log("Status code ", error.statusCode);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      errors: error.errors || [],
      statusCode: error.statusCode,
    });
  }
};

module.exports = asyncHandler;
