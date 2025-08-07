# Lesson 432: SSM Parameter Store - Hands On

### Description

This configuration is dependent on `hands-on-431-parameter-store` where parameters have been configures.  
Here we show how the Parameters can be accessed inside a Lambda Function code.

### Operation

**Before Deployment**  
Deploy the Lambda code to S3 bucekt

```bash
$ ./deploy-code.sh
```

**Deployment**  
Lint the template

```bash
$ cfn-lint ParameterStoreLambda.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ParameterStoreLambda.yaml --stack-name ParameterStoreLambda --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**

1. Go to the Lambda Console and locate the Lambda function.
2. Do a test execution to test it.
3. Confirm that the Lambda function is able to Get the Parameters and print them.

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name ParameterStoreLambda
```
