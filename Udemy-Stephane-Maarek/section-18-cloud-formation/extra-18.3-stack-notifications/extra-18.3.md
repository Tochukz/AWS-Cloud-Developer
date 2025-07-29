# Extra-18.3: Stack Notification

### Description

This example demonstrates the use the the `AWS::NotificationARNs` pseudo parameter.

The `AWS::NotificationARNs` pseudo parameter  is used to get the SNS topic ARNs that are set to receive notification for stack events.  
The notification ARN in question will be the same notIfication ARN that was supplied during stack deployment operation using the `--notification-arns` option.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint SnsTopics.yaml
$ cfn-lint StackNotification.yaml
```

1.  Deploy the `SnsTopics` stack

```bash
$ aws cloudformation deploy --template-file SnsTopics.yaml --stack-name SnsTopics  --parameter-overrides file://private-parameters.json
```

2. Go to the email inbox of the emails address supplied for the `SubscriptionEmail1` and `SubscriptionEmail2` parameters, and confirm the SNS topic subscription.

3. Get the SNS topic ARNs from the `SnsTopics` stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SnsTopics --query "Stacks[0].Outputs" --no-cli-pager > outputs-1.json
```

4. Deploy the `StackNotification` stack using the SNS topic ARNs from the previous step

```bash
$ aws cloudformation deploy --template-file StackNotification.yaml --stack-name StackNotification --notification-arns <topic-arn-1> <topic-arn-2>
```

**After Deployment**

Go to each email inbox of the emails address supplied for the `SubscriptionEmail1` and `SubscriptionEmail2` parameters, and check for stack event notification.  
 I received 6 email notification after the successful deployment of the `StackNotification` stack.

**Testing**

To see the `AWS::NotificationARNs` in action, you can check the output of the `StackNotification` stack

```bash
$ aws cloudformation describe-stacks --stack-name StackNotification --query "Stacks[0].Outputs" --no-cli-pager
```

You should find an array of SNS topic ARNs which is the same list that was supplied during the deployment of the `StackNotification` stack.

**Debug Errors**

**Cleanup**  
Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SnsTopics
$ aws cloudformation delete-stack --stack-name StackNotification
```
