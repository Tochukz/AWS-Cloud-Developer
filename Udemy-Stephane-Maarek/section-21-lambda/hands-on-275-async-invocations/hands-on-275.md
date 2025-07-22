# Lesson 275: Lambda Asynchronous Invocations - Hands On

### Description

This configuration is used to demonstrates Lambda Asynchronous invocations.  
We have configured a Lambda function which will raise an exception if the `name` property is `None` or empty string in the event.  
We use this to show that for asynchronous invocation, the response is the same whether the property `name` is defined in the event or not.  
We have also configured a Dead Letter Queue to capture all failed asynchronous invocations.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaAsync.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaAsync.yaml  --stack-name LambdaAsync --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**  
Get the `QueueUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaAsync --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Invoke the Lambda function synchronously (successful invocation)

```bash
$ aws lambda invoke --function-name SimpleFunc --cli-binary-format raw-in-base64-out --payload '{"from": "sync", "name": "chucks" }' response-1.json
```

The response `StatusCode` will be 200 and ` response-1.json` should contain the response body with `statusCode` 200 and other response properties.

2. Invoke the Lambda function synchronously (unsuccessful invocation)

```bash
$ aws lambda invoke --function-name SimpleFunc --cli-binary-format raw-in-base64-out --payload '{"from": "sync", "name": "" }' response-2.json
```

The response `StatusCode` will be 200 and ` response-2.json` should contain the `errorMessage` and `Exception` details.

3. Invoke the Lambda function asynchronously (successful invocation)

```bash
$ aws lambda invoke --function-name SimpleFunc --cli-binary-format raw-in-base64-out --payload '{"from": "async", "name": "chucks" }' --invocation-type Event response-3.json
```

The response StatusCode will be 202 and `response-3.json` will be empty.

Take note of the parameter `--invocation-type Event`, that is how to simulate asynchronous invocation using the CLI.

4. Invoke the Lambda function asynchronously (unsuccessful invocation)

```bash
$ aws lambda invoke --function-name SimpleFunc --cli-binary-format raw-in-base64-out --payload '{"from": "async", "name": "" }' --invocation-type Event response-4.json
```

Again, the response StatusCode will be 202 and `response-4.json` will be empty, no different from a successful asynchronous invocation.

5. Check the Lambda Logs on CloudWatch and look out for retries of the asynchronously invocation. You can notice this by looking for the RequestId that appears multiple times in the logs.

6. Check the Dead Letter Queue for failed invocations

```bash
$ aws sqs receive-message --queue-url <queue-url>
```

A message should be in the DeadLetterQueue and the message `Body` will be the payload of the asynchronous invocation.

**Summary:** Synchronous invocations waits for the response and do will get a success or failure response.  
Asynchronous invocations does NOT wait for a response and so always get a 202 response status and empty response.  
Lambda will retry 3 times for asynchronous invocations, and if the 3rd time fails it will send the request payload to a Dead Letter Queue if one is available.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaAsync
```
