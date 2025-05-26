# Lesson 17: MFA - Hands On

### Description

This configuration enforces MFA activation for an IAM user.  
This user will have to setup MFA to be able to continue using their account.

Enforcing Multi-Factor Authentication (MFA) for all IAM users in your AWS account can’t be done with a single switch but you can enforce it effectively using a combination of an IAM policy and optionally AWS Config for monitoring.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint EnforceMfa.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EnforceMfa.yaml  --stack-name EnforceMfa --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**
The IAM user `UserJohn` has been granted AmazonS3ReadOnlyAccess but he will not be able to List Buckets or GET objects from any S3 bucket.

1. Login to the S3 Management Console and try to view the S3 bucket. You should be denied read access.
2. Navigate to the IAM Console, go to the section that says _Add MFA for yourself_ and click on the _Add MFA_ button
3. Configure you MFA Virtual Device using Google Authenticator or Microsoft Authenticator or any Auth App of your choice.
4. Logout fron the Console and Login again, you will be required to enter you MFA code
5. Navigate back to the S3 Console and you will now be able to see all the buckets and all the objects. You can now enjoy you S3Readonly permission!

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name EnforceMfa > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EnforceMfa
```

## AWS Password Policy

**Password Policy**  
You AWS Account Password Policy cannot be modified using CloudFormation, it must be done on the Management Console.

1. Go to the IAM Management Console
2. Click on Account Settings under Access Management menu
3. Click Edit under the Account Settings section
4. You can change from the default policy and customize the policy however you want.
