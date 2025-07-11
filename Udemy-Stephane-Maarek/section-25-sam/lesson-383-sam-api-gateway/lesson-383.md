# Lesson 381: First SAM Project + Lesson 382: Deploying SAM PROJECT

### Description

This example is a continuation of `lesson-381-first-sam-project.md` where we will deploy a simple Python Application on a Lambda function using AWS SAM.  
Here we added an API Gateway to the SAM template.

### Operation

**Before Deployment**  
The Code and template was put together by modifying the example from [microservice-http-endpoint-python3](https://github.com/amazon-archives/serverless-app-examples/tree/master/python/microservice-http-endpoint-python3) sample application.

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
You can go to the API Gateway Console to test the API Gateway.  
While on the API Gateway Console, you go to _Stages_ to get the API Gateway Invoke URL.  
Append `/hello` to the Invoke URL to test the API Gateway.  
E.g https://d9wo0365r6.execute-api.eu-west-2.amazonaws.com/Prod/hello

**Debug Errors**

**Cleanup**  
You may want to leave the template for a continuation on `lesson-384-sam-dynamo-db` which build on this.  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name HelloWorldSam
```
