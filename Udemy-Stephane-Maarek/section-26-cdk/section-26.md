# Section 26: Cloud Development Kit (CDK)
__CDK vs SAM__  
* SAM:
  - Serverless focused
  - Write your template declaratively in JSON or YAML
  - Great for quickly getting started with Lambda
  - Leverages CloudFormation
* CDK:
  - All AWS services
  - Write infra in a programming language JavaScript/TypeScript, Python, Java, and .NET
  - Leverages CloudFormation

__CDK + SAM__  
* You can use SAM CLI to locally test your CDK apps
* You must first run `cdk synth`


### CDK Setup
1. Install CDK CLI
```bash
$ npm install -g aws-cdk
```

2. Create CDK application
```bash
$ mkdir cdk-app
$ cd cdk-app/
$ cdk init --language javascript
# List the stacks
$ cdk ls
```

3. Bootstrap the CDK application
```bash
# This may be done only once per AWS account per region
$ cdk bootstrap
```
This will create a stack called `CDKToolkit` in your AWS account.    
CDK uses the `CDKToolkit` to manage every CDK application in your AWS account in the relevant AWS region.  
The `CDKToolkit` stack contains the following resources:  SSM Parameter, IAM Roles, IAM Policies, S3 Bucket, S3 Bucket Policy and an ECR Repository.  

4. (optional) synthesize as a CloudFormation template
```bash
$ cdk synth
```

5. deploy the CDK stack
```bash
$ cdk deploy
```

6. To clean up, destroy the stack
```bash
$ cdk destroy
```

### CDK Constructs
* CDK Construct is a component that encapsulates everything CDK needs to create the final CloudFormation stack
* Can represent a single AWS resource (e.g., S3 bucket) or multiple related resources (e.g., worker queue with compute)
* __AWS Construct Library__
  - A collection of Constructs included in AWS CDK which contains Constructs for every AWS resource
  - Contains 3 different levels of Constructs available (L1, L2, L3)
* __Construct Hub__ – contains additional Constructs from AWS, 3rd parties,
and open-source CDK community

__CDK Constructs – Layer 1 Constructs (L1)__  
* Can be called _CFN Resources_ which represents all resources directly available in CloudFormation
* Constructs are periodically generated from _CloudFormation Resource Specification_  
* Construct names start with `Cfn` (e.g., `CfnBucket`)
* You must explicitly configure all resource properties
* Example:
```javascript
const bucket = news3. CfnBucket(this, "MyBucket", {bucketName: "MyBucket"});
```

__CDK Constructs – Layer 2 Constructs (L2)__  
* Represents AWS resources but with a higher level (intent-based API)
* Similar functionality as L1 but with convenient defaults and boilerplate
* You don’t need to know all the details about the resource properties
* Provide methods that make it simpler to work with the resource (e.g., `bucket.addLifeCycleRule()`)
* Example:
```javascript
const s3 = require("aws-cdk-lib/aws-s3");
const bucket = s3.Bucket(this, "MyBucket", {    
    versioned: true,
    encryption: s3.BucketEncryption.KMS
});
const objectUrl = bucket.urlForObject("MyBucket/MyObject")
```

__CDK Constructs – Layer 3 Constructs (L3)__  
* Can be called _Patterns_, which represents multiple related resources
* Helps you complete common tasks in AWS
* Examples:
  - `aws-apigateway.LambdaRestApi` represents an API Gateway backed by a Lambda function
  - `aws-ecs-patterns.ApplicationLoadBalancerFargateService` which represents an architecture that includes a Fargate cluster with Application Load Balancer

```javascript
const api = new apigateway.LambdaRestApi(this, 'myapi', { handler: backend, proxy: false});

const items = api.root.addResource('items');
items.addMethod('GET');
items.addMethod('POST');

const item = items.addResource('{item}');
item.addMethod('GET');
item.addMethod('DELETE', new apigateway.HttpIntegration('http://amazon.com'));
```

__CDK Important Commands to know__  

Command       | Description
--------------|-----------------
npm install -g aws-cdk-lib | Install the CDK CLI and libraries
cdk init app  | Create a new CDK project from a specified template
cdk synth     | Synthesizes and prints the CloudFormation template
cdk bootstrap | Deploys the CDK Toolkit staging Stack
cdk deploy    | Deploy the Stack(s)
cdk diff      | View differences of local CDK and deployed Stack
cdk destroy   | Destroy the Stack(s)


__CDK – Bootstrapping__  
* The process of provisioning resources for CDK before you can deploy CDK apps into an AWS environment
* __AWS Environment = account + region__
* CloudFormation Stack called `CDKToolkit` is created and contains:
  - S3 Bucket – to store files
  - IAM Roles – to grant permissions to perform deployments
* You must run the following command for each new environment:
* `cdk bootstrap aws://<aws_account>/<aws_region>`
* Otherwise, you will get an error _“Policy contains a statement with one or more invalid principal"_

__CDK – Testing__  
* To test CDK apps, use CDK Assertions Module combined with popular test frameworks such as Jest (JavaScript) or Pytest (Python)
* Verify we have specific resources, rules, conditions, parameters…
* Two types of tests:
  - __Fine-grained Assertions (common)__ – test specific aspects of the CloudFormation template (e.g., check if a resource has this property with this value)
  - __Snapshot Tests__ – test the synthesized CloudFormation template against a previously stored baseline template
* To import a template
  - `Template.fromStack(MyStack)` : stack built in CDK
  - `Template.fromString(mystring)` : stack build outside CDK
