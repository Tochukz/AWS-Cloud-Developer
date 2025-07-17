# Extra 15.5 - CloudFront with Public EC2 Instance as Origin Server

### Description

This configuration sets up a public EC2 instance as the origin server for a CloudFront distribution.  

If you want to use a private EC2 instance instead, checkout `extra-15.3-ec2-vpc-origin`.  

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint PublicEc2Origin.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file PublicEc2Origin.yaml  --stack-name PublicEc2Origin --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  


**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name PublicEc2Origin
```
