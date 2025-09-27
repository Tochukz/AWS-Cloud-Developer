# Extra 21.3: Scheduled Auto Scaling Provisioned Concurrency

### Description  
The development team at a retail company is gearing up for the upcoming Thanksgiving sale and wants to make sure that the application's _serverless backend running via Lambda functions_ does not hit latency bottlenecks as a result of the traffic spike.   

So we configure _Application Auto Scaling_ to manage _Lambda provisioned concurrency_ on a schedule.  

**Benefits**
* Provisioned Concurrency keeps function instances initialized and ready to respond with zero cold start.
* You can attach Application Auto Scaling to scale this provisioned concurrency based on a schedule (e.g., before Thanksgiving sale peak hours).
* This ensures functions are already warm and can handle high traffic without latency spikes.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint AutoScalingLambda.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AutoScalingLambda.yaml  --stack-name AutoScalingLambda --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name AutoScalingLambda
```

### Learn More
