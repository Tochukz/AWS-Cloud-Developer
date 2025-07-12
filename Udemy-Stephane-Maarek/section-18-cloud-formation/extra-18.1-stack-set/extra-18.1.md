# Extra-18.1: Stack set

### Description

This example demonstrates how to deploy a stack instance to multiple AWS regions using a StackSet

A StackSet is used to deploy a stack to multiple AWS region and/or AWS accounts. Each of the stack deployed is called a stack instance.  
StackSets are useful for managing resources across multiple regions or accounts in a consistent manner.

In this example we deploy the stack represented by the template `SimpleStack.yaml` to three region in the same account - `eu-west-1`, `eu-west-2` and `eu-west-3`.

We have made two templates:

1. `SimpleStack.yaml` - This is the template that creates the resources we want to deploy for each stack instance.
2. `StackSet.yaml` - This is the template that creates the StackSet and deploy the `SimpleStack` stack to multiple regions.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint SimpleStack.yaml
$ cfn-lint StackSet.yaml
```

1.  Test deploy the stack's template to make sure it works

```bash
$ aws cloudformation deploy --template-file SimpleStack.yaml --stack-name SimpleStack  --capabilities CAPABILITY_NAMED_IAM
```

2. Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SimpleStack
```

3. Copy the template to S3 bucket

```bash
$ aws s3 cp SimpleStack.yaml s3://chucks-workspace-storage/templates/SimpleStack.yaml
```

4. Deploy the stack set

```bash
$  aws cloudformation deploy --template-file StackSet.yaml --stack-name StackSet  --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

1. View the stack set

```bash
$ aws cloudformation describe-stack-set --stack-set-name SimpleSet
```

**Testing**

1. Go to the CloudFormation console > StackSet > select the stack set > Stack instances tab, to see the deployed stacks in each region.
2. Go to the S3 console search for the buckets "simple-bucket-1207-".
   This should return three buckets, one for each region.
3. Go to the IAM console > Roles, search for the role "LambdaRole".
   This should return three roles, one for each region.
4. Go to the Lambda console > Functions, search for the function "SimpleLambda".
   Change the region to see the function in each region.

**Debug Errors**

**Cleanup**  
You can delete the stack set itself, but you must first delete the stack instances.

```bash
# You must delete the stack instances before deleting the stack set.
$ aws cloudformation delete-stack-instances \
  --stack-set-nameSimpleSet\
  --regions ue-west-1,eu-west-2,eu-west-3 \
  --accounts <account> \
  --no-retain-stacks \
  --operation-preferences FailureToleranceCount=0,MaxConcurrentCount=1

# Delete the stack set
$ aws cloudformation delete-stack-set --stack-set-name SimpleSet
```

Or in our case, we can just delete the stack that holds the stack set.

```bash
$ aws cloudformation delete-stack --stack-name StackSet
```

### Learn More

**Permissions**

- For _SERVICE_MANAGED_ StackSets (via AWS Organizations), AWS automatically handles cross-account roles.
- For _SELF_MANAGED_ StackSets, you must create an administrator role in the management account and a execution role in the target accounts.

Example role names:

- Admin role: AWSCloudFormationStackSetAdministrationRole
- Execution role: AWSCloudFormationStackSetExecutionRole

AWS provides a prebuilt policy for these.
