const express = require("express");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} = require("amazon-cognito-identity-js");

const router = express.Router();

const { S3_BUCKET, USER_POOL_ID, USER_POOL_CLIENT_ID } = process.env;

router.post("/register", async (req, res) => {});
router.post("/login", async (req, res) => {
  return new Promise((resolve, reject) => {
    const { username, password } = req.body;
    const userPool = new CognitoUserPool({
      UserPoolId: USER_POOL_ID,
      ClientId: USER_POOL_CLIENT_ID,
    });

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        const idToken = result.getIdToken().getJwtToken();
        resolve(idToken);
      },
      onFailure: (err) => reject(err),
    });
  });
});

router.post("/presign-upload", async (req, res, next) => {
  const idToken = req.headers["x-id-token"];
  const credentials = req.headers["x-iam-credentials"];
  const { filename, type, size } = req.body;

  try {
    const s3Client = await getS3Client(username, password);

    const uploadParams = {
      Bucket: S3_BUCKET,
      Key: file.originalname, // IAM policy prefixes it automatically with identity-id
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    res.json({
      message: "File uploaded successfully",
      key: file.originalname,
    });
  } catch (err) {
    return next(error);
  }
});

// Download file
router.get("/presign-download", async (req, res) => {
  const { username, password } = req.query;
  const { filename } = req.params;

  try {
    const s3Client = await getS3Client(username, password);

    const downloadParams = {
      Bucket: S3_BUCKET,
      Key: filename,
    };

    const command = new GetObjectCommand(downloadParams);
    const response = await s3Client.send(command);

    res.setHeader("Content-Type", response.ContentType);
    response.Body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
