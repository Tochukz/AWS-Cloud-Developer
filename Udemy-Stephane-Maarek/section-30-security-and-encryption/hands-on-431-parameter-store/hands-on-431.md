# Lesson 431: SSM Parameter Store - Hands On

### Description

Create parameters for Database URL and Password for Dev and Prod environments.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint ParameterStore.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ParameterStore.yaml --stack-name ParameterStore --parameter-overrides file://secret-parameters.json
```

**After Deployment**

**Testing**

1. Get all parameters by name

```bash
$ aws ssm get-parameters --names /myapp/dev/db-url /myapp/dev/db-password
```

2. Get parameters and decrypt on the fly

```bash
# This is applicable only for SecureString parameter type
$ aws ssm get-parameters --names /myapp/dev/db-url /myapp/dev/db-password --with-decryption
```

Note: Parameters of type SecureString are not supported by AWS CloudFormation.  
To create Parameters of type SecureString, use AWS CLI.

3. Get parameters by path

```bash
# Very useful when you parameter name simulates a tree structure like we have
$ aws ssm get-parameters-by-path --path /myapp/prod/
```

4. Get parameter by path with --recursive flags

```bash
$ aws ssm get-parameters-by-path --path /myapp/ --recursive
```

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name ParameterStore
```
