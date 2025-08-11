# Lesson 437: CloudWatch Logs Encryption

### Description

This configuration show how to configure AWS CloudWatch Logs to use AWS Key Management Service (KMS) for encryption.  
This is useful for ensuring that log data is encrypted at rest, providing an additional layer of security.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint CloudWatchKms.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CloudWatchKms.yaml --stack-name CloudWatchKms
```

**After Deployment**

**Testing**  
Go the the CloudWatch Logs console and verify that the log group has KMS key ID associated with it.

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name CloudWatchKms
```
