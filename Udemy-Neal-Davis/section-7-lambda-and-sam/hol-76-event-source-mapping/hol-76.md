# Create Event Source Mapping - HOL-76

### Description

This configuration shows how Event Source Mapping can be setup for SQS queue messages to be polled by Lambda for send-message event message that is delivered to the Queue.

### Operation

**Before deployment**

Create a Zip package of the python code

```bash
$ zip function.zip lambda.py
$ aws s3 cp function.zip s3://chucks-workspace-storage/v0.0.1/event-function.zip
```

**Deployment**

Lint the templates

```bash
$ cfn-lint EventSource.yaml
```

Deploy the EventSource stack

```bash
$ aws cloudformation deploy --template-file EventSource.yaml --stack-name EventSource --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**  
Get the Queue URL from the stack outputs

```bash
$ aws cloudformation describe-stacks  --stack-name EventSource --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Send a message to the Queue

```bash
$ aws sqs send-message --queue-url <queue-url> --message-body 'Hello from Lambda'
```

2. Go to the CLoudWatch logs for the Lambda and confirm that the text "Received message: Hello from Lambda" is found in the logs.

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name EventSource > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name EventSource
```
