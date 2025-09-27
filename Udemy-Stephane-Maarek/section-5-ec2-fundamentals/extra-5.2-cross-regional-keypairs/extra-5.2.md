# Extra-5.1: EC2 CloudWatch Logs

### Description

This example shows how an existing KeyPair can be shared and used across multiple AWS regions for the provisioning of EC2 instances across regions.  
The solution is simple,

1. Generate an RSA KeyPair locally.
2. Export the PublicKey to multiple regions using AWS CLI or CloudFormation.
3. Exporting the PublicKey is essentially a `CreateKeyPair` operation that makes a `AWS::EC2::KeyPair` resource.
4. Use the KeyName to provision your EC2 instance in any of the region.

### Operation

**Before Deployment**

1. Create an RSA key pair if you don't already have one

```bash
$ ssh-keygen -t rsa -b 4096 -f ~/.ssh/shared-key.pem -C "your_email@example.com"
```

2. Extract a Public key from your existing private key (Optional)

```bash
$ ssh-keygen -y -f ~/.ssh/shared-key.pem > demo-public-key.pub
```

This will use the private key reference by `~/.ssh/shared-key.pem` to extract the public key into the output file `demo-public-key.pub`.

This is optional because you can simple use the public key which was generated along side the private key in step 1.  
Since your private key was `~/.ssh/shared-key.pem`, then the public key will be `~/.ssh/shared-key.pem.pub`.  
You can see this by list them as follows

```bash
$ ls -la ~/.ssh/shared-key.*
```

3. Make sure private key file permissions is in correct

```bash
$ chmod 600 ~/.ssh/my-key.pem
```

This seems to be the default file mode.

4. Import the public key into AWS EC2 (Optional)

Using AWS CLI

```bash
$ aws ec2 import-key-pair \
  --key-name SharedKey \
  --public-key-material fileb://demo-public-key.pub  \
  --region eu-west-1
# Alternatively you could use fileb://.ssh/shared-key.pem.pub in place of fileb://demo-public-key.pub
```

Here we just exported the Key to `eu-west-1` region. This step can be used to import the key in any region.  
This step is optional because the `SharedKeyPair` template does the same thing using CloudFormation.
Here we just show how it can be done using AWS CLI.

5. You can then use the KeyName for provisioning EC2 instance in any of the region where the key was imported.
6. You will be able to SSH into any EC2 instance in any region which is provisioned using the imported key in that region by using the private key from where the KeyPairs where imported.

**Deployment**  
Lint the templates

```bash
$ cfn-lint SharedKeyPair.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SharedKeyPair.yaml  --stack-name SharedKeyPair --parameter-overrides file://secret-parameters.json
```

**After Deployment**

Get the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SharedKeyPair --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

Use your private key to SSH into the EC2 instance

```bash
$ ssh -i ~/.ssh/shared-key.pem ec2-user@18.132.247.93
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name Ec2CloudWatchLog > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SharedKeyPair
```

### Learn More

Creating a new KeyPair

```bash
$ aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem
```

- That is how you create a fresh new keypair.
- The private key will be written to `MyKeyPair.pem`
- AWS Keys a Copy of the private key but you cannot retrieve it if you did not save it at creation time.
- The Public Key will be kept by AWS and used for EC2 Instance creation when you specify the keyname.
