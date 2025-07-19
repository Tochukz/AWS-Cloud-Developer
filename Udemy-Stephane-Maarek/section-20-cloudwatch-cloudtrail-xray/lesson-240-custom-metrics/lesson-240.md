# Lesson-240: CloudWatch Custom Metric

#### Definition of Terms

**Namespace**
This is a name for a collection of related Metric types.  
They are usually names after the AWS service for which the metric is applicable.  
For example _EC2_ is the namespace for all the metrics related to EC2 instances like _CPUUtilization_.  
Other namespaces includes, ApiGateway, CodeBuild, DynamoDB etc.  
You use you own namespace when you create Custom metrics. Just select whatever name that makes sense to you.

**Dimension**  
The dimension is an attribute that can be used to group a collection of metric data points.  
For example, `InstanceId` is a metric dimension for the _CPUUtilization_ metric.  
With the `InstanceId` dimension we can indentify all the metric points that are emanating from a specific EC2 instance.  
Another example of a Dimension is `AutoScalingGroupName` which is useful for monitoing all the metric data points coming from all the EC2 instances that are managed by a specific Auto Scaling Group.

#### Creating a Custom Metric

To create a custom metric, you use the `PutMetricData` action

```bash
$ aws cloudwatch put-metric-data --namespace MemoryUsage --metric-name Memory --unit Megabytes --value 170 --dimensions InstanceId=i-01396c1cdcbaf481a,InstanceType=t2.micro
```

Now go to the CloudWatch Console > Metrics > All Metrics.  
Under _Custom namespaces_ you should see the namespace we used `MemoryUsage`.  
Click on the `MemoryUsage` namespace and then you should find the two dimensions we specified `InstanceId, InstanceType`.
Click on the dimensions to view the metrics.

**Note** The unit parameter value must be a value in the set [ Megabits, Terabits, Gigabits, Count, Bytes, Gigabytes, Gigabytes/Second, Kilobytes, Kilobits/Second, Terabytes, Terabits/Second, Bytes/Second, Percent, Megabytes, Megabits/Second, Milliseconds, Microseconds, Kilobytes/Second, Gigabits/Second, Megabytes/Second, Bits, Bits/Second, Count/Second, Seconds, Kilobits, Terabytes/Second, None ]
