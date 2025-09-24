# Extra-6.1: EC2 logging

### Description

Collecting EC2 log files and centrallizing them in CloudWatch Logs using the CloudWatch log agent.


56. Question
An application runs on Amazon EC2 and generates log files. A Developer needs to centralize the log files so they can be queried and retained. What is the EASIEST way for the Developer to centralize the log files?
1: Install the Amazon CloudWatch Logs agent and collect the logs from the instances
2: Create a script that copies the log files to Amazon S3 and use a cron job to run the script on a recurring schedule
3: Create a script that uses the AWS SDK to collect and send the log files to Amazon CloudWatch Logs
4: Setup a CloudWatch Events rule to trigger an SNS topic when an application log file is generated

Answer: 1
