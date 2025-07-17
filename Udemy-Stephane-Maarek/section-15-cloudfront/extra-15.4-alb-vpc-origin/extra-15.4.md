# Extra 15.4 - CloudFront with ALB Origin using VPC Origin

### Description

This example is a modification of `extra-15.3-ec2-vpc-origin` where we configured a private EC2 instance for the origin server of a CloudFront distribution, but here instead of an EC2 instance in a private subnet, we have a private Application Load Balancer as the origin server.   
Like EC2 VPC origin, ALB VPC origin is also made possible by using a VPC Origin.   

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint AlbVpcOrigin.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AlbVpcOrigin.yaml  --stack-name AlbVpcOrigin --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  


**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AlbVpcOrigin
```
