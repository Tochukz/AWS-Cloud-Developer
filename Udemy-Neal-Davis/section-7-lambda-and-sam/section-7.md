# Section 7: AWS Lambda and AWS SAM  
## Lambda Function
__Lambda Function Invocation__  
__Synchronous:__
* CLI, SDK, API Gateway
* Wait for the function to process the event and return a response
* Error handling happens client side (retries, exponential backoff etc)

__Asynchronous:__
* S3, SNS, CloudWatch Events etc
* Event is queued for processing and a response is returned immediately
* Lambda retries up to 3 times
* Processing must be idempotent (due to retries)

__Event source mapping:__  
* SQS, Kinensis Data Stream, DynamoDB Streams
* Lambda does the polling (pools the source)

__Lambda Function Concurrency__  
If concurrency limit is exceeded throttling occurs with error _"Rate exceeded"_ and a 429 "TooManyRequestsException" .

__Lambda Function Limits__  
![](slides/lambda-function-limits.png)

### Lambda Invocation
__Lambda API Invocation__  
You can invoke a REST API Lambda code behind an API gateway to simulate a HTTP request:
```bash
$ cd scripts
$ ./lambda-invoke-api.sh FunctionName api-payload-login.json output-1.json
```
Checkout the `output-1.json` for the result.

__Logs and Tail__  
You can use the `--log-type Tail` option to get the logs from your Lambda invocation
```bash
$ aws lambda invoke --function-name FunctionName --log-type Tail output2.json > response.json
```
You will find the log result in the `LogResult` property in the `response.json` file.  
The `LogResult` value is Base64 encoded and has to be decoded.     
You can use the `decode-base64.sh` script to decode the Base64 encoded log.
Alternatively, you can run the `lambda-logs-v2.sh` script to have the log decoded automatically at invocation time:  
```bash
$ cd scripts
$ ./lambda-logs-v2.sh FunctionName
```

__Success and Failure Destinations__  
* Send invocation records to a destination when your function is invoked
* Works for asynchronous invocations and Stream invocations (Kinesis/DynamoDB stream)
* Choose the condition as success of failure
* Destination type is SQS queue, SNS topic, Lambda function, or EventBridge event bus
* The execution record contains details about the request and response in JSON format
* Information sent includes:
  - Version
  - Timestamp
  - Request context
  - Request payload
  - Response context
  - Response payload

__Dead-Letter Queue (DLQ)__  
* A DLQ saves unprocessed events for further processing
* Applies to asynchronous invocations
* The DLQ can be an Amazon SQS queue or an Amazon SNS topic
* When editing the asynchronous configuration, you can specify the number of retries:
  - Lambda will retry processing up to 2 times.
  - After 6 hours the event is discarded and can be sent to a DLQ

__Concurrency Limits__  
* The default concurrency limit per AWS Region is 1,000 invocations at any given time
* The default burst concurrency quota per Region is between 500 and 3,000, which varies per Region
* There is no maximum concurrency limit for Lambda functions (depends on use case)
* To avoid throttling request limit increases at least 2 weeks ahead of time

__Reserved Concurrency__  
* Reserved concurrency guarantees a set number of concurrent executions will be available for a critical function
* You can reserve up to the Unreserved account concurrency value, minus 100 for functions that don't have reserved concurrency
* To throttle a function, set the reserved
concurrency to zero. This stops any events
from being processed until you remove the
limit

__Provisioned Concurrency__  
* When provisioned concurrency is allocated, the function scales with the same burst behavior as standard concurrency
* After it's allocated, provisioned concurrency serves incoming requests with very low latency
* When all provisioned concurrency is in use, the function scales up normally to handle any additional requests
* Application Auto Scaling takes this a step further by providing autoscaling for provisioned concurrency

### Monitoring, Logging, and Tracing
__Performance Monitoring - CloudWatch__  
* Lambda sends metrics to Amazon CloudWatch for performance monitoring
* Execution logs are stored in Amazon CloudWatch Logs
* The Lambda function execution role must have permissions (IAM) to allow writes to CloudWatch Logs

