# Section 25: Serverless Application Model (SAM)
## AWS SAM
* SAM = Serverless Application Model
* Framework for developing and deploying serverless applications
* All the configuration is YAML code
* Generate complex CloudFormation from simple SAM YAML file
* Supports anything from CloudFormation: Outputs, Mappings, Parameters, Resources…
* SAM can use CodeDeploy to deploy Lambda functions
* SAM can help you to run Lambda, API Gateway, DynamoDB locally

__AWS SAM – Recipe__  
* Transform Header indicates it’s SAM template:
  - `Transform: AWS::Serverless-2016-10-31`
* Write Code
  - AWS::Serverless::Function
  - AWS::Serverless::Api
  - AWS::Serverless::SimpleTable
* Package & Deploy: `sam deploy` (optionally preceded by “sam package”)
* Quickly sync local changes to AWS Lambda (SAM Accelerate): `sam sync --watch`

__SAM Accelerate (sam sync)__  
* SAM Accelerate is a set of features to reduce latency while deploying resources to AWS
* _sam sync_
  - Synchronizes your _project_ declared in SAM templates to AWS
  - Synchronizes _code changes_ to AWS without updating infrastructure (uses service APIs & _bypass CloudFormation_)

__SAM Accelerate (sam sync) – Examples__  
* `sam sync` (no options)
  - Synchronize code and infrastructure
* `sam sync --code`
  - Synchronize code changes without updating infrastructure (bypass CloudFormation, update in seconds)
* `sam sync --code --resource AWS::Serverless::Function`
  - Synchronize only all Lambda functions and their dependencies
* `sam sync --code --resource-id HelloWorldLambdaFunction`
  - Synchronize only a specific resource by its ID
* `sam sync --watch`
  - Monitor for file changes and automatically synchronize when changes are detected
  - If changes include configuration, it uses `sam sync`
  - If changes are code only, it uses `sam sync --code`

__SAM Policy Templates__  
* List of templates to apply permissions to your Lambda Functions
* Full list available [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html)
* Important examples:
  - `S3ReadPolicy`: Gives read only permissions to objects in S3
  - `SQSPollerPolicy`: Allows to poll an SQS queue
  - `DynamoDBCrudPolicy`: CRUD = create read update delete

__SAM and CodeDeploy__    
* _SAM framework natively uses CodeDeploy to update Lambda functions_
* Traffic Shifting feature
* Pre and Post traffic hooks features to validate deployment (before the traffic shift starts and after it ends)
* Easy & automated rollback using CloudWatch Alarms
* __AutoPublishAlias__
  - Detects when new code is being deployed
  - Creates and publishes an updated version of that function with the latest code
  - Points the alias to the updated version of the Lambda function
* __DeploymentPreference__
  - Canary, Linear, AllAtOnce
* __Alarms__  
  - Alarms that can trigger a rollback
* __Hooks__
  - Pre and post traffic shifting Lambda functions to test your deployment
