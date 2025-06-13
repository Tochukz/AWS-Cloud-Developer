const date = new Date();
const minute = date.getMinutes();
const hour = date.getHours() - 1;
date.setHours(hour, minute, 0, 0); // London Time

console.log("UK Timestamp");
date.setMinutes(minute + 2);
console.log("+2Minutes: ", date.getTime() / 1000);
console.log(date.toLocaleString());

date.setMinutes(minute + 5);
console.log("+5Minutes: ", date.getTime() / 1000);
console.log(date.toLocaleString());

date.setMinutes(minute + 7);
console.log("+7Minutes: ", date.getTime() / 1000);
console.log(date.toLocaleString());

date.setMinutes(minute + 10);
console.log("+10Minutes: ", date.getTime() / 1000);
console.log(date.toLocaleString());
