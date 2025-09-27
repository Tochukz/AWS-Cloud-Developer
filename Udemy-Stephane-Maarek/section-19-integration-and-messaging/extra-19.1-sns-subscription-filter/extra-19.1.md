# Extra 19.1: SNS Subscription with Filter

### Description

This example shows how we can create SNS Subscription with filter so that messages are sent to the subscribers only when the message contains certain attributes specified in the Filter Policy.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint SnsSubscriptionFilter.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SnsSubscriptionFilter.yaml --stack-name SnsSubscriptionFilter --parameter-overrides file://private-parameters.json
```

**After Deployment**

1. Go to your email inbox for the email supplied as `SalesSubscriptionEmail` and `OrderSubscriptionEmail` parameter and access the subscriptino confirmation.

2. Get the `TopicArn`

```bash
$ aws cloudformation describe-stacks --stack-name SnsSubscriptionFilter --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Publish a message to the Topic that targets the `SalesSubscription` subscribers

```bash
$ aws sns publish \
  --topic-arn arn:aws:sns:eu-west-2:314146339647:simple-topic \
  --message "New Sales Arrival" --message-attributes file://sales-attributes.json
```

This message will only be recived by the Email Subscribed to the `SalesSubscription`

2. Publish a message to the Topic that targets the `OrderSubscription` subscribers

```bash
$ aws sns publish \
  --topic-arn arn:aws:sns:eu-west-2:314146339647:simple-topic \
  --message "New Order Made" --message-attributes file://order-attributes.json
```

This message will only be recived by the Email Subscribed to the `OrderSubscription`.

3. Publish another message to the Topic that targets the `OrderSubscription` subscribers

```bash
$ aws sns publish \
  --topic-arn arn:aws:sns:eu-west-2:314146339647:simple-topic \
  --message "New Packaging Ready" --message-attributes file://packing-attributes.json
```

This message will again only be recived by the Email Subscribed to the `OrderSubscription`.

4. Publish another message to the Topic that does not match any of the filer.

```bash
$ aws sns publish \
  --topic-arn arn:aws:sns:eu-west-2:314146339647:simple-topic \
  --message "Random message"
```

This message will not be delivered ot any of the subscribers

**Debug Errors**

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SnsSubscriptionFilter
```
