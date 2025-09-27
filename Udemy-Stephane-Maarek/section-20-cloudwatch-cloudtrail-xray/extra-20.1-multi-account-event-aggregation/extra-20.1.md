# Extra-20.1 EventBridge - Multi-account Aggregation

### Description

This configuration configure an Event Bus that can monitor events from multiple AWS account.  
This is useful when you want to aggregate events coming from multiple AWS account into a central Event Bus.      
For example you can aggregate all events from your AWS Organization in a single AWS account or AWS region.  

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint MultiAccountBus.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file MultiAccountBus.yaml  --stack-name MultiAccountBus --parameter-overrides file://private-parameters.json
```

**After Deployment**



**Testing**


**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name MultiAccountBus
```
