# Lesson 369: CodeBuild - Part 1 Hands On

### Description

This example demonstrates how to setup CodeDeploy to deploy an archived artifact from S3 to an EC2 instance running an Apache web server.

### Operation

**Before Deployment**  
Package and upload the `sample-server` code to S3

```bash
$ zip -r sample-server-1.zip sample-server
$ aws s3 cp sample-server-1.zip s3://chucks-workspace-storage/codedeploy-artifacts/deployment-01.zip
```

The `sample-server` directory contains the `appspec.yml` file which defines the deployment instructions for CodeDeploy.

**Deployment**  
Lint the template

```bash
$ cfn-lint CodeDeploy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CodeDeploy.yaml  --stack-name CodeDeploy --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

1. Get the `PublicIp` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name CodeDeploy --query "Stacks[0].Outputs" --no-cli-pager
```

2. Use the `PublicIp` to test the web server using a browser.  
   Keep the browser tab open for later.
3. Optionall, you may SSH into the EC2 instance to check if the `codedeploy-agent` was successfully installed

```bash
$ ssh -i ~/.ssh/chucks-workspace.pem ec2-user@<PublicIp>
$ sudo service codedeploy-agent status
```

**Testing**

1. Update the `backgroun-color` to green in `sample-server/index.html` file.  
   Zip and upload the updated code to S3

````bash
```bash
$ zip -r sample-server-2.zip sample-server
$ aws s3 cp sample-server-2.zip s3://chucks-workspace-storage/codedeploy-artifacts/deployment-02.zip
````

2. Create a new deployment

```bash
$ aws deploy create-deployment --application-name Ec2DeploymentApp --deployment-group-name DevEc2DeploymentGroup --s3-location bucket=chucks-workspace-storage,key=codedeploy-artifacts/deployment-02.zip,bundleType=zip
```

3. Refresh the web page in your browser to see the changes.  
   The webpage should now have a green background.

4. You can also check the deployment in the CodeDeploy console.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CodeDeploy
```
