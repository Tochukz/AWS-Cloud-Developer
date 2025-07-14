# Extra-18.5: Service Role

### Description

Consider a situation where you want to grant a developer the permission to deploy a stack but don't want to grant the developer the permission to operate the resources contained within the stack.  
For example, you may want the developer to be able to deploy a stack containing EC2 instance and IAM role but you don't want to give the developer the permission to Create EC2 instance or IAM role.  
This example solves that problem.

We created `ServiceRole` stack that grant the user, `john` the permission to deploy a CloudFormation stack and also to pass a Service Role that have sufficient permission to allow CloudFormation create EC2 instances and IAM roles on his behalf.  
After that, we use the `SimpleStack` template as an example to demontrate the setup in action.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint ServiceRole.yaml
$ cfn-lint SimpleStack.yaml
```

1.  Deploy the `ServiceRole` stack

```bash
$ aws cloudformation deploy --template-file ServiceRole.yaml --stack-name ServiceRole  --capabilities CAPABILITY_IAM
```

2. Try using the `john` profile to deploy the `SimpleStack` stack

```bash
$ aws cloudformation deploy --template-file SimpleStack.yaml --stack-name SimpleStack  --capabilities CAPABILITY_IAM --profile john
```

This should fail because `john` user does not have permission to provision EC2 instances or IAM roles.  
John will also not be able to delete the failed stack, so you have to delete the stack with your admin profile.

3. Delete the failed stack with you admin profile

```bash
$ aws cloudformation delete-stack --stack-name SimpleStack
```

4. Get the `ServiceRoleArn` from the `ServiceRole` stack

```bash
# Use can use the john profile to do this now
$ aws cloudformation describe-stacks --stack-name ServiceRole --query "Stacks[0].Outputs" --no-cli-pager --profile john
```

5. Now try again to deploy the `SimpleStack` stack using `john` profile but this time, with the `--role-arn` option pointing to the `ServiceRoleArn`

```bash
$ aws cloudformation deploy --template-file SimpleStack.yaml --stack-name SimpleStack  --capabilities CAPABILITY_IAM --profile john --role-arn <service-role-arn>
```

**After Deployment**

**Testing**

**Debug Errors**

**Cleanup**

1. Delete the stacks using `john` profile

```bash
$ aws cloudformation delete-stack --stack-name SimpleStack --profile john
# This should fail mid-way because john permission is being deleted along the way
$ aws cloudformation delete-stack --stack-name ServiceRole --profile john
```

John is able to delete the `SimpleStack` stack without the `--role-arn` option.  
This is a rather suprising outcome.  
However, John fails to delete the `ServiceRole` stack.

2. Delete the `ServiceRole` stack using you admin profile

```bash
$ aws cloudformation delete-stack --stack-name ServiceRole
```
