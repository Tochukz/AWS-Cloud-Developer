# Lesson 427: S3 Bucket Key

### Description

This configuration show how to enable `BucketKey` in an S3 bucket.  
When `BucketKey` is enabled, S3 makes less API calls to AWS KMS which leads to cost savings.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint BucketKey.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BucketKey.yaml --stack-name BucketKey
```

**After Deployment**

**Testing**

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name BucketKey
```
