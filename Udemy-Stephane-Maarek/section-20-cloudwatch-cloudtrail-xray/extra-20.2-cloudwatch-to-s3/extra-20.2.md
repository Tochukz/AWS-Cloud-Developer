# Extra-20.2 CloudWatch to S3

### Description

This example shows how CloudWatch log can be intergrated with S3 Bucket.

1. We can carry out a one-time export of CloudWatch Logs to an S3 Bucket.
2. We can configure a CloudWatch LogGroup to deliver logs to an S3 bucket via a Kinesis Data Firehose.

#### One-Time Logs Export

A. First, your bucket must have a bucket policy that allows cloudWatch to write to the bucket

```bash
$ aws s3api put-bucket-policy --bucket simple-access-demo --policy file://bucket-policy.json
```

B. Next, create the export task

```bash
# Get timestamps, for the --from and --to parameters, by running the timestamp script
$ node timestamp.js
# Now, create the export-task using the timestamps
$ aws logs create-export-task \
  --task-name "export-logs-to-s3" \
  --log-group-name "/aws/lambda/FirdMedicalsLab_Prod"  \
  --from 1758822897170 \
  --to 1759254897170 \
  --destination simple-access-demo \
  --destination-prefix logs/lambda
```

C. Wait for a few minutes and then check the bucket for the exported logs.

#### Continuous delivery to S3

To configure continuous delivery of logs to from a LogGroup to an S3 bucket, we use a Log `SubscriptionFilter` with a Kinesis Data Firehose as the Destination. and the Firehose in turn have the S3 bucket as it's destination - `CloudWatch Logs → Kinesis Firehose → S3 Bucket`.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint CloudWatchToS3.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudWatchToS3.yaml  --stack-name CloudWatchToS3 --parameter-overrides "LogGroupName=/aws/lambda/FirdMedicalsLab_Prod" --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**
Wait for the LogGroup to receive logs or send logs to the log group manually.  
After some time, check the S3 bucket to see if there are new log files in the bucket.

**Debug Errors**

**Cleanup**  
To delete the stacks
Remove the bucket policy and delete the logs from the bucket

```bash
$ aws s3api delete-bucket-policy --bucket simple-access-demo
$ aws s3 rm s3://simple-access-demo/logs --recursive
```

Empty the S3 bucket from the Stack

```bash
$ aws s3 rm s3://simple-access-demo/simple-logs-bucket-0210 --recursive
```

Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CloudWatchToS3
```
