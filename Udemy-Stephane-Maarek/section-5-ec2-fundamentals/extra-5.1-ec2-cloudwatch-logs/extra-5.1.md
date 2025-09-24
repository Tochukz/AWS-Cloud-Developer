# Extra-5.1: EC2 CloudWatch Logs

### Description

In this example we integrate a CloudWatch LogGroup to an EC2 instance so that Logs from the EC2 instance are sent to the CloudWatch LogGroup.   

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Ec2CloudWatchLog.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Ec2CloudWatchLog.yaml  --stack-name Ec2CloudWatchLog --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**


**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Ec2CloudWatchLog > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Ec2CloudWatchLog
```

### Learn More
