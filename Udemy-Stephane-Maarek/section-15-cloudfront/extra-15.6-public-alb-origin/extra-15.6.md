# Extra 15.5 - CloudFront with Public ALB as Origin Server

### Description

This configuration sets up a public Application Load Balancer as the origin server for a CloudFront distribution.  

If you want to use a private Application Load Balancer instead, checkout `extra-15.4-alb-vpc-origin`.  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint PublicAlbOrigin.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file PublicAlbOrigin.yaml  --stack-name PublicAlbOrigin --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  


**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name PublicAlbOrigin
```
