# Section 13: Management and Security
## AWS AppConfig
* Create, manage, and deploy application configurations
* Capability of AWS Systems Manager
* A _configuration_ is a collection of settings that influence the behavior of your application
* Applications can be hosted on:
* Amazon EC2 instances
* AWS Lambda
* Mobile applications
*  IoT devices
* Reduces errors associated with configuration changes and streamlines deployment
* Configurations can be stored in:
  - Amazon S3
  - AWS AppConfig
  - Systems Manager Parameter Store
  - Systems Manager Document Store
  - Bitbucket, GitHub, CodeCommit (via CodePipeline)
* Applications must be updated to check for and retrieve configuration data
* API actions include:
  - `StartConfigurationSession`
  - `GetLatestConfiguration`
* Validators are used to ensure that configuration data is syntactically and semantically correct
* Validators are either:
  - JSON Schema Validators
  - AWS Lambda Validators
* Deployment type is either:
  - Linear – uses a growth factor which is a step %
  - Exponential – uses the exponential formula _G*(2^N)_
* Deployment strategies:
  - `AppConfig.AllAtOnce` – all targets at once
  - `AppConfig.Linear50PercentEvery30Seconds` – 50% of targets every 30 seconds

## Amazon CloudWatch
__Amazon CloudWatch Metrics__  
* Metrics are sent to CloudWatch for many AWS services
* EC2 metrics are sent every _5 minutes_ by default (free)
* Detailed EC2 monitoring sends every _1 minute (chargeable)_
* Unified CloudWatch Agent sends system-level metrics for EC2 and on-premises servers
* System-level metrics include memory and disk usage
* Can publish custom metrics using CLI or API
* Custom metrics are one of the following resolutions:
  - __Standard resolution__ – data having a one-minute granularity
  - __High resolution__ – data at a granularity of one second
* AWS metrics are standard resolution by default

__Two types of alarms__  
* __Metric alarm__ – performs one or more actions based on a single metric
* __Composite alarm__ – uses a rule expression and takes into account multiple alarms
* Metric alarm states:
  - OK – Metric is within a threshold
  - ALARM – Metric is outside a threshold
  - INSUFFICIENT_DATA – not enough data
