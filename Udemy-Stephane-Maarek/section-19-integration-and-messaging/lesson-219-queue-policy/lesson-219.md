# Lesson 219: SQS Queue Access Policy

### Description

Configure an SQS queue policy to allow access from an S3 bucket. This setup enables the S3 bucket to send notifications to the SQS queue when objects are created in the bucket.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint QueuePolicy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file QueuePolicy.yaml --stack-name QueuePolicy
```

**After Deployment**

Get the `QueueUrl` from the stack output

```bash
$ aws cloudformation describe-stacks --stack-name QueuePolicy --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Copy a file to the S3 bucket

```bash
$ aws s3 cp sample.txt s3://simple-bucket-1408/samples/
```

2. Check the SQS queue for messages

```bash
$ aws sqs receive-message --queue-url <QueueUrl>
```

**Debug Errors**

**Cleanup**  
Empty the S3 bucket

```bash
$ aws s3 rm s3://simple-bucket-1408 --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name QueuePolicy
```
