# Extra 27.1

### Description

Create a Configuration that Leverage an IAM policy with the Amazon Cognito identity prefix to restrict users to use their own folders in Amazon S3

With this setup, each authenticated Cognito user gets access only to their own folder in S3.

**How it it is setup**

- Cognito User Pool → for user authentication
- Cognito Identity Pool → for issuing IAM credentials
- IAM role + policy → grants access to `s3://bucket-name/<user-identity-id>/` only

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint CognitoIam.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CognitoIam.yaml --stack-name CognitoIam --capabilities CAPABILITY_IAM
```

**After Deployment**  
Get stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name CognitoIam --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Signup a new user

```bash
$ curl  http://localhost:8090/user/register --data '{"username": "johnusr", "password": "pass@123", "email": "john@yahoo.com"}' -H "Content-Type: application/json"
```

2. Confirm the user after signup

```bash
$  aws cognito-idp admin-confirm-sign-up --user-pool-id  <user-pool-id> --username johnusr
```

3. Login with the user credential

```bash
$ curl  http://localhost:8090/user/login --data '{"username": "johnusr", "password": "pass@123"}' -H "Content-Type: application/json"
```

4. Use the `idToken` from the login response to get temporary AWS credentials from Cognito Identity Pool

```bash
# Set 1: Get the User's Identity ID
$ login="cognito-idp.<region>.amazonaws.com/<user-pool-id>=<idToken>"
$ aws cognito-identity get-id --identity-pool-id <identity-pool-id> --logins $login
# Step 2: User the IdentityId from the output of step one to request for temporary AWS credentials
$ aws cognito-identity get-credentials-for-identity --identity-id <identity-id> --logins $login
```

5. Use the temporary credentials to carry out S3 actions permitted by the policy associated with the Identity Pool

```bash
$ export AWS_ACCESS_KEY_ID="xxxxxxx"
$ export AWS_SECRET_ACCESS_KEY="xxxxxxxxx"
$ export AWS_SESSION_TOKEN="xxxxxxxxxx"

# Remember that our permission policy only allows access to the folder with the user's identity ID
$ aws s3 cp myfile.txt s3://simple-users-bucket/eu-west-2/<identity-id>/
$ aws s3 ls myfile.txt s3://simple-users-bucket/eu-west-2/<identity-id>/
$ aws s3 cp  s3://simple-users-bucket/eu-west-2/<identity-id>/myfile.txt myfile-copy.txt
$ aws s3 rm s3://simple-users-bucket/eu-west-2/<identity-id>/myfile.txt
```

**Debug Errors**

**Cleanup**  
Emtpy the S3 bucket

```
$ aws s3 rm s3://simple-users-bucket --recursive
```

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CognitoIam
```

## Learn More

**How it Works**

When a user logs in via Cognito User Pool → they get an Identity ID from the Identity Pool.
IAM policy uses `${cognito-identity.amazonaws.com:sub}` as a folder prefix in S3.
Example:

```txt
s3://myapp-user-files/ap-south-1:12345678-aaaa-bbbb-cccc-ddddeeeeffff/myfile.png
```

The user can only `PutObject`, `GetObject`, or `DeleteObject` inside their own folder.
The ListBucket permission is scoped so they only see their own prefix.

This setup is scalable, secure, and efficient — users upload/download directly to S3 without Lambda/API Gateway bottlenecks.

**Read More**  
[Amazon S3: Allows Amazon Cognito users to access objects in their bucket](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_cognito-bucket.html)
