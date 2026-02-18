const GlobalErrorHandler = (err, req, res, next) => {
  res.status(400).send({
    msg: err?.message, // error message
    data: [],
    ...(err?.path && {
      query: err?.path,
      // If the error comes from Zod
      // Show it along with the field path (as query fields)
      // This will help the front-end identify which specific field caused the error
    }),
  });
};

module.exports = GlobalErrorHandler;
