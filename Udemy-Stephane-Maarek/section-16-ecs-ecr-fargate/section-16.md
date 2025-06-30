# Section 16: ECS, ECR and Fargate - Docker in AWS
__ECS Service Auto Scaling__  
* Automatically increase/decrease the desired number of ECS tasks
* Amazon ECS Auto Scaling uses __AWS Application Auto Scaling__
  - ECS Service Average CPU Utilization
  - ECS Service Average Memory Utilization - Scale on RAM
  - ALB Request Count Per Target – metric coming from the ALB
* __Target Tracking__ – scale based on target value for a specific CloudWatch metric
* __Step Scaling__ – scale based on a specified CloudWatch Alarm
* __Scheduled Scaling__ – scale based on a specified date/time (predictable changes)
* ECS Service Auto Scaling (task level) ≠ EC2 Auto Scaling (EC2 instance level)
* Fargate Auto Scaling is much easier to setup (because Serverless)

__EC2 Launch Type – Auto Scaling EC2 Instances__
* Accommodate ECS Service Scaling by adding underlying EC2 Instances.
* There a 2 ways EC2 instance scaling can be done

1. __Auto Scaling Group Scaling__  
  - Scale your ASG based on CPU Utilization
  - Add EC2 instances over time
2. __ECS Cluster Capacity Provider (recommended)__
  - Used to automatically provision and scale the infrastructure for your ECS Tasks
  - Capacity Provider paired with an Auto Scaling Group
  - Add EC2 Instances when you’re missing capacity (CPU, RAM…)


__ECS Rolling Updates__  
* When updating from v1 to v2, we can
control how many tasks can be started
and stopped, and in which order

__Amazon ECS – Load Balancing (EC2 Launch Type)__  
* We get a _Dynamic Host Port Mapping_ if you define only the container port in the task definition
* The ALB finds the right port on your EC2 Instances
* You must allow on the EC2 instance’s Security Group any port from the ALB’s Security Group

__Amazon ECS – Environment Variables__  
* Environment Variable
  - __Hardcoded__ – e.g., URLs
  - __SSM Parameter Store__ – sensitive variables (e.g., API keys, shared configs)
  - __Secrets Manager__ – sensitive variables (e.g., DB passwords)
* Environment Files (bulk) – Amazon S3

__Amazon ECS – Data Volumes (Bind Mounts)__  
* Share data between multiple containers in the
same Task Definition
* Works for both EC2 and Fargate tasks
* __EC2 Tasks__ – using EC2 instance storage
  - Data are tied to the lifecycle of the EC2 instance
* __Fargate Tasks__ – using ephemeral storage
  - Data are tied to the container(s) using them
  - 20 GiB – 200 GiB (default 20 GiB)

* Use cases:
  - Share ephemeral data between multiple containers
  - “Sidecar” container pattern, where the “sidecar”
container used to send metrics/logs to other
destinations (separation of conerns)


__Amazon ECS – Task Placement__  
* When an ECS task is started with _EC2 Launch Type_, ECS must determine where to place it, with the constraints of CPU and memory (RAM)
* Similarly, when a service scales in, ECS needs to determine which task to terminate
* You can define:
  - Task Placement Strategy
  - Task Placement Constraints
* Note: only for ECS Tasks with EC2 Launch Type (_Fargate not supported_)

__Amazon ECS – Task Placement Process__  
* Task Placement Strategies are a best effort
* When Amazon ECS places a task, it uses the following process to select the appropriate EC2 Container instance:
  1. Identify which instances that satisfy the _CPU_, _memory_, and _port_ requirements
  2. Identify which instances that satisfy the _Task Placement Constraints_
  3. Identify which instances that satisfy the _Task Placement Strategies_
  4. Select the instances

__Amazon ECS – Task Placement Strategies__  
* __Binpack__
  - Tasks are placed on the least available amount of CPU and Memory
  - Minimizes the number of EC2 instances in use (cost savings)
* __Random__
  - Tasks are placed randomly
* __Spread__
  - Tasks are placed evenly based on the specified value
  - Example: `instanceId`, `attribute:ecs.availability-zone`, …
* You can mix them together, for example:

```json
"placementStrategy": [
  {
    "field": "attribute:ecs.availability-zone",
    "type": "spread"
  },
  {
    "field": "instanceId",
    "type": "spread"
  }
]
```
or

```json
"placementStrategy": [
  {
    "field": "attribute:ecs.availability-zone",
    "type": "spread"
  },
  {
    "field": "memory",
    "type": "binpack"
  }
]
```

__Amazon ECS – Task Placement Constraints__  
* __distinctInstance__
  - Tasks are placed on a different EC2 instance

```json
"placementContraints": [
  {
    "type": "distinctInstance"
  }
]
```
* __memberOf__
* Tasks are placed on EC2 instances that satisfy a specified expression
* Uses the _Cluster Query Language_ (advanced)

```json
"placementConstraints": [
  {
    "type": "memberOf",
    "expression": "attribute:ecs.instance-type =~ t2.*"
  }
]
```

or
```json
"placementConstraints": [
  {
    "type": "memberOf",
    "expression": "attribute:ecs.availability-zone in [eu-west-2a, eu-west-2b]"
  }
]
```

### AWS Copilot
* CLI tool to build, release, and operate production-ready containerized apps
* Run your apps on _AppRunner_, _ECS_, and _Fargate_
* Helps you focus on building apps rather than setting up infrastructure
* Provisions all required infrastructure for containerized apps (ECS, VPC, ELB, ECR…)
* Automated deployments with one command using CodePipeline
* Deploy to multiple environments
* Troubleshooting, logs, health status…

## Amazon EKS
__Amazon EKS – Node Types__  
* __Managed Node Groups__
  - Creates and manages Nodes (EC2 instances) for you
  - Nodes are part of an ASG managed by EKS
  - Supports On-Demand or Spot Instances
* __Self-Managed Nodes__
  - Nodes created by you and registered to the EKS cluster and managed by an ASG
  - You can use prebuilt AMI - Amazon EKS Optimized AMI
  - Supports On-Demand or Spot Instances
* __AWS Fargate__  
  - No maintenance required; no nodes managed

__Amazon EKS – Data Volumes__  
* Need to specify `StorageClass` manifest on your EKS cluster
* Leverages a _Container Storage Interface (CSI)_ compliant driver


* Support for:
  - Amazon EBS
  - Amazon EFS (works with Fargate)
  - Amazon FSx for Lustre
  - Amazon FSx for NetApp ONTAP
