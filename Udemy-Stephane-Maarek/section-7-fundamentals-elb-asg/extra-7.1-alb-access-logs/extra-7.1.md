# Extra-7.1: ALB Access Logs
### Description  
You can configure Access Logs for an Application Load Balancer (ALB).  
Since late 2019, ALBs support Access Logs delivered to _Amazon S3_. You can also optionally use _Kinesis Data Firehose_ for real-time log streaming.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint AlbAccessLogs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AlbAccessLogs.yaml  --stack-name AlbAccessLogs --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AlbAccessLogs > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AlbAccessLogs
```

### Learn More
