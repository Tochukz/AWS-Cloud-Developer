# Lesson 31: Budget - Hands On

### Description

This configuration creates a Budget for an AWS account.  
The budget will send out a notification when the target amount is at 80% and 100%.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Budget.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Budget.yaml  --stack-name Budget --parameter-overrides file://private-parameters.json
```

**After Deployment**

**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Budget > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Budget
```
