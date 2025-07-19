/**
 * Description: The script sends a random message out of an array of messages
 */
const {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
} = require("@aws-sdk/client-cloudwatch-logs");

const LOG_GROUP_NAME = "/aws/lambda/SimpleLogs";
const LOG_STREAM_PREFIX = "Simple-Logs-1907/Min";

const logStreams = [];
// Array of random log messages
const logMessages = [
  "User login successful",
  "Database connection error",
  "File not found: /var/www/app/config.json",
  "Payment processed successfully",
  "Error: Invalid user input detected",
  "Cache cleared successfully",
  "Warning: CPU usage exceeds 80%",
  "User logout successful",
  "Error: Timeout while connecting to API",
  "System reboot scheduled",
];

const applicationNames = ["FinApp", "MgtApp"];
const deploymentEnvs = ["Development", "Production"];

const client = new CloudWatchLogsClient({});

// Create Log Stream (if it doesn’t exist)
async function createLogStream(logStreamName) {
  try {
    await client.send(
      new CreateLogStreamCommand({
        logGroupName: LOG_GROUP_NAME,
        logStreamName,
      })
    );
    logStreams.push(logStreamName);
    console.log(`Log stream "${logStreamName}" created`);
  } catch (err) {
    if (err.name === "ResourceAlreadyExistsException") {
      console.log(`Log stream "${logStreamName}" already exists`);
    } else {
      console.error("Error creating log stream:", err);
    }
  }
}

// Get the current sequence token
async function getSequenceToken(logStreamName) {
  const data = await client.send(
    new DescribeLogStreamsCommand({
      logGroupName: LOG_GROUP_NAME,
      logStreamName,
    })
  );
  const logStream = data.logStreams.find(
    (ls) => ls.logStreamName === logStreamName
  );
  return logStream.uploadSequenceToken;
}

// Send a random log message
async function sendRandomLog() {
  const randomLogIndex = Math.floor(Math.random() * logMessages.length);
  const randomAppIndex = Math.floor(Math.random() * applicationNames.length);
  const randomEnvIndex = Math.floor(Math.random() * deploymentEnvs.length);

  const randomMessage = logMessages[randomLogIndex];
  const randomApp = applicationNames[randomAppIndex];
  const randomEnv = deploymentEnvs[randomEnvIndex];

  const date = new Date();
  const timestamp = Date.now();

  const logEntry = JSON.stringify({
    timestamp: new Date(timestamp).toISOString(),
    message: randomMessage,
    applicationName: randomApp,
    deploymentEnv: randomEnv,
  });

  try {
    const minutes = date.getMinutes();
    const logStreamName = `${LOG_STREAM_PREFIX}-${minutes}`;
    if (!logStreams.includes(logStreamName)) {
      await createLogStream(logStreamName);
    }
    const sequenceToken = await getSequenceToken(logStreamName);
    const params = {
      logEvents: [
        {
          message: logEntry,
          timestamp,
        },
      ],
      logGroupName: LOG_GROUP_NAME,
      logStreamName,
      sequenceToken,
    };

    await client.send(new PutLogEventsCommand(params));
    console.log(`[${new Date().toISOString()}] Sent log: ${logEntry}`);
  } catch (err) {
    console.error("Error sending log:", err);
  }
}

// Main
(async () => {
  // Send logs every second
  setInterval(sendRandomLog, 1000);
})();
