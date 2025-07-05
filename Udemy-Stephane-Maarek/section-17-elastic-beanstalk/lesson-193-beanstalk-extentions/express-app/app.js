const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const { NODE_ENV, DB_URL } = process.env;
  const message = `<p>Elastic Beanstalk in ${NODE_ENV} environment</p>
                   <p>Database Url: ${DB_URL}</p>`;
  return res.send(message);
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
  return res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
