const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Daily cleanup task
app.post('/tasks/cleanup', (req, res) => {
  console.log('Running daily cleanup task');
  // Your cleanup logic here
  res.status(200).send('Cleanup done');
});

// Hourly report task
app.post('/tasks/report', (req, res) => {
  console.log('Generating hourly report');
  // Report logic here
  res.status(200).send('Report done');
});

// Check status every 5 minutes
app.post('/tasks/check-status', (req, res) => {
  console.log('Checking system status...');
  res.status(200).send('Status OK');
});

// Weekly summary task
app.post('/tasks/weekly-summary', (req, res) => {
  console.log('Generating weekly summary...');
  res.status(200).send('Weekly summary done');
});

app.listen(8080, () => {
  console.log('Worker listening on port 8080');
});
