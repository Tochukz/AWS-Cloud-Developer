# Extra 6.4: Transform - Include

### Description

### Operation

**Before deployment**

Copy the includes to S3

```bash
$ aws s3 cp includes/AmiMappings.yaml s3://chucks-workspace-storage/includes/
$ aws s3 cp includes/Network.yaml s3://chucks-workspace-storage/includes/
$ aws s3 cp includes/Storage.yaml s3://chucks-workspace-storage/includes/
```

**Deployment**

Lint the templates

```bash
$ cfn-lint includes/Storage.yaml
$ cfn-lint includes/Network.yaml
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
