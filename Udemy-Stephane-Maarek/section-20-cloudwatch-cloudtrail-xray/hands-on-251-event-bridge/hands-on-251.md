# Lesson 246: CloudWatch Logs - Metric Filter - Hands On

### Description

This configuration creates an AWS Event Bridge Rule with a pattern that matches the _EC2 Instance State-change Notification_ event.  
When an EC2 instance is stopped or terminated, the event triggers an SNS topics which sents out a notification to the subscribed email address.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint EventRule.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EventRule.yaml  --stack-name EventRule --parameter-overrides file://private-parameters.json
```

**After Deployment**

1. Go to the email inbox of the email supplied for the `SubscriptionEmail` parameter and confirm the SNS subscription.
2. Get the `InstanceId` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name EventRule --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Using the `InstanceId`, stop the EC2 instance

```bash
$ aws ec2 stop-instances --instance-id <instance-id>
```

Check your `SubscriptionEmail` to see if you get a notification about the stopped instance event.

2. Terminate the EC2 instance

```bash
$ aws ec2 terminate-instances --instance-id <instance-id>
```

Check your email again to see if you get a notification about the termination of the instance.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EventRule
```
