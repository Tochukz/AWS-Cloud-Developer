# Extra 10.1: Launch Task on EC2 Container Instance - HOL-140

### Description

This example is a continution of `hol-139-ec2-launch-type` and a variation of `hol-140-task-service-alb`
In `hol-139-ec2-launch-type` we created an ECS Cluster and registered an EC2 instance to serve as a _ECS Container Instance_.  
Here we lauch an ECS Task, to run on the _ECS Container Instance_.  
The ECS Task is a standalone task and is not managed by an ECS Service.

An _ECS Container Instance_ is an EC2 instance that is running the _ECS-Optimized AMI_. It may also be called just _container instance_ in the context of an ECS cluster running an EC2 launch type.

**Note**: CloudFormation does not natively support running standalone tasks so there is no `AWS::ECS::Task` resource type.  
However, we can run a task using ECS Console, AWS CLI or Custom CloudFormation resource.  
The `RunTask.yam` template defines a custom CloudFormation resource to do just that.

### Operation

**Before deployment**  
Make sure the AMI used is an _ECS optimized AMI_ and a recent or the latest version. Old or out-dated ECS optimized AMI may not work.  
To get the latest EC2 optimized AMI

1. Go the EC2 > Images > AMI Catalog
2. Search for "ECS-Optimized"
3. Click the _AWS Marketplace AMIs_ tab
4. You may select the _Free_ filter option under _Pricing model_.
5. Select a recent AMI, for me this was "Amazon ECS-Optimized Amazon Linux 2023 (AL2023) x86_64 AMI"
6. After clicking the select button, on the pop-up check the Pricing tab. Some AMIs may have Free tier for `t2.micro` instances and paid for other larger instance.
7. Scroll down and and click the _Subscribe now_ button or the _Subscribe on instance launch_ button if needed. Some AMIs requires you to be subscribed before you can use them.
8. You may note be able to find the AMI's Id, in that case try launching a test instance on the console and searching for the AMI when you get to the AMI selection section. After selecting it, you should see the AMI Id on the summary page on the left.

Note that most ECS-optimized AMI may require you to subscribe first before you can use them.

**Deployment**

Lint the templates

```bash
$ cfn-lint Ec2LaunchType.yaml
$ cfn-lint RunTask.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Ec2LaunchType.yaml --stack-name Ec2LaunchType  --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```

**After deployment**

1. Run a Task using the `RunTask` custom resource in the `RunTask` template

```bash
$ aws cloudformation deploy --template-file RunTask.yaml --stack-name RunTask --capabilities CAPABILITY_NAMED_IAM
```

2. Alternately, you can run a task using AWS CLI

```bash
$ aws ecs run-task --cluster SimpleCluster --task-definition NginxFamily:2 > output-2.json
```

For the task defintion parameter you can use `Family:revision` as the value or the full `TaskDefinitionArn`.

Note that you may not be able to run more than one tasks for the EC2 Instance of `t2.micro` because of the CPU and memory limitation.

3. Confirm that the Task has been created
   - Go the the ECS Console > Cluster > select the Cluster
   - Click on the _Tasks_ tab to view all tasks.

**Testing**

**Debug Error**

1. The `RunTask` custom resource may not successfully create the task. If you check in the Console and not see the task then you can check the Lambda logs to find the reason for the error.  
   See `sample-lambda-log1.json` and `sample-lambda-log2.json` for examples of failed `RunTask` operaton by the `RunTask` custom resource.

2. A task may fail to run in an EC2 container instance because the instance does not have enough resource - `CPU` and `memory`

```bash
# Get the ContainerInstanceArn of the EC2 instance
$ aws ecs list-container-instances --cluster SimpleCluster
# Use the ContainerInstanceArn to get the instance details
$ aws ecs describe-container-instances --cluster SimpleCluster --container-instances <container-instance-arn> > container-instance.json
```

Check the `containerInstances.remainingResources` array to see the remaining CPU and memory available to run another task in the EC2 instance.  
The `containerInstances.attributes` array shows what attribute the instance can accomodate for a Task definition. For example the Task Definition's `PlacementConstraints` must be compatible with the `containerInstances.attributes`.

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name RunTask
$ aws cloudformation delete-stack --stack-name Ec2LaunchType
```
