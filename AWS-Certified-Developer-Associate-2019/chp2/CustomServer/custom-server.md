# Lesson 52: EBS Snapshots - Hands on

### Description

This templates configures an EC2 instance and installs an Apache Server using an external Bash script.  
The Bash script customizes a web page in the server using the EC2 MetaData service and Amazon Polly.

### Operation

**Deployment**  
Validate the template

```bash
$ cfn-lint CustomServer.yaml
```

Deploy a stack using the CloudFormation template

```bash
$ aws cloudformation deploy \
    --template-file CustomServer.yaml \
    --stack-name CustomServer \
    --capabilities CAPABILITY_NAMED_IAM
```

**Post Deployment**  
Get the Public IP and DNS Name from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name CustomServer  --query "Stacks[0].Outputs" --no-cli-pager
```

Copy `customize-webpage.sh` script to the EC2 instance

```bash
$ scp -i dev-simple-key.pem customize-webpage.sh ec2-user@xx.xxx.xx:~/
```

SSH into the EC2 instance and then run the script

```bash
> sudo bash customize-webpage.sh
```

**Debug Errors**  
In the case of error during deployment

```
$ aws cloudformation describe-stack-events --stack-name CustomServer
```

**Testing**  
Use a browser to visit the DNS name using the HTTP protocol.

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CustomServer
```
