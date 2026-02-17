const CatchAsync = require("../../helper/catchAsync");
const ArgumentValidation = require("../../vaildation/argumentVaildation");
const { studentResultService } = require("./result.service");

const getStudentController = CatchAsync(async (req, res) => {
  const payload = await ArgumentValidation.validate(req.query);

  const result = await studentResultService(payload);

  res.json({
    success: true,
    data: result,
    status: 200
  });
});

const postStudentController = CatchAsync(async (req, res) => {
  const payload = await ArgumentValidation.validate(req.body);

  const result = await studentResultService(payload);

  res.json({
    success: true,
    data: result,
    status: 200
  });
});

module.exports = {
    getStudentController,
    postStudentController
}