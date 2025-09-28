# Extra-7.2: Lambda, VPC and ALB
### Description

This configuration puts a Lambda function in a VPC.
The Lambda function sits in a private subnet and as a target group for the ALB.  

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint LambdaVpcAlb.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file LambdaVpcAlb.yaml --stack-name LambdaVpcAlb --capabilities CAPABILITY_NAMED_IAM
```

**After deployment**

**Testing**  

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name LambdaVpcAlb
```
