# Lesson 277: Lambda and CloudWatch Events - Hands On

### Description

This configuration creates a Cron Job using an Event Bridge Rule that invokes a Lambda function every minute.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaCronJob.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaCronJob.yaml  --stack-name LambdaCronJob --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**

**Testing**  
Go to the Lambda Logs on CloudWatch Logs and checkout the logs for the invocations.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaCronJob
```
