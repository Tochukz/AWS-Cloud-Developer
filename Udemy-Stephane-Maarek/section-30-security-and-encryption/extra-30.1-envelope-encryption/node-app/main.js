require("dotenv").config();
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const crypto = require("crypto");

const { envelopeEncrypt, envelopeDecrypt } = require("./kms-service");

const keyId = process.env.KMS_KEY_ID; // your CMK ARN or alias

const arg = process.argv[2];
const filename = process.argv[3];
if (!arg || !filename) {
  console.error(
    `Argument and filename are required e.g node main.js encrypt data-file.txt`
  );
  return;
}

const data = readFileSync(join(__dirname, filename))?.toString();
if (!data) {
  console.error("Invalid data file, data:", data);
  return;
}

const randomName = crypto.randomUUID().split("-").at(-1);
if (arg === "encrypt") {
  envelopeEncrypt(data, keyId)
    .then((encrypedResult) => {
      const outputFilename = `envelop-${randomName}.json`;
      writeFileSync(
        join(__dirname, outputFilename),
        JSON.stringify(encrypedResult, null, 2)
      );
      console.log("Envelope stored in ", outputFilename);
    })
    .catch((error) => console.error(error));
} else if (arg === "decrypt") {
  const envelop = JSON.parse(data);
  envelopeDecrypt(envelop)
    .then((plaintext) => {
      const outputFilename = `output-${randomName}.txt`;
      writeFileSync(
        join(__dirname, outputFilename),
        plaintext.toString("utf8")
      );
      console.log("Output stored in ", outputFilename);
    })
    .catch((error) => console.error(error));
} else {
  console.error(`Unsupported argument ${arg}`);
}
