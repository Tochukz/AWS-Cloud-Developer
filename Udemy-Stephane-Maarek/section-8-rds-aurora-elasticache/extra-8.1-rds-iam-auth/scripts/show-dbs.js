const mysql = require("mysql2");
const { getDbConnection } = require("./connect");

async function showDbs() {
  const connection = await getDbConnection();
  return connection.query(`SHOW DATABASES`);
}

showDbs()
  .then((result) => {
    console.log("result", result);
    process.exit(0);
  })
  .catch((err) => {
    console.log("err", err);
    process.exit(0);
  });
