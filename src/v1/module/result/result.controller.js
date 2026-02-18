const CatchAsync = require("../../helper/catchAsync");
const ArgumentValidation = require("../../vaildation/argumentVaildation");
const { studentResultService } = require("./result.service");

// /v1 (GET) method - (api)
const getStudentController = CatchAsync(async (req, res) => {
  // vaildate query field using yup
  const payload = await ArgumentValidation.validate(req.query);

  const result = await studentResultService(payload);

  res.json({
    success: result?.student?.length === 0 ? false : true, // if result retrive then show `success` is true
    data: result, // show result
    status: 200, // show status code
  });
});

// /v1 (POST) method - (api)
const postStudentController = CatchAsync(async (req, res) => {
  // vaildate req.body value using yup
  const payload = await ArgumentValidation.validate(req.body);

  const result = await studentResultService(payload);

  res.json({
    success: result?.student?.length === 0 ? false : true, // if result retrive then show `success` is true
    data: result, // show result
    status: 200, // show status code
  });
});

module.exports = {
  getStudentController,
  postStudentController,
};
