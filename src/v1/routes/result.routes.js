const { Router } = require("express");
const {
  getStudentController,
  postStudentController,
} = require("../module/result/result.controller");

const ResultRoute = Router();

ResultRoute.get("/", getStudentController);
ResultRoute.post("/", postStudentController);

module.exports = ResultRoute;
