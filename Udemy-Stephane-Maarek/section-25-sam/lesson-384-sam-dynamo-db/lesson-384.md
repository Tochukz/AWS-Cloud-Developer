# Lesson 384: SAM DynamoDB

### Description

This example is a continuation of `lesson-383-sam-api-gateway` where we will deploy a Lambda function with an API Gateway using the Serverless Application Model (SAM).
Here we added an DynamoDB table to the application. The Lambda function will interact with the DynamoDB table to store and retrieve data.

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
Insert a collection items into the DynamoDB table using the `greetings.json` file.

```bash
$ aws dynamodb batch-write-item --request-items file://greetings.json
```

**Testing**  
You can go to the API Gateway Console to test the API Gateway.  
While on the API Gateway Console, you go to _Stages_ to get the API Gateway Invoke URL.  
Append `/hello` to the Invoke URL to test the API Gateway.  
e.g https://d9wo0365r6.execute-api.eu-west-2.amazonaws.com/Prod/hello

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name HelloWorldSam
```