__Tracing with AWS X-Ray__  
* You can use AWS X-Ray to visualize the components of your application, identify performance bottlenecks, and troubleshoot requests that resulted in an error
* Your Lambda functions send trace data to X-Ray, and X-Ray processes the data to generate a service map and searchable trace summaries
* The AWS X-Ray Daemon is a software application that gathers raw segment data and relays it to the AWS X-Ray service
* The daemon works in conjunction with the AWS X-Ray SDKs so that data sent by the SDKs can reach the X-Ray service
* When you trace your Lambda function, the X-Ray daemon automatically runs in the Lambda environment to gather trace data and send it to X-Ray
* The function needs permissions to write to X-Ray in the execution role

__Connecting Lambda to an Amazon VPC__  
* You must connect to a private subnet with a NAT Gateway for Internet access (no public IP)
* Careful with DNS resolution of public hostnames as it could add to function running time (cost)
* Cannot be connected to a dedicated tenancy VPC
* Only connect to a VPC if you need to, it can slow down function execution
* To connect to a VPC, your function's execution role must have the following permissions:
  - `ec2:CreateNetworkInterface`
  - `ec2:DescribeNetworkInterfaces`
  - `ec2:DeleteNetworkInterface`
* These permissions are included in the `AWSLambdaVPCAccessExecutionRole` managed policy

__Lambda Function as a Target for an ALB__  
* Application Load Balancers (ALBs) support AWS Lambda functions as targets
* You can register your Lambda functions as targets and configure a listener rule to forward requests to the target group for your Lambda function

There are some limits to understand:
* The Lambda function and target group must be in the same account and in the same Region
* The maximum size of the request body that you can send to a Lambda function is 1 MB
* The maximum size of the response JSON that the Lambda function can send is 1 MB
* WebSockets are not supported. Upgrade requests are rejected with an HTTP 400 code
* Local Zones are not supported

__AWS Signer__  
* AWS Signer is a fully managed code-signing service
* Used to ensure the trust and integrity of code
* Code is validated against a digital signature
* With Lambda you can ensure only trusted code runs in Lambda functions
* Signer is used to create digitally signed packages for deployment
* IAM policies can enforce that functions can be created only if they have code signing enabled
* If a developer leaves you can revoke all versions of the signing profile so the code cannot run

__Best Practices – Function Code__  
* Separate the Lambda handler from your core logic
* Take advantage of execution environment reuse to improve the performance of your function
* Use a keep-alive directive to maintain persistent connections
* Use environment variables to pass operational parameters to your function
* Control the dependencies in your function's deployment package
* Minimize your deployment package size to its runtime necessities
* Avoid using recursive code in your function

## AWS Serverless Application Model (SAM)
__Introduction__  
* Provides a shorthand syntax to express functions, APIs, databases, and event source mappings
* Can be used to create Lambda functions, API endpoints, DynamoDB tables, and other resources
* A SAM template file is a YAML configuration that represents the architecture of a serverless application
* You use the template to declare all the AWS resources that comprise your serverless application in one place
* AWS SAM templates are an extension of AWS CloudFormation templates
* Any resource that you can declare in an AWS CloudFormation template can also be declared in an AWS SAM template

__AWS SAM Commands__  
1. Package SAM application
```bash
$ sam package -t template.yaml --s3-bucket dctlabs --output-template-file packaged-template.yaml
```
2. Deploy SAM application
```bash
$ sam deploy --template-file packaged-template.yaml --stack-name my-cf-stack
```

Alternatively, you can do the same using `cloudformation`:

1. Package SAM application using `cloudformation`
```bash
$ aws cloudformation package --template-file template.yaml --s3-bucket dctlabs --output-template-file packaged-template.yaml
```
2. Deploy SAM template using `cloudformation`
```bash
$ aws cloudformation deploy --template-file packaged-template.yaml --stack-name my-cf-stack
```

__AWS SAM Transform Header__  
The “Transform” header indicates it’s a SAM template:
* `Transform: 'AWS::Serverless-2016-10-31'`

There are several resources types:
* `AWS::Serverless::Function` (AWS Lambda)
* `AWS::Serverless::Api` (API Gateway)
* `AWS::Serverless::SimpleTable` (DynamoDB)
* `AWS::Serverless::Application` (AWS Serverless Application Repository)
* `AWS::Serverless::HttpApi` (API Gateway HTTP API)
* `AWS::Serverless::LayerVersion` (Lambda layers)
