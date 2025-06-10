# Destinations and DLQ - HOL-82

### Description

This example configures success and failure destination for asynchronous invocation of a Lambda function.  
It also configures a dead letter queue to hold a record of all failed invocation after 2 retry attempts.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint DestinationAndDlq.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DestinationAndDlq.yaml --stack-name DestinationAndDlq --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```

**After deployment**

1. Go to the email inbox for the email you supplied as `SubscriptionEmail` parameter and accept the SNS subscription confirmation.
2. Get the Queue URLs and Topic Arn from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name DestinationAndDlq --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Invoke the lambda function asynchronously to simulate a successful execution

```bash
$ aws lambda invoke --function-name DestinationFunc --invocation-type Event --payload $(echo '{"Success":true}' | base64) output-1.json
```

2.  Invoke the lambda function asynchronously to simulate a failed execution

```bash
$ aws lambda invoke --function-name DestinationFunc --invocation-type Event --payload $(echo '{"Success":false}' | base64) output-2.json
```

3. Check the success queue for a success message

```bash
$ aws sqs receive-message --queue-url <success-queue-url> --max-number-of-messages 5
```

4. Check the DL queue for a failure message

```bash
$ aws sqs receive-message --queue-url <dlq-url> --max-number-of-messages 5
```

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name DestinationAndDlq
```
