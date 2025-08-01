# Lesson 346: Canary Deployments - Hands On

### Description

Canary deployments allow you to route a certain percentage (usally small like 10%) of your application traffic to a new version of your code.  
This allows for testing and then the 100% traffic is then routed to the new version if the test is satisfactory.  
In this example we demontrate canary deployment that route 50% of the traffic to a different version of our code.  
The `CanarySetting` property of the `AWS::ApiGateway::Stage` resource allows us to specify the percentage of the traffic that should be sent to the Canary deployment.

### Operation

**Before Deployment**

Deploy two version of code to S3 bucket

1. Push the code for version 1

```bash
$ zip lambda-1.zip lambda.py
$ aws s3 cp lambda-1.zip s3://chucks-workspace-storage/artifacts/lambda-stage-v1.zip
```

2. Update the text "version 1" in the code to "version 2" and deploy again

```bash
$ zip lambda-3.zip lambda.py
$ aws s3 cp lambda-3.zip s3://chucks-workspace-storage/artifacts/lambda-stage-v3.zip
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint Lambda.yaml
$ cfn-lint ApiGatewayStages.yaml
```

1.  Deploy the `Lambda` stack

```bash
$ aws cloudformation deploy --template-file Lambda.yaml  --stack-name Lambda --capabilities CAPABILITY_IAM --disable-rollback
```

2. Go the the Lambda Console and test the Function to make sure it is in order.

3. Publish Version 1 of the Lambda function

```bash
$ aws lambda publish-version --function-name MainFunc --description "Main Func Version 1"
```

4. Update the Lambda function code to `lambda-stage-v2.zip`.

```bash
$ aws lambda update-function-code --function-name MainFunc --s3-bucket chucks-workspace-storage --s3-key artifacts/lambda-stage-v2.zip
```

We will not create a version 2 of the Lambda function but rather the `$LATEST` version will continue to point to version 2 of the code.

5. You can go to the Lambda Console, take a look at the lastest, version 2 code in the Code tab.  
   Then click on the _Versions_ tab to see version 1.  
   Each version should have a different code.

6. Deploy the `CanaryDeployment` stack

```bash
$ aws cloudformation deploy --template-file CanaryDeployment.yaml  --stack-name CanaryDeployment
# --disable-rollback
```

**After Deployment**

Get the `ApiEndpoint` from the `CanaryDeployment` stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name CanaryDeployment --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Test the endpoint for the canary deployment  
   https://357c2wjhv8.execute-api.eu-west-2.amazonaws.com/prod/  
   Each time you refresh you may see a different content - either from the main or canary deployment.

2. After the testing is satisfactory, update the Version1 Alias to point to the latest Lambda version (i.e version 2)

```bash
$ aws lambda update-alias --function-name MainFunc --name prod --function-version \$LATEST
```

Now both Alias are pointing to the `$LATEST` version making 100% of the traffic to go to the same Lambda version.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name CanaryDeployment
$ aws cloudformation delete-stack --stack-name Lambda
```
