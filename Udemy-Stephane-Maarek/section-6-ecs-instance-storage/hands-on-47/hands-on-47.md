# Lesson 47: EBS - Hands On

### Description

This configuration creates an EBS volume and attaches it to an EC2 instance

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Ebs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Ebs.yaml  --stack-name Ebs
```

**After Deployment**

**Testing**  
Go to the EC2 Console and check out the Instance and Volume.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Ebs > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Ebs
```
