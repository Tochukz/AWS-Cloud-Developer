# Lesson 129: AWS ECS Instance Metadata - Hands On

### Description

This configuration shows how to access Meta-data on EC2 instance using the IMDS V2 API.  
IMDS - Instance Meta Data Service
The IMDS V1 permits access to the instance meta data service without authentication.
The IMDS V2 on the other hand does not permit unauthenticated access to the Meta-data.
IMDS V1 is still available in Amazon Linux 2 but has been disabled by default in Amazon Linux 2023

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint SimpleInstance.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SimpleInstance.yaml  --stack-name SimpleInstance
```

**After Deployment**  
Get the `PublicIp` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SimpleInstance --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. SSH into the EC2 instance

```bash
$ ssh -i dev-simple-key.pem  ec2-user@18.134.208.17
```

2. Attemp to access the instance meta data without authentication

```bash
$ curl http://169.254.169.254/latest/meta-data
```

You will get no response or unauthorized response message.

3. Now get the access token

```bash
$ token=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "x-aws-ec2-metadata-token-ttl-seconds: 21600"`
# checkout the token
$ echo $token
```

4. Use the token to request for the instance meta data again

```bash
$ curl -H "X-aws-ec2-metadata-token: $token" http://169.254.169.254/latest/meta-data
```

Now you should have access to all the available instance meta data.

5. You can check the Security Credential of you EC2 instance if the instance is associated to an IAM role.

```bash
$ curl -H "X-aws-ec2-metadata-token: $token" http://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/
```

Remember to always end the url with a forward slash.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SimpleInstance
```
