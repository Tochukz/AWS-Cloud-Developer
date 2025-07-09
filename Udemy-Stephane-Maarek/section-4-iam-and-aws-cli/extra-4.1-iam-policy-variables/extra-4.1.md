# Extra-4.1: IAM Policy Variables

### Description

This configuration demonstrates the use of _IAM policy variables_ to create an IAM policy.  
Here we write an IAM policy that grants IAM users access to their own folders in an Amazon S3 Bucket.  
This means that a user such as John will have access to `s3://bucket-name/john` only, and another user, Peter, have access to `s3://bucker-name/peter` only.

We use the `${aws:username}` policy variable to achieve this.  
Other policy variables that can use used includes:

1. xxxxx
2. xxxxx

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint PolicyVariables.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file PolicyVariables.yaml  --stack-name PolicyVariables  --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**

1. Use the `john` user to upload, list and download files under the `john` prefix on the S3 bucket

```bash
$ aws s3 cp john-file.txt s3://chucks-workspace-storage/john/ --profile john
$ aws s3 ls s3://chucks-workspace-storage/john/ --profile john
$ aws s3 cp s3://chucks-workspace-storage/john/john-file.txt output-john-file.txt --profile john
```

2. Use the `peter` user to upload, list and download files under the `peter` prefix on the S3 bucket

```bash
$ aws s3 cp peter-file.txt s3://chucks-workspace-storage/peter/ --profile peter
$ aws s3 ls s3://chucks-workspace-storage/peter/ --profile peter
$ aws s3 cp s3://chucks-workspace-storage/peter/peter-file.txt output-peter-file.txt --profile peter
```

3. Try using the `john` user to access anything in the bucket without the `john` prefix.

```bash
$ aws s3 ls s3://chucks-workspace-storage --profile john
$ aws s3 ls s3://chucks-workspace-storage/peter --profile john
$ aws s3 cp john-file.txt s3://chucks-workspace-storage/peter-file.txt --profile john
# Should return 403 Fobidden
$ aws s3 cp s3://chucks-workspace-storage/peter/peter-file.txt output-peter2.txt --profile john
```

This should all fail with AccessDenied error except for the last which fails with 403 Fobidden.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name PolicyVariables > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name PolicyVariables
```

**Learn more**.
[IAM policy elements: Variables and tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html).
