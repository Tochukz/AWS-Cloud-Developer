# Extra-18.6: Custom Resource

### Description

### Operation

**Before Deployment**
Deploy the Lambda Code

```bash
$ ./deploy.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint CustomResource.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CustomResource.yaml --stack-name CustomResource  --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**

**Testing**

**Debug Errors**

**Cleanup**

Delete the `CustomResource` stack

```bash
$ aws cloudformation delete-stack --stack-name CustomResource
```
