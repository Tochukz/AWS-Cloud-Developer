# Extra 6.1 - Intrinsic Functions

### Description

This configuration shows how to use the following intrinsic functions

- Fn::Cidr
- Fn::GetAZs
- Fn::Select
- Fn::Join

The `Fn::Cidr` instrinsic function is used to divide the CIDR block of the custom VPC to 6 equal CIDR blocks having a maximum of 251 IPv4 addresses.
These CIDR blocks are used the 3 private and 3 public subnets.

Compare the `subnets.png` and `cidr-blocks.png` snapshots, in the results folder, to see how the CIDR blocks were assigned.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint IntrinsicCidr.yaml
```

Deploy the IntrinsicCidr stack

```bash
$ aws cloudformation deploy --template-file IntrinsicCidr.yaml --stack-name IntrinsicCidr
```

**After deployment**  
Get the stack Outputs

```bash
$ aws cloudformation describe-stacks --stack-name IntrinsicCidr --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name IntrinsicCidr > events.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name IntrinsicCidr
```
