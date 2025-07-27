# Lesson 293: Lambda In VPC - Hands On

### Description

We put a Lambda function in a private subnet and provide internet access to the Lambda function using an NAT Gateway.

### Operation

**Before Deployment**

Deploy the Lambda code to S3

```bash
$ ./deploy-code.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaInVpc.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaInVpc.yaml  --stack-name LambdaInVpc --capabilities CAPABILITY_IAM --parameter-overrides file://private-parameters.json --disable-rollback
```

**After Deployment**  
Get the `FunctionUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaInVpc --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the `FunctionUrl` to access the Lambda function over a browser.  
You should see the JSON returned by the Lambda function.  
This shows that our Lambda function is able to access the Public API over the public internet.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaInVpc
```
