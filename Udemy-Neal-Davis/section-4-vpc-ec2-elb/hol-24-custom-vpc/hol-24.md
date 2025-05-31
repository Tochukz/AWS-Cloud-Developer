# Create a Custom VPC - HOL-24

### Description

This template creates a custom VPC with it's associated resources, including public & private subnets, internet gateway and public & private route tables.

**Things to keep in mind**

1. When you create a VPC, a default RouteTable is automatically created for you which serves as the `Main` RouteTable for the VPC.
2. Any Subnet that is not explicitly associated to a RouteTable will be implicitly associated to the default RouteTable
3. You can see this by going to the VPC Console > Route tables, select the route table associated with the Custom VPC, click on the _Subnet Associations_ tab.
4. Any subnet that you have not yet associated with a RouteTable will be listed there.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint CustomVpc.yaml
```

Deploy the CustomVpc stack

```bash
$ aws cloudformation deploy --template-file CustomVpc.yaml --stack-name CustomVpc
```

**After deployment**  
Get the `PublicIp` from the stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name CustomVpc --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the EC2 instance using the `PublicIp`

```bash
$ ssh -i dev-simple-key.pem ec2-user@18.132.52.65
```

2. While inside the instance, ping google.com

```bash
$ ping google.com
```

If the the packets received are not 0, it shows that the instance has access to the internet.

3. Use your browser to access the Website over using the public IP (http://18.132.52.65)

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name CustomVpc > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CustomVpc
```
