# Lesson 284: Lambda Destination - Hands On

### Description

The configuration creates a Success and Failure destination for Lambda Asynchrounous invocations.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint LambdaDestination.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaDestination.yaml  --stack-name LambdaDestination --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**  
Get the `SuccessQueueUrl` and `FailureQueueUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name LambdaDestination --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Do a successfull asynchrounous invocation

```bash
$ aws lambda invoke --function-name DestinationFunc --cli-binary-format raw-in-base64-out --invocation-type Event --payload '{"action": "run"}' response-1.json
```

2. Simulate a failed asynchronous invocation

```bash
$ aws lambda invoke --function-name DestinationFunc --cli-binary-format raw-in-base64-out --invocation-type Event --payload '{"action": "error"}' response-2.json
```

3. Check the Success Queue for messages

```bash
$ aws sqs receive-message --queue-url <success-queue-url>
```

You should get one mesage from the Success Queue.

4. Wait for a few minnutes for the failure invocation retries (2 retries) to happen, then check the Failure Queue

```bash
$ aws sqs receive-message --queue-url <failure-queue-url>
```

You should see a single message in the Failure Queue as well.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name LambdaDestination
```
