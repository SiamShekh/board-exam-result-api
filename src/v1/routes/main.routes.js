const { Router } = require("express");
const ResultRoute = require("./result.routes");

const MainRoute = Router();

MainRoute.use("/", ResultRoute);

module.exports = MainRoute;