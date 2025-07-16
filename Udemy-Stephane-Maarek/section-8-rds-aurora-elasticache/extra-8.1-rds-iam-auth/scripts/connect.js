require("dotenv").config();
const mysql = require("mysql2/promise");
const { RDSAuthTokenProvider } = require("@aws-sdk/rds-signer");
const { fromInstanceMetadata } = require("@aws-sdk/credential-providers");

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, AWS_REGION, NODE_ENV } =
  process.env;

async function getToken() {
  const signer = new RDSAuthTokenProvider({
    region: AWS_REGION,
    hostname: DB_HOST,
    port: 3306,
    username: DB_USER,
    credentials: fromInstanceMetadata(),
  });
  return signer.getAuthToken();
}

async function getDbConnection() {
  const connectionOptions = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  };
  if (NODE_ENV != "local") {
    const token = await getToken();
    connectionOptions.password = token;
    connectionOptions.ssl = "Amazon RDS";
    connectionOptions.authPlugins = {
      mysql_clear_password: () => () => token,
    };
  }
  const connection = await mysql.createConnection(connectionOptions);
  const result = await connection.connect();
  console.log("connectionId ", result?.connectionId);
  return connection;
}

module.exports = {
  getDbConnection,
};
