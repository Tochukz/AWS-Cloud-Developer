# Extra-4.2: Time Based Policy

### Description

A temporary Developer needs to be provided with access to specific resources for a one week period.   
Configure an IAM Policy that grants the developer access for only a week starting from today.  

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint TimeBasedPolicy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file TimeBasedPolicy.yaml  --stack-name TimeBasedPolicy  --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**


**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name PolicyVariables > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name TimeBasedPolicy
```
