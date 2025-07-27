const lambda = require("./lambda");

lambda
  .handler()
  .then((res) => console.log("res", res))
  .catch((err) => console.log("err", err));

//   172.31.0.0/16

//   172.31.16.0/20, 172.31.32.0/20 and 172.31.0.0/20
