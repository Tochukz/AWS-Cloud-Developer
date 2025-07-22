# Lesson 273: Lambda and Application Load Balancer - Hands On

### Description

This configuration integrates an Application Load Balancer (ALB) to a Lambda Function.  
The ALB will then forward all HTTP requests to the Lambda function.  
We can then use the ALB's domain name to access the Lambda function.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaAndAlb.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaAndAlb.yaml  --stack-name LambdaAndAlb --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**

Get the `AlbDnsName` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaAndAlb --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

Use the `AlbDnsName` to test the ALB + Lambda integration over a browser.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name LambdaAndAlb
```
