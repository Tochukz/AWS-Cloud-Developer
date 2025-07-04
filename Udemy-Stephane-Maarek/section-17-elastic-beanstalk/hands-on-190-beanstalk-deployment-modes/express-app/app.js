const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Elastic Beanstalk v2 with Immutable Deployment!");
});

app.get("/users", (req, res) => {
  const users = [
    {
      name: "James Young",
    },
    {
      name: "Kelvin Smith",
    },
  ];
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
