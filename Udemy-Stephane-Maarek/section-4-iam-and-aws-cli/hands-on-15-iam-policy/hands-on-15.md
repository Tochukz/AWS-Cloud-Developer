# Lesson 15: IAM Policies - Hands On

### Description

This configuration creates a customer managed IAM policy.  
The policy is attached to an IAM Group, User and a Role.  
The Role can be assumed by a user in another account specified by the `ExternalAccountArn` parameter.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint IamPolicies.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file IamPolicies.yaml  --stack-name IamPolicies --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**
Get the `StaffRoleArn` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name IamPolicies --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the `StaffUser1` user to login to the AWS S3 Console and try to upload a folder named `uploads` to the `simple-bucket-21-04` bucket. This should succeed.
2. Try to upload files to the `simple-bucket-21-04` bucket directly. This should fail.
3. Use the external user account to assume to `StaffRole`

```bash
# Assume the role
$ aws sts assume-role --role-arn <staff-role-arn> --role-session-name Session1 --profile sovtechchucks

# Use the AccessKeyId, SecretAccessKey and SessionToken from the output to update the secret-env.sh file
# First copy sample-env.sh to secret-env.sh
$ cp sample-env.sh secret-env.sh

# Export the AWS credentials to the terminal
$ . ./secret-env.sh
```

4. Use the assumed role to access the `simple-bucket-21-04` bucket.

```bash
# On the same terminal where the AWS credentials has been exported
$ aws s3 ls simple-bucket-21-04
$ aws s3 cp file.txt s3://simple-bucket-21-04/uploads/file.txt

# This should fail because it is not copying file with the "uploads/" prefix
$ aws s3 cp file.txt s3://simple-bucket-21-04/file.txt
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name IamPolicies > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
Empty the bucket

```bash
$ aws s3 rm s3://simple-bucket-21-04 --recursive
```

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name IamPolicies
```
