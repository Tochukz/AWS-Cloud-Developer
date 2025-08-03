# Lesson 396: Cognito User Pool - Hands On

### Description

In this example creates create a Cognito User pool that allows user to login using an email.

### Operation

**Before Deployment**

**Deployment**  
Deploy the stack

```bash
$ aws cloudformation deploy --template-file UserPool.yaml --stack-name UserPool --parameter-overrides file://private-parameters.json
```

**After Deployment**
Get stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name UserPool --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name UserPool
```
