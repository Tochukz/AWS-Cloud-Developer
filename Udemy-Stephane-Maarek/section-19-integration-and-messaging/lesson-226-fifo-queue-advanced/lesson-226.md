# Lesson 226: Fifo Queue Advanced

### Description

Configure a Fifo Queue

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint FifoQueue.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file FifoQueue.yaml --stack-name FifoQueue
```

**After Deployment**

Get the `QueueUrl` from the stack output

```bash
$ aws cloudformation describe-stacks --stack-name FifoQueue --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Send a message twice into the Queue

```bash
$ aws sqs send-message --queue-url <QueueUrl> --message-body "Hello World" --message-group-id GroupX
$ aws sqs send-message --queue-url <QueueUrl> --message-body "Hello World" --message-group-id GroupX
```

2. Go the the SQS Console and check the message count, in the queue.  
   You should get a message count of 1.

3. Purge the Queue to empty all it's messages

```bash
$ aws sqs purge-queue --queue-url <QueueUrl>
```

4. Send another message twice but with different deduplication ID

```bash
$ aws sqs send-message --queue-url <QueueUrl> --message-body "Hello Architect" --message-group-id GroupX --message-deduplication-id 1X
$ aws sqs send-message --queue-url <QueueUrl> --message-body "Hello Architect" --message-group-id GroupX --message-deduplication-id 2X
```

5. Go the the SQS Console and check the message count, in the queue.  
   You should get a message count of 2.

6. Summary:

- When _ContentBasedDeduplication_ is enabled for a queue messages with identical content are treated as deplicate and only one will be preserved
- When we supply a _MessageDeduplicationId_ when sending a message it overrides the SHA-256 DeduplicationId which would have been created by SQS if otherwise.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name FifoQueue
```
