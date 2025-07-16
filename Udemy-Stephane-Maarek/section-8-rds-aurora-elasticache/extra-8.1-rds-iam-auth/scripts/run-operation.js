const mysql = require("mysql2");
const { getDbConnection } = require("./connect");

async function createTable() {
  const connection = await getDbConnection();
  const query = `CREATE TABLE IF NOT EXISTS users (
                     userId INT AUTO_INCREMENT PRIMARY KEY, 
                     name VARCHAR(50)
                   );`;
  return connection.query(query);
}

async function insertRecord(name) {
  const connection = await getDbConnection();
  const query = `INSERT INTO users(name) VALUES ('${name}');`;
  return connection.query(query);
}

async function readAll(name) {
  const connection = await getDbConnection();
  const query = `SELECT * FROM users;`;
  return connection.query(query);
}

const args = process.argv;
const operation = args[2];
const argument = args[3];
let runFunc;
switch (operation) {
  case "create-table":
    runFunc = createTable;
    break;
  case "insert-record":
    if (!argument) {
      console.log("name argument is required");
      process.exit(1);
    }
    runFunc = insertRecord;
    break;
  case "read-all":
    runFunc = readAll;
    break;
  default:
    console.log("Unsupported operation", operation);
    process.exit(1);
}

if (typeof runFunc == "function") {
  runFunc(argument)
    .then((result) => {
      console.log(result);
      process.exit(0);
    })
    .catch((err) => {
      console.log("Error", err);
      process.exit(0);
    });
}
