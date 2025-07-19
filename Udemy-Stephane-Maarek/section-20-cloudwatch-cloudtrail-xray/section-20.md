# Section 20: AWS Monitoring, Troubleshooting & Audit
## Monitoring in AWS
* AWS CloudWatch:
  - Metrics: Collect and track key metrics
  - Logs: Collect, monitor, analyze and store log files
  - Events: Send notifications when certain events happen in your AWS
  - Alarms: React in real-time to metrics / events
* AWS X-Ray:
  - Troubleshooting application performance and errors
  - Distributed tracing of microservices
* AWS CloudTrail:
  - Internal monitoring of API calls being made
  - Audit changes to AWS Resources by your users

## CloudWatch
#### CloudWatch Metrics
* CloudWatch provides metrics for every services in AWS
* _Metric_ is a variable to monitor (CPUUtilization, NetworkIn…)
* Metrics belong in namespaces
* _Dimension_ is an attribute of a metric (instance id, environment, etc…).
* Up to 30 dimensions per metric
* Metrics have timestamps
* Can create CloudWatch dashboards of metrics

__EC2 Detailed monitoring__  
* EC2 instance metrics have metrics “every 5 minutes”
* With detailed monitoring (for a cost), you get data “every 1 minute”
* Use detailed monitoring if you want to scale faster for your ASG!
* The AWS Free Tier allows us to have 10 detailed monitoring metrics
* __Note:__ EC2 Memory usage is by default not pushed (must be pushed from inside the instance as a custom metric)

__CloudWatch Custom Metric__   
* Possibility to define and send your own custom metrics to CloudWatch
* Example: memory (RAM) usage, disk space, number of logged in users …
* Use API call `PutMetricData`
* Ability to use dimensions (attributes) to segment metrics
  - Instance.id
  - Environment.name
* Metric resolution (_StorageResolution_ API parameter – two possible value):
  - Standard: 1 minute (60 seconds)
  - High Resolution: 1/5/10/30 second(s) – Higher cost
* __Important:__ Accepts metric data points two weeks in the past and two hours in the future (make sure to configure your EC2 instance time correctly)

#### CloudWatch Logs
__Introduction__  
* __Log groups:__ arbitrary name, usually representing an application
* __Log stream:__ instances within application / log files / containers
* Can define log expiration policies (never expire, 1 day to 10 years…)
  - CloudWatch Logs can send logs to:
  - Amazon S3 (exports)
  - Kinesis Data Streams
  - Kinesis Data Firehose
  - AWS Lambda
  - OpenSearch
* Logs are encrypted by default
* Can setup KMS-based encryption with your own keys

__CloudWatch Logs - Sources__  
* SDK, CloudWatch Logs Agent, CloudWatch Unified Agent
* Elastic Beanstalk: collection of logs from application
* ECS: collection from containers
* AWS Lambda: collection from function logs
* VPC Flow Logs: VPC specific logs
* API Gateway
* CloudTrail based on filter
* Route53: Log DNS queries

__CloudWatch Logs Insights__  
* Search and analyze log data stored in CloudWatch Logs
* Example: find a specific IP inside a log, count occurrences of
“ERROR” in your logs…
* Provides a purpose-built query language
  - Automatically discovers fields from AWS services and JSON log events
  - Fetch desired event fields, filter based on conditions, calculate aggregate statistics, sort events, limit number of events…
  - Can save queries and add them to CloudWatch Dashboards
* Can query multiple Log Groups in different AWS accounts
* It’s a query engine, not a real-time engine

__CloudWatch Logs – S3 Export__  
* Log data can take up to 12 hours to become available for export
* The API call is `CreateExportTask`
* Not near-real time or real-time… use _Logs Subscriptions_ instead

__CloudWatch Logs Subscriptions__  
* Get a real-time log events from CloudWatch Logs for processing and analysis
* Send to Kinesis Data Streams, Kinesis Data Firehose, or Lambda
* __Subscription Filter__ – filter which logs  events are delivered to your destination

![](slides/log-subscription-filter.png)  

__CloudWatch Logs for EC2__  
* By default, no logs from your EC2 machine will go to CloudWatch
* You need to run a CloudWatch agent on EC2 to push the log files you want
* Make sure IAM permissions are correct
* The CloudWatch log agent can be setup on-premises too

__CloudWatch Logs Agent & Unified Agent__  
* For virtual servers (EC2 instances, on-premise servers…)
* __CloudWatch Logs Agent__
  - Old version of the agent
  - Can only send to CloudWatch Logs
* __CloudWatch Unified Agent__
  - Collect additional system-level metrics such as RAM, processes, etc…
  - Collect logs to send to CloudWatch Logs
  - Centralized configuration using SSM Parameter Store

__CloudWatch Unified Agent – Metrics__  
* Collected directly on your Linux server / EC2 instance
* __CPU__ (active, guest, idle, system, user, steal)
* __Disk metrics__ (free, used, total), Disk IO (writes, reads, bytes, iops)
* __RAM__ (free, inactive, used, total, cached)
* __Netstat__ (number of TCP and UDP connections, net packets, bytes)
* __Processes__ (total, dead, bloqued, idle, running, sleep)
* __Swap Space__ (free, used, used %)
* Reminder: out-of-the box metrics for EC2 – disk, CPU, network (high level)

__CloudWatch Logs Metric Filter__  
* CloudWatch Logs can use filter expressions
  - For example, find a specific IP inside of a log
  - Or count occurrences of “ERROR” in your logs
  - Metric filters can be used to trigger alarms
* _Filters do not retroactively filter data. Filters only publish the metric data points for events that happen after the filter was created._
* Ability to specify up to 3 Dimensions for the Metric Filter (optional)

![](slides/log-metric-filter.png)  


__CloudWatch Alarms__   
* Alarms are used to trigger notifications for any metric
* Various options (sampling, %, max, min, etc…)
* Alarm States:
  - OK
  - INSUFFICIENT_DATA
  - ALARM
* Period:
  - Length of time in seconds to evaluate the metric
  - High resolution custom metrics: 10 sec, 30 sec or multiples of 60 sec


__CloudWatch Alarm Targets__   
* Stop, Terminate, Reboot, or Recover an EC2 Instance
* Trigger Auto Scaling Action
* Send notification to SNS (from which you can do pretty much anything)

![](slides/alarm-targets.png)  

__CloudWatch Alarms – Composite Alarms__  
* CloudWatch Alarms are on a single metric
* _Composite Alarms are monitoring the states of multiple other alarms_  
* AND and OR conditions
* Helpful to reduce “alarm noise” by creating complex composite alarms

__EC2 Instance Recovery__  
![](slides/ec2-instance-recovery.png)  

__CloudWatch Alarm: good to know__  
* Alarms can be created based on CloudWatch Logs Metrics Filters
* To test alarms and notifications, set the alarm state to Alarm using CLI
```bash
$ aws cloudwatch set-alarm-state --alarm-name "myalarm" --state-value
ALARM --state-reason "testing purposes"
```

__CloudWatch Synthetics Canary Blueprints__  
* Heartbeat Monitor – load URL, store screenshot and an HTTP archive file
* API Canary – test basic read and write functions of REST APIs
* Broken Link Checker – check all links inside the URL that you are testing
* Visual Monitoring – compare a screenshot taken during a canary run with a baseline screenshot
* Canary Recorder – used with CloudWatch Synthetics Recorder (record your actions on a website and automatically generates a script for that)
* GUI Workflow Builder – verifies that actions can be taken on your webpage (e.g.,test a webpage with a login form)

## Amazon EventBridge

## X-Ray

## CloudTrail
