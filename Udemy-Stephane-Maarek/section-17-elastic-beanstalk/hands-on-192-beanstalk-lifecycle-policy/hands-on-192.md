# Lesson 192: Beanstalk Lifecycle Policy Overview - Hands On

### Description

This configuration sets up `VersionLifeCycleConfig` for an Elastic Beanstalk application.  
_VersionLifeCycleConfig_ determines how long Application Versions can live before they are deleted.  
This is done to avoid having too many application version so that your account do not exceed AWS limit of 1000 application versions per region per AWS account.  
_VersionLifeCycleConfig_ also give us the option of deleting the associated code artifact in S3 in addition to removing the version.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint VersionLifeCycle.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file VersionLifeCycle.yaml  --stack-name VersionLifeCycle --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `PublicIp` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name VersionLifeCycle --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name VersionLifeCycle
```
