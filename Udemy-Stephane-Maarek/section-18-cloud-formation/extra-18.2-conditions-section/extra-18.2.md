# Extra-18.2: Conditions Section

### Description

This example demonstrates how the `Conditions` section can be used to conditionally create a resource in a stack.  
For example, we created the S3 bucket only when the region is `eu-west-1` or `eu-west-3`, otherwise the bucket is not created.  
Also we use `t2.micro` instance type only when the `Env` parameter is set to `Prod`, otherwise we use `t2.nano` instance type.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint Conditions.yaml
```

1. Deploy the stack in `eu-west-1` using `Uat` for the `Env` parameter

```bash
$ aws cloudformation deploy --template-file Conditions.yaml --stack-name Conditions  --parameter-overrides Env=Uat --region eu-west-1
```

2.  Deploy the stack in `eu-west-2` using `Dev` for the `Env` parameter

```bash
$ aws cloudformation deploy --template-file Conditions.yaml --stack-name Conditions  --parameter-overrides Env=Dev --region eu-west-2
```

3.  Deploy the stack in `eu-west-3` using `Prod` for the `Env` parameter

```bash
$ aws cloudformation deploy --template-file Conditions.yaml --stack-name Conditions  --parameter-overrides Env=Prod --region eu-west-3
```

**After Deployment**

**Testing**

1. Go to the EC2 Console for each region and check the instances created.  
   The EC2 instance in `eu-west-1` and `eu-west-2` should be `t2.nano`, while the instance in `eu-west-3` should be `t2.micro`.
2. Go to the EC2 Console for each region and check the instances created.  
   The instances named `DevInstance` and `UatInstance` should be of `t2.nano` instance type, while the instance named `ProdInstance` should be of `t2.micro` instance type.

3. Go to the S3 Console and search for the bucket name "simple-bucket-1407-".  
   You should only find "simple-bucket-1407-uat" and "simple-bucket-1407-prod".

**Debug Errors**

**Cleanup**  
Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Conditions --region eu-west-1
$ aws cloudformation delete-stack --stack-name Conditions --region eu-west-2
$ aws cloudformation delete-stack --stack-name Conditions --region eu-west-3
```
