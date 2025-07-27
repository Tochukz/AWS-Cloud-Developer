# Lesson 293: Lambda In VPC - Hands On

### Description

We enable XRay Tracing for a Lambda Function.

### Operation

**Before Deployment**

Deploy the Lambda code to S3

```bash
$ ./deploy-code.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint XrayInLambda.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file XrayInLambda.yaml  --stack-name XrayInLambda --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**  
Get the `FunctionUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name XrayInLambda --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the `FunctionUrl` to access the Lambda function over a browser.  
   You should see the JSON returned by the Lambda function.

2. Go the the Lambda Console > Monitor tab > View X-ray traces  
   Under _Application Signals (APM)_ menu, click _Trace Map_

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name XrayInLambda
```
