# Section 12: AWS CLI, SDK, IAM Roles & Policies
## AWS SDK Overview
__Good to know:__ if you don’t specify or configure a default region, then `us-east-1` will be chosen by default

#### AWS Limits (Quotas)
__API Rate Limits__  
* `DescribeInstances` API for EC2 has a limit of _100_ calls per seconds
* `GetObject` on S3 has a limit of _5500_ GET per second per prefix
* For Intermittent Errors: implement Exponential Backoff
* For Consistent Errors: request an API throttling limit increase

__Service Quotas (Service Limits)__  
* Running On-Demand Standard Instances: 1152 vCPU
* You can request a service limit increase by opening a ticket
* You can request a service quota increase by using the _Service Quotas API_

__Exponential Backoff (any AWS service)__  
* If you get ThrottlingException intermittently, use exponential backoff
* In exponential backoff, you double your wait time before retrying the API call again - For example you wait 1s, and if it fails you wait 2s and then 4s and then 8s, 16 etc.
* Retry mechanism already included in AWS SDK API calls
  - Must implement yourself if using the AWS API as-is or in specific cases
  - Must only implement the retries on 5xx server errors and throttling
  - Do not implement on the 4xx client errors

#### AWS CLI Credentials Provider Chain
This is the order of priority for access parameters:
1. Command line options – `--region`, `--output`, and `--profile`
2. Environment variables – `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
and `AWS_SESSION_TOKEN`
3. CLI credentials file – `aws configure`
`~/.aws/credentials` on Linux / Mac & `C:\Users\user\.aws\credentials` on Windows
4. CLI configuration file – aws configure
`~/.aws/config `on Linux / macOS & `C:\Users\USERNAME\.aws\config` on Windows
5. Container credentials – for ECS tasks
6. Instance profile credentials – for EC2 Instance Profiles

#### Signing AWS API requests
* When you call the AWS HTTP API, you sign the request so that AWS can identify you, using your AWS credentials (access key & secret key)
* Note: some requests to Amazon S3 don’t need to be signed
* If you use the SDK or CLI, the HTTP requests are signed for you
* You should sign an AWS HTTP request using Signature v4 (SigV4)
