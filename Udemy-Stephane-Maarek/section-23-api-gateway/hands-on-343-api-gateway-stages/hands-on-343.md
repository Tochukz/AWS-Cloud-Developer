# Lesson 343: API Gateway Stages and Deployment - Hands On

### Description

This configuration shows how different stages of the API Gateway can be mapped to different versions of a Lambda function via Lambda Aliases.

First we deploy the Lambda function which is defined in the `Lambda.yaml` template.

Next, we publish two new versions of the Lambda function while making changes to the code to make the versions distinguishable by their content. The new versions are published using the AWS CLI.

Then we deploy the `ApiGatewayStages.yaml` template which contains the API Gateway stages which are mapped to Lambda Aliases that are pointing to different versions of the Lambda function.

The final mapping of the stages to the lambda version looks like this:  
`prod` stage -> Alias 1 -> Lambda Version 1  
`test` stage -> Alias 2 -> Lambda Version 2  
`dev` stage -> Alias 3 -> Lambda $Lastest version

We use the `stageVariables.lambdaAlias` variable inside the API Gateway Method configuration `Uri` property have the stage name dynamically map to the appropriate Lambda Alias.

For example  
https://api-endpoint/dev -> dev stage -> $Lastest version  
https://api-endpoint/test -> test stage -> Version 2  
https://api-endpoint/prod -> pto stage -> Version 1

Note that the stage name is case sensitive when being matched with the API Gateway endpoint, and that is why I use small letters for all the `StageName` properties in the `AWS::ApiGateway::Stage` resources.

### Operation

**Before Deployment**

Deploy three version of code to S3 bucket

1. Push the code for version 1

```bash
$ zip lambda-1.zip lambda.py
$ aws s3 cp lambda-1.zip s3://chucks-workspace-storage/artifacts/lambda-stage-v1.zip
```

2. Update the text "version 1" in the code to "version 2" and deploy again

```bash
$ zip lambda-2.zip lambda.py
$ aws s3 cp lambda-2.zip s3://chucks-workspace-storage/artifacts/lambda-stage-v2.zip
```

3. Update the text "version 2" in the code to "version 3" and deploy again

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

Deploy the stack

1.  Deploy the `Lambda` stack

```bash
$ aws cloudformation deploy --template-file Lambda.yaml  --stack-name Lambda --capabilities CAPABILITY_IAM --disable-rollback
```

2. Go the the Lambda Console and test the Function to make sure it is in order.

3. Publish Version 1 of the Lambda function

```bash
$ aws lambda publish-version --function-name MainFunc --description "Main Func Version 1"
```

4. Update the Lambda function code to `lambda-stage-v2.zip` and the publish version 2.

```bash
$ aws lambda update-function-code --function-name MainFunc --s3-bucket chucks-workspace-storage --s3-key artifacts/lambda-stage-v2.zip
$ aws lambda publish-version --function-name MainFunc --description "Main Func Version 2"
```

5. Update the Lambda function code to `lambda-stage-v3.zip`

```bash
$ aws lambda update-function-code --function-name MainFunc --s3-bucket chucks-workspace-storage --s3-key artifacts/lambda-stage-v3.zip
```

We will not create a version 3 of the Lambda function but rather the `$LATEST` version will continue to point to version 3 of the code.

6. You can go to the Lambda Console, take a look at the lastest, version 3 code in the Code tab.  
   Then click on the _Versions_ tab to see version 1 and 2.  
   Each version should have a different code.

7. Deploy the `ApiGatewayStages` stack

```bash
$ aws cloudformation deploy --template-file ApiGatewayStages.yaml  --stack-name ApiGatewayStages
# --disable-rollback
```

**After Deployment**

Get the `ApiEndpoint` from the `ApiGatewayStages` stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name ApiGatewayStages --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Test the endpoint for the three stages and confirm if their contents are different

1. https://2kvuvq95je.execute-api.eu-west-2.amazonaws.com/prod
2. https://2kvuvq95je.execute-api.eu-west-2.amazonaws.com/test
3. https://2kvuvq95je.execute-api.eu-west-2.amazonaws.com/dev

The `prod` stage should contain the `version 1` code.  
The `test` stage should contain the `version 2` code.  
The `dev` stage should contain the `version 3` code which is the latest.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name ApiGatewayStages
$ aws cloudformation delete-stack --stack-name Lambda
```
