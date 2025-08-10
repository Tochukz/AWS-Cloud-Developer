# Lesson 434: Secrets Manager - Hands On

### Description

Create A Secret on Secrets Manager

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint SecretsManager.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SecretsManager.yaml --stack-name SecretsManager --parameter-overrides file://secret-parameters.json
```

**After Deployment**

**Testing**  
Go the the Secrets Manager console and check the secret created.

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name SecretsManager
```
