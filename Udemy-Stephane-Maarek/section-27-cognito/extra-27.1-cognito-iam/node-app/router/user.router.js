const express = require("express");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} = require("amazon-cognito-identity-js");

const router = express.Router();

const { S3_BUCKET, USER_POOL_ID, USER_POOL_CLIENT_ID } = process.env;

const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: USER_POOL_CLIENT_ID,
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  userPool.signUp(
    username,
    password,
    [{ Name: "email", Value: email }],
    null,
    (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ error: err.message || JSON.stringify(err) });
      }
      const cognitoUser = result.user;
      return res.json({
        message: `User ${cognitoUser.getUsername()} registered successfully`,
      });
    }
  );
});

router.post("/login", async (req, res) => {
  const responseData = await new Promise((resolve, reject) => {
    const { username, password } = req.body;

    const user = new CognitoUser({ Username: username, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        const { idToken, refreshToken, accessToken, clockDrift } = result;

        const responseData = {
          idToken: idToken.jwtToken,
          refreshToken: refreshToken.token,
          accessToken: accessToken.jwtToken,
          clockDrift,
        };
        // console.log("type getIdToken", typeof result.getIdToken);
        // console.log("type getJwtToken", typeof result.getIdToken().getJwtToken);

        resolve(responseData);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });

  return res.status(200).json(responseData);
});

module.exports = router;
