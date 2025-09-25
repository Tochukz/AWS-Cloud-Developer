# Extra 17.8: Beanstalk Queue Worker

### Description

In this example, we configure Elastic Beanstalk Worker Environment with Auto Scaling, based on the SQS queue depth.    

**How a Worker Environment Works**
* EB Worker Environment launches EC2 instances with your app.
* Each instance runs the SQSD daemon (provided by AWS).
* SQSD polls the SQS queue (and cron.yaml schedules, if any).
* When a message arrives (or a cron job is due), SQSD makes an HTTP POST request to your app at http://localhost/.
* Your app must handle that request, process the payload, and return a response.

In Elastic Beanstalk Worker Environments, your code must run as an HTTP server that listens for requests.  

**What This Means for Your Code**  
* Your worker app must expose an HTTP endpoint (default /).
* You can customize the path by using --queue mapping, but by default, SQSD posts to /.
* The request contains the SQS message body (or cron job metadata).
* After your code returns 200 OK, the message is considered processed.

### Operation

**Before Deployment**


**Deployment**  
Lint the template

```bash
$ cfn-lint BeanstalkQueueWorker.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BeanstalkQueueWorker.yaml  --stack-name BeanstalkQueueWorker --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Get the `EnvironmentUrl` and `AlbDomain` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BeanstalkQueueWorker --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name BeanstalkQueueWorker
```

### Learn More
**How an Elastic Beanstalk Worker Environment Works**  
1. A worker environment is essentially an EC2 Auto Scaling group running your application inside a Beanstalk-managed stack.
2. AWS also creates an _SQS queue_ and configures a daemon (_the “SQSD” daemon_) on each EC2 instance.
3. The daemon polls the queue continuously and invokes your application (_HTTP POST to /_) when messages arrive.
