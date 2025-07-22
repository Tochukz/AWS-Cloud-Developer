# Lesson 281: Lambda Event Source Mapping (SQS) - Hands On

### Description

The example configures a Lambda EventSource Mapping with an SQS Queue as the source.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint SqsEventSource.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SqsEventSource.yaml  --stack-name SqsEventSource --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**
Get the `QueueUrl` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SqsEventSource --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Send a batch messages to the Queue

```bash
$ aws sqs send-message-batch --queue-url <queue-url> --entries  file://messages.json
```

Go to the Lambda's logs to see the output.  
I saw three logs, one for each message in the batch and all in different log stream.
See `sample-sqs-event.json` for an example of each log.

2. Send a single message to the Queue

```bash
$ aws sqs send-message --queue-url <queue-url> --message-body file://message.json
```

Check the Lambda's log and `sample-sqs-event.json` for an example.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SqsEventSource
```
