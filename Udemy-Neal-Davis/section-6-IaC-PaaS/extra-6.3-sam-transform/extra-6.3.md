# Extra 6.3: Transform - Serverless

### Description

This configuration shows how to use `Transform` to take advantage of the _Serverless Application Model (SAM)_ syntax.

Here we use SAM's `AWS::Serverless::Function` type to create a Lambda Function and Function URL.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint Transform.yaml
```

To validate using the `SAM CLI`

```bash
$ sam validate -t Transform.yaml
```

Deploy the Transform stack

```bash
$ aws cloudformation deploy --template-file Transform.yaml --stack-name Transform --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**  
Get the Function URL

```bash
$  aws lambda list-function-url-configs --function-name SimpleFunc0506 --query "FunctionUrlConfigs[0].FunctionUrl" --no-cli-pager
```

**Testing**

Use the Function URL to test the Lambda function

```bash
$ curl https://aha32vqbi73qbfnealrqafo6vq0gpvic.lambda-url.eu-west-2.on.aws
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name Transform > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Transform
```
