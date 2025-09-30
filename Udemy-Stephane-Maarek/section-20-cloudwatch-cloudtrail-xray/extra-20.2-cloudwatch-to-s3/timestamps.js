const date = new Date();
const timeStampMilliseconds = date.getTime();

const days = 5;
const millisecondsAgo = 1000 * 60 * 60 * 24 * days;

console.log("Current Timestamp Milliseconds: ", timeStampMilliseconds);
console.log(
  `Timestamp ${5} days aog:`,
  timeStampMilliseconds - millisecondsAgo
);
