# Lesson 222: Dead Letter Queues - Hands On

### Description

This example demonstrates how dead letter queues are configured and used.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint DeadLetterQueue.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DeadLetterQueue.yaml --stack-name DeadLetterQueue
```

**After Deployment**

Get the Queue URLs and ARNs from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name DeadLetterQueue --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Push a message into the source queue

```bash
$ aws sqs send-message --queue-url <SimpleQueueUrl> --message-body "Hello Cloud Architect"
$ aws sqs send-message --queue-url <SimpleQueueUrl> --message-body "Cloud Architect Chucks"
```

2. Receive the message from the queue

```bash
$ aws sqs receive-message --queue-url <SimpleQueueUrl> --max-number-of-messages 5
```

3. Wait for 5 seconds (visibility timeout) and then run the `receive-message` operation again. Do this two times.

4. After the third attempt, the message should be moved to the dead letter queue. You can check this by running:

```bash
$ aws sqs receive-message --queue-url <DlQueueUrl>
```

5. Alternatively, you can go to the SQS Console and see the messages available in the dead letter queue versus the source queue.

6. Redrive the messages from the dead letter queue back to the source queue

```bash
$ aws sqs start-message-move-task --source-arn <DlQueueArn> --destination-arn <QueueArn>
```

7. Wait a few seconds and then check the source queue again to see if the messages have been moved back

```bash
$ aws sqs receive-message --queue-url <SimpleQueueUrl> --max-number-of-messages 5
```

**Debug Errors**

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name DeadLetterQueue
```
