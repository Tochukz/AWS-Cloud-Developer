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

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name CognitoIam
```

## Learn More

**How it Works**

When a user logs in via Cognito User Pool → they get an Identity ID from the Identity Pool.
IAM policy uses ${cognito-identity.amazonaws.com:sub} as a folder prefix in S3.
Example:

```
s3://myapp-user-files/ap-south-1:12345678-aaaa-bbbb-cccc-ddddeeeeffff/myfile.png
```

The user can only PutObject, GetObject, or DeleteObject inside their own folder.
The ListBucket permission is scoped so they only see their own prefix.

This setup is scalable, secure, and efficient — users upload/download directly to S3 without Lambda/API Gateway bottlenecks.

**Read More**  
[Amazon S3: Allows Amazon Cognito users to access objects in their bucket](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_cognito-bucket.html)
