// @dev Import all necessary packages to retrieve the student marksheet
const express = require("express");
const MainRoute = require("./v1/routes/main.routes");
const GlobalErrorHandler = require("./v1/helper/globalError");

const app = express();

// allow api to recieve body as json
app.use(express.json());

// @dev api end-point
app.use("/v1", MainRoute);

// send a organized error message
app.use(GlobalErrorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
