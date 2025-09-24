# Extra-8.3: Aurora Auto Scaling

### Description

This example sets up an Aurora Cluster with Auto Scaling enabled for the Replicas.  
The Cluster will spin up more instances of the read replicas in response to increase in the number of Database connections.   

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint AuroraAutoScaling.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AuroraAutoScaling.yaml  --stack-name AuroraAutoScaling --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**


**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AuroraAutoScaling > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AuroraAutoScaling
```

### Learn More
**Aurora and Read Replica Scaling**  
Amazon Aurora can automatically add and remove read replicas in response to traffic, but not in the same way that EC2 Auto Scaling works. It’s done through Aurora Auto Scaling for Reader Endpoints.  
Aurora allows you to scale up to 15 replicas.  

**How It Works**
1. Aurora Replicas (up to 15 per cluster) handle read traffic.
2. You can set up an Auto Scaling policy based on CloudWatch metrics (e.g., `CPUUtilization`, `DatabaseConnections`, or `AverageActiveSessions`).
3. Aurora then automatically creates new replicas (scales out) or removes replicas (scales in) as needed.
4. Applications that connect to the Aurora Reader Endpoint are automatically load-balanced across available replicas.

**Important Notes**  
1. Aurora Auto Scaling only manages Aurora Replicas (read scaling).
2. The writer instance (the primary) is still a single instance — scaling writes requires moving to a larger instance class (vertical scaling).
3. Failover still promotes a replica to a writer if needed, but that’s separate from auto scaling.
