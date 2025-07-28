### CloudWatch Metric
* There are up to 30 dimensions per metric
* EC2 instance metric are collected every 5 minutes
* When details monitoring is enabled, metrics are collected every 1 minute.  
* Free Tier allows up to 10 details monitoring metrics
* Metric resolutions
  - Standard: 1 minute (per minute metic collection)
  - High Resolution: less than 1 minute
* Metric data point will be accepts with timestamp 2 weeks in the past or 2 hours in the feature

### CloudWatch Logs
* Log expiration policies can be set between 1 day and 10 years.
* Log data can take up to 12 hours to become available for export
* We can create up to 2 subscription filters per log group
* The maximum number of metric filters that can be associated with a log group is 100.


### CloudWatch Alarm
* CloudWatch Alarm set on a Hight Resolution Custom Metric can be triggered 10 seconds or 30 seconds.
* Regular alarm period is set at a multiple of 60 seconds

### CloudTrail
* Events are stored for 90 days in CloudTrail
