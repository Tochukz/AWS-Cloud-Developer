const { S3Client } = require("@aws-sdk/client-s3");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-providers");
const { CognitoUserPool, CognitoUser } = require("amazon-cognito-identity-js");

const { AWS_REGION, USER_POOL_ID, CLIENT_ID, IDENTITY_POOL_ID } = process.env;

// Authenticate user with Cognito User Pool → exchange for Identity Pool credentials
async function getS3ClientUsingIdToken(username, idToken) {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
    });
    const user = new CognitoUser({ Username: username, Pool: userPool });
    const loginUrl = `cognito-idp.${AWS_REGION}.amazonaws.com/${USER_POOL_ID}`;
    const credentials = fromCognitoIdentityPool({
      clientConfig: { region: AWS_REGION },
      identityPoolId: IDENTITY_POOL_ID,
      logins: {
        [loginUrl]: idToken,
      },
    });
    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        // Get temporary IAM creds from Identity Pool
        const s3Client = new S3Client({
          region: AWS_REGION,
          credentials,
        });
        resolve({ s3Client, credentials });
      },
      onFailure: (err) => reject(err),
    });
  });
}

async function getS3ClientUsingIamCreds(username, credentials) {
  return new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
    });

    const user = new CognitoUser({ Username: username, Pool: userPool });
    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        // Get temporary IAM creds from Identity Pool
        const s3Client = new S3Client({
          region: AWS_REGION,
          credentials,
        });

        resolve(s3Client);
      },
      onFailure: (err) => reject(err),
    });
  });
}

async function getUploadPresignedUrl(file, idToken, credentials) {
  let s3Client;
  if (idToken) {
    s3Client = await getS3ClientUsingIdToken(username, idToken);
  } else {
    s3Client = await getS3ClientUsingIamCreds(username, credentials);
  }
}

exports = {
  getUploadPresignedUrl,
};
