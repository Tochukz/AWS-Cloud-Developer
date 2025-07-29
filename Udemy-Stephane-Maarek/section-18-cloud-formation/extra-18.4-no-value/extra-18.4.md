# Extra-18.4: NoValue Pseudo Parameter

### Description

This example demonstrates the use the the `AWS::NoValue` pseudo parameter.

The `AWS::NoValue` pseudo parameter can be used to not set any value for a resource property when a certain condition is not met.  
It is often used in conjunction with the `!If ` intrinsic function.

Here we conditionaly set the `VersioningConfiguration` of an S3 bucket to `Status: Enabled` if `ShouldSetVersioning` condition is true, otherwise we do not set `VersioningConfiguration` at all making it fall back to it's default.  
This is made possible using the `AWS::NoValue` pseudo parameter.  
Without this technique we may have been forced to set the `VersioningConfiguration` to `Status: Suspended` since the two allowable values for VersioningConfiguration is `Status: Enabled` and `Status: Suspended`.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint NoValue.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file NoValue.yaml --stack-name NoValue --disable-rollback
```

**After Deployment**

**Testing**

1. Check the bucket versioning for bucket-1

```bash
$ aws s3api get-bucket-versioning --bucket simple-bucket-30-07-1
```

This should return `{"Status": "Enabled" }`.

2. Check the bucket versioning for bucket-2

```bash
$ aws s3api get-bucket-versioning --bucket simple-bucket-30-07-2
```

This should return empty response.

**Debug Errors**

**Cleanup**  
Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name NoValue
```
