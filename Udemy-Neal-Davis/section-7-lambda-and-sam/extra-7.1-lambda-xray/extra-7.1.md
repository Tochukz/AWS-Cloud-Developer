# Extra 7.1: Lambda X-Ray Tracing

### Description

This configuration enabled X-Ray tracing in a Lambda function.
X-Ray tracing allows you identify performance bottlenecks, and troubleshoot requests that resulted in an error in you Lambda function.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint LambdaXray.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaXray.yaml --stack-name LambdaXray --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**

**Testing**  
Invoke the Lambda function

```bash
$ aws lambda invoke --function-name SimpleFunc output-1.json
```

Go to the Lambda Function Console and view the X-Ray tracing recorded for the Function.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name LambdaXray
```
