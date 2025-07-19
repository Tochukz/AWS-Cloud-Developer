# Lesson 246: CloudWatch Logs - Metric Filter - Hands On

### Description

We can create a Custom Metric from our application logs using a _Metric Filter_.  
For example, we can track the word _"error"_ that is ingested in our application logs and create a Metric out of it.  
This can be useful to determine the error rate of our application.  
We can then configure an Alarm to send out an SNS notification when the metric reaches a certain threshold.  
For example, if the word _"error"_ occurs more than 10 times in a minute, it could be made to trigger a CloudWatch Alarm.

In this confguration, we create a LogGroup to collect our application logs.  
We then create a Metric filter to aggregate all the application Logs that contains the word "error".  
A CloudWatch Alarm is configured to monitor the Metric Filter.  
If the instances of the word "erorr" is 5 or more within a period of 60 seconds (1 minute), the CloudWatch Alarm goes into the Alarm state and triggers a notification through an SNS topic.  
So we get an email notification if 5 or more error happens within a minute.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint MetricFilter.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file MetricFilter.yaml  --stack-name MetricFilter --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Go to you email inbox of the `SubscriptionEmail` and confirm the SNS subscription.

**Testing**

1. Start the script to send logs to the LogGroup every second.

```bash
$ cd scripts
$ npm install
$ node put-logs.js
```

2. Wait for a few minutes until you receive an email notification from the SNS topic.

3. Go to the CloudWatch Console

4. Check out the Alarm to confirm if it is now in the Alarm state

5. Check out the LogGroup to see the log entries

6. Check out the Metrics to see the Custom Metric created

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name MetricFilter
```
