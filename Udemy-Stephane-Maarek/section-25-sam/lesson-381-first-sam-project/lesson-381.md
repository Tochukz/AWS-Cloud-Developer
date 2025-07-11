# Lesson 381: First SAM Project + Lesson 382: Deploying SAM PROJECT

### Description

This example creates a very simple Python application deployed to a Lambda function using AWS SAM (Serverless Application Model).

### Operation

**Before Deployment**  
The Code and template was put together by modifying the example from [hello-world-python3](https://github.com/amazon-archives/serverless-app-examples/tree/master/python/hello-world-python3) sample application.  
The Lambda Handler code and SAM template has been modified to suit this lesson.

**Deployment**  
Transform SAM template to CloudFormation template

```bash
$ cd python-app
$ aws cloudformation package \
    --template-file template.yaml \
    --output-template-file gen/cfn-template.yaml \
    --s3-bucket chucks-workspace-storage
```

This will generate a CloudFormation template in the `gen` directory

Deploy the CloudFormation stack

```bash
$ aws cloudformation deploy --template-file gen/cfn-template.yaml --stack-name HelloWorldSam --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**
You can go to the Lambda Console to test the Lambda

**Debug Errors**

**Cleanup**  
You may want to leave the template for a continuation on `lesson-383-sam-api-gateway` which build on this.  

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name HelloWorldSam
```
