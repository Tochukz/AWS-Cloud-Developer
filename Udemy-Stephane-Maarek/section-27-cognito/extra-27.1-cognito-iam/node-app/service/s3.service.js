const { S3Client } = require("@aws-sdk/client-s3");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-providers");
const { CognitoUserPool, CognitoUser } = require("amazon-cognito-identity-js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { AWS_REGION, USER_POOL_ID, CLIENT_ID, IDENTITY_POOL_ID, S3_BUCKET } =
  process.env;

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

async function getReadonlySignedUrl(username, idToken, key, fileArgs = {}) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ...fileArgs,
  });
  let expiresIn = 60 * 10; //Ten Minutes
  if (key.startsWith(S3Prefixes.profileImages)) {
    expiresIn = 60 * 60 * 24 * 6; // 6 Days;
  }
  const s3Client = await getS3ClientUsingIdToken(username, idToken);
  return getSignedUrl(s3Client, command, {
    expiresIn,
  });
}

async function getWriteSignedUrl(uaername, idToken, key, fileArgs = {}) {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ...fileArgs,
  });
  const tenMinutes = 60 * 10;
  const s3Client = await getS3ClientUsingIdToken(username, idToken);
  return getSignedUrl(s3Client, command, {
    expiresIn: tenMinutes,
  });
}

exports = {
  getReadonlySignedUrl,
  getWriteSignedUrl,
};
