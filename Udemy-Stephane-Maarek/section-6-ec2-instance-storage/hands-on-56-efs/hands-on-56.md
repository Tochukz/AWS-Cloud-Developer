# Lesson 56: EFS - Hands On

### Description

This configuration creates an EFS File System and mounts it to two EC2 instances in different availability zones.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint Efs.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Efs.yaml  --stack-name Efs --parameter-overrides file://private-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `Instance1PublicIP` and `Instance2PublicIP` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name Efs --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into Instance1 and create a file in the mounted EFS file system

```bash
$ ls -la /mnt/efs
# Elevate your user to root user
$ sudo su
# Create a file in the EFS file system
$ echo "Hello world" > /mnt/efs/hello.txt
$ cat /mnt/efs/hello.txt
$ mkdir /mnt/efs/tests
```

2. SSH into Instance2 and update the file in the mounted EFS file system created in Instance1

```bash
$ ls -la /mnt/efs
$ cat /mnt/efs/hello.txt
# Elevate your user to root user
$ sudo su
# Add test to the file
$ echo "Welcome world!" >> /mnt/efs/hello.txt
```

3. Go back to the Instance1 shell and view the updated file

```bash
$ cat /mnt/efs/hello.txt
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Efs > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name Efs
```
