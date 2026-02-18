const { Router } = require("express");
const {
  getStudentController,
  postStudentController,
} = require("../module/result/result.controller");

const ResultRoute = Router();

// That bottom route allow get/post method
// it help front-end to query using body or search query
ResultRoute.get("/", getStudentController);
ResultRoute.post("/", postStudentController);

module.exports = ResultRoute;
