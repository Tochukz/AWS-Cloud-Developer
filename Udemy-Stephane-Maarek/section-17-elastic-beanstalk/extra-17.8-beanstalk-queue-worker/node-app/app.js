const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const message = req.body; // SQS message or cron payload
  console.log('Received message:', message);

  // Do your work here
  // e.g., process job, cleanup task, send email, etc.

  res.status(200).send('OK');
});

app.listen(8080, () => {
  console.log('Worker listening on port 8080');
});
