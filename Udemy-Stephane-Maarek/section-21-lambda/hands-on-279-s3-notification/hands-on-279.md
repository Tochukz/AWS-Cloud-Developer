# Lesson 279: Lambda and S3 Event Notification - Hands On

### Description

This example configures a S3 bucket notification to invoke a Lambda function when an object is created in the S3 bucket.  
We added a event filters so that the notification only applies to objects of image files only.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint S3Notification.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file S3Notification.yaml  --stack-name S3Notification --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**

**Testing**

1. Upload and image file into the S3 bucket

```bash
$ aws s3 cp upload-files/cloud.png s3://simple-bucket-2207/images/
$ aws s3 cp upload-files/donut.jpg s3://simple-bucket-2207/images/
$ aws s3 cp upload-files/document.pdf s3://simple-bucket-2207/images/
```

2. Go to the Lambda's Log Group (`/aws/lambda/BucketFunc`) to see if event for each uploaded object is logged.

3. There should be one event logged for the `cloud.png` and another for `donut.jpg` but non for `document.pdf`.

**Debug Errors**

**Cleanup**  
Empty the bucket

```bash
$ aws s3 rm  s3://simple-bucket-2207/ --recursive
```

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name S3Notification
```
