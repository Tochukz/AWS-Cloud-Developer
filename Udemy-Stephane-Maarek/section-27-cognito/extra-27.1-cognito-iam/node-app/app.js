const express = require("express");
require("dotenv").config();

const userRouter = require("./router/user.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Welcome to Congnito Demo!"));
app.use("/user", userRouter);

app.use(function (err, req, res, next) {
  let message, status;
  ({ message, status } = err);
  console.log("Error code:", err.code);

  const errorCodes = ["UserNotFoundException", "UserNotConfirmedException"];
  if (errorCodes.includes(err.code)) {
    status = 400;
  }
  if (err.code === "NotAuthorizedException") {
    status = 401;
  }

  console.log("error", err);
  return res.status(status || 500).json({ message });
});

const port = process.env.PORT || 8090;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
