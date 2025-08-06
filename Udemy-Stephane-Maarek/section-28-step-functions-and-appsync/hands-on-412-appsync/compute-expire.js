const nowMilliseconds = Date.now();
const nowSeconds = nowMilliseconds / 1000;
const oneDayInSeconds = 172800; // 172800secs = 2 Days
const expiresInOnDay = Math.round(nowSeconds + oneDayInSeconds);
console.log("Expires After 2 Day:", expiresInOnDay);
