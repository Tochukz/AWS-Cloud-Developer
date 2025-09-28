# Extra 11.1: Blue-Green Deployment with Blue-Green Code Deploy Hook

### Description

This is a modification of `hol-156-fargate-blue-green-part-4` which uses CodeDeploy to deploy a containerized application to ECS.    
In `hol-156-fargate-blue-green-part-4` we used the `AWS::CodeDeploy::Application` and `AWS::CodeDeploy::DeploymentGroup` to achieve the blue-green deployment strategy but here we are using the `AWS::CodeDeploy::BlueGreen` hook instead to get a similar outcome.   

# Amazon ECS blue/green deployments through CodeDeploy do not use the AWS::CodeDeploy::DeploymentGroup resource.
 # To perform Amazon ECS blue/green deployments, use the AWS::CodeDeploy::BlueGreen hook.
 # See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/blue-green.html
