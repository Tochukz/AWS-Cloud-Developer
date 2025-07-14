# Section 18: Cloud Formation
__How to define a Condition__  
```yaml
Conditions:
  CreateProdResource: !Equals [!Ref EnvType, prod]
```
* The logical ID is for you to choose. It’s how you name condition
* The intrinsic function (logical) can be any of the following:
  - `Fn::And`
  - `Fn::Equals`
  - `Fn::If`
  - `Fn::Not`
  - `Fn::Or`

__CloudFormation – Intrinsic Functions__  
* `Fn::Ref`
* `Fn::GetAtt`
* `Fn::FindInMap`
* `Fn::ImportValue`
* `Fn::Join`
* `Fn::Sub`
* `Fn::ForEach`
* `Fn::ToJsonString`
* Condition Functions (`Fn::And`, `Fn::Or`, `Fn::If`, `Fn::Not`, `Fn::Equals`)
* `Fn::Base64`
* `Fn::Cidr`
* `Fn::GetAZs`
* `Fn::Select`
* `Fn::Split`
* `Fn::Transform`
* `Fn::Length`

__CloudFormation – Rollbacks__  
* Stack Creation Fails:
  - Default: everything rolls back (gets deleted). We can look at the log
  - Option to disable rollback and troubleshoot what happened
  ```bash
  $ aws cloudformation deploy --template-file Simple.yaml --stack-name Simple --disable-rollback
  # create-stack and update-stack also support --disable-rollback option
  ```
* Stack Update Fails:
  - The stack automatically rolls back to the previous known working state
  - Ability to see in the log what happened and error messages
* Rollback Failure? Fix resources manually then issue
`ContinueUpdateRollback` API from Console
  - Or from the CLI using `continue-update-rollback` API call
    ```bash
    $ aws cloudformation continue-update-rollback --stack-name Simple
    ```


__CloudFormation – Service Role__   
* IAM role that allows CloudFormation to
create/update/delete stack resources on your
behalf
* Give ability to users to create/update/delete the
stack resources even if they don’t have
permissions to work with the resources in the
stack
* Use cases:
  - You want to achieve the least privilege principle
  - But you don’t want to give the user all the required
permissions to create the stack resources
* User must have `iam:PassRole` permissions

__CloudFormation Capabilities__  
* _CAPABILITY_NAMED_IAM_ and _CAPABILITY_IAM_
  - Necessary to enable when you CloudFormation template is creating or updating IAM resources (IAM User, Role, Group, Policy, Access Keys, Instance Profile…)
  - Specify CAPABILITY_NAMED_IAM if the resources are named
* _CAPABILITY_AUTO_EXPAND_
  - Necessary when your CloudFormation template includes Macros or Nested Stacks (stacks within stacks) to perform dynamic transformations
  - You’re acknowledging that your template may change before deploying
* _InsufficientCapabilitiesException_
  - Exception that will be thrown by CloudFormation if the capabilities haven’t been acknowledged when deploying a template (security measure)

__CloudFormation – DeletionPolicy Delete__  
* __DeletionPolicy:__
  - Control what happens when the CloudFormation template is deleted or when a resource is removed from a CloudFormation template
  - Extra safety measure to preserve and backup resources
* Default `DeletionPolicy=Delete`
  - ⚠ Delete won’t work on an S3 bucket if the bucket is not empty

```yaml
# Deletion policy - Delete
Resources:
  Instance:
    Type: AWS::IAM::Instance
    DeletetionPolicy: Delete # Delete | Retain
    Properties:
      InstanceType: t2.micro
      ImageId: ami-123456789

  Bucket:
    Type: AWS::S3::Bucket
    DeletionPolicy: Delete # Won't work if bucket not empty
    Properties:
      BucketName: simple-bucket
```

__CloudFormation – DeletionPolicy Retain__  
* __DeletionPolicy=Retain:__
  - Specify on resources to preserve in case of CloudFormation deletes
* Works with any resources

```yaml
# Deletion policy - Retain
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    DeletionPolicy: Retain
    Properties:
      BucketName: simple-bucket
```

__CloudFormation – DeletionPolicy Snapshot__  
* __DeletionPolicy=Snapshot__
* Create one final snapshot before deleting the resource
* Examples of supported resources:
  - EBS Volume, ElastiCache Cluster, ElastiCache ReplicationGroup
  - RDS DBInstance, RDS DBCluster, Redshift Cluster, Neptune DBCluster, DocumentDB DBCluster

```yaml
# Deletion policy - Snapshot
Resources:
  Database:
    Type: AWS::RDS::DBInstance
    DeletionPolicy: Snapshot
    Properties:
      DbInstanceClass: db.t3.micro
      AllocatedStorage: 20
      Engine: mysql
      MasterUsername: admin
      MasterUserPassword: whatever
```


__CloudFormation – Stack Policies__  
* During a CloudFormation Stack update, all update actions are allowed on all resources (default)
* _A Stack Policy is a JSON document that defines the update actions that are allowed on specific resources during Stack updates_  
* Protect resources from unintentional updates
* When you set a Stack Policy, all resources in the Stack are protected by default
* Specify an explicit ALLOW for the resources you want to be allowed to be updated

__CloudFormation – Termination Protection__  
* To prevent accidental deletes of CloudFormation Stacks, use `TerminationProtection`

__CloudFormation – Custom Resources__   
* Used to
  - define resources not yet supported by CloudFormation
  - define custom provisioning logic for resources can that be outside of CloudFormation (on-premises resources, 3rd party resources…)
  - have custom scripts run during create / update / delete through Lambda functions (running a Lambda function to empty an S3 bucket before being deleted)
* Defined in the template using `AWS::CloudFormation::CustomResource` or `Custom::MyCustomResourceTypeName` (recommended)
* Backed by a Lambda function (most common) or an SNS topic

__How to define a Custom Resource__   
* __ServiceToken__ specifies where CloudFormation sends requests to, such as Lambda ARN or SNS ARN (required & must be in the same region)
* Input data parameters (optional)

```yaml
Resources:
  Type: CustomMyLambdaResource
  ServiceToken: arn:aws:lambda:<region>:<account-id>:function:<function-name>
  #Input: values #optional
  ExampleProperty: ExampleValue
```

__Use Case – Delete content from an S3 bucket__  
* __You can’t delete a non-empty S3 bucket__  
* To delete a non-empty S3 bucket, you must first delete all the objects inside it
* We can use a custom resource to empty an S3 bucket before it gets deleted by CloudFormation

__CloudFormation – StackSets__   
* Create, update, or delete stacks across _multiple accounts_ and _regions_ with a single operation/template
* Target accounts to create, update, delete stack instances from StackSets
* When you update a stack set, all associated stack instances are updated throughout all accounts and regions
* _Can be applied into all accounts of an AWS Organization_
* Only Administrator account (or Delegated Administrator) can create StackSets
