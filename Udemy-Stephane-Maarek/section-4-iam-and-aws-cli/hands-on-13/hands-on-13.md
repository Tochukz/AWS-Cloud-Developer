# Lesson 13: IAM Users and Groups - Hands On

### Description

This configuration creates an IAM group and a single IAM user which is then added to the group.  
The user inherits the permissions contained in the IAM policy that is configured in-line in the IAM group.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint IamUsers.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file IamUsers.yaml  --stack-name IamUsers --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**

1. Login to the Management Console using the `DevUser1` username and the _DevUser1Password_ parameter value you provided.
2. Navigate the to S3 console and upload a file into any bucket and then try to delete same file. The deletion should fail.
3. Navigate to the EC2 console and try to launch an EC2 instance. You will not be able to.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name IamUsers > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name IamUsers
```
