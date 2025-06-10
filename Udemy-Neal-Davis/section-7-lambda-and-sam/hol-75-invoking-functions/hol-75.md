# Invoking Functions - HOL-75

### Description

The configuration is used to demonstrate how Lambda function can be invoked either synchronously and asynchronously.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint InvokingFunctions.yaml
```

Deploy the InvokingFunctions stack

```bash
$ aws cloudformation deploy --template-file InvokingFunctions.yaml --stack-name InvokingFunctions --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**

**Testing**

1. Invoke the function synchronously

```bash
# With payload
$ aws lambda invoke --function-name SimpleFunc --payload file://payload.json --cli-binary-format raw-in-base64-out response1.json
# Without payload
$ aws lambda invoke --function-name SimpleFunc output.json
```

For synchronously invocation, the `StatusCode` will be 200 and the `response1.json` output file will contain the response returned by the Lambda function.

2. Invoke the function asynchronously

```bash
$ aws lambda invoke --function-name SimpleFunc --invocation-type Event --payload file://payload.json --cli-binary-format raw-in-base64-out response2.json
```

For asynchronously invocation, the `StatusCode` will be 202 and the `response2.json` output file will be empty.

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name InvokingFunctions > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name InvokingFunctions
```
