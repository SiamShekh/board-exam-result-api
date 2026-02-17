const GlobalErrorHandler = (err, req, res, next) => {
  res.status(400).send({
    msg: err?.message,
    query: err?.path,
    data: []
  });
};

module.exports = GlobalErrorHandler;
