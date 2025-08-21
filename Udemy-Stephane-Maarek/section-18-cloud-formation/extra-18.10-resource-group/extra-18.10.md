# Extra-18.10: Resource Group

### Description

In this configuration we demonstrate the use of Resource Groups in AWS.  
We creates two Resource Groups one with CloudFormation stack grouping criteria so that all the resources in the stack are included.  
The other Resource Group uses the Tag Based Grouping Criteria to include all the resources with the tag `Environment=Development`.

There are two templates here, `AnyStack.yaml` which deployes the resources we will be grouping and `ResourceGroup.yaml` which creates the actual Resource Groups.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint AnyStack.yaml
$ cfn-lint ResourceGroup.yaml
```

1.  Test deploy the AnyStack stack

```bash
$ aws cloudformation deploy --template-file AnyStack.yaml --stack-name AnyStack  --capabilities CAPABILITY_NAMED_IAM
```

2. Delete the ResourceGroup stack

```bash
$ aws cloudformation deploy --template-file ResourceGroup.yaml --stack-name ResourceGroup
```

**After Deployment**

**Testing**  
Go the the Resource Groups Console and check out the two Resource Groups created.  
On group - `SimpleGroup` should contains all the resources in the `AnyStack` stack.  
The other group - `AnotherGroup` should contain all the resources with the tag `Environment=Development`.

**Debug Errors**

**Cleanup**

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name ResourceGroup
$ aws cloudformation delete-stack --stack-name AnyStack
```
