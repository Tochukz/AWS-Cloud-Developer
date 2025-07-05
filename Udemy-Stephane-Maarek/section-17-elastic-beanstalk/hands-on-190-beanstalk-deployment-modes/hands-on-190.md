# Lesson 190: Beanstalk Deployment Modes - Hands On

### Description

The template creates an Elastic Beanstalk Environment with the `Immutable` deployment policy enabled.  
With `Immutable` deployment policy, the new application is deployed to new instances in a new temporal ASG.  
After the deployment is successful, the instances are transfered to the main ASG while the temporal ASG is delete.

### Operation

**Before Deloyment**  
Copy the ExpressJS application to S3 bucket

```bash
$ ./deploy-express.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint DeploymentMode.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file DeploymentMode.yaml  --stack-name DeploymentMode --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

1. Get the `EnvironmentUrl` and `AlbDomain` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name DeploymentMode --query "Stacks[0].Outputs" --no-cli-pager
```

2. Use the `EnvironmentUrl` to access the application over a browser. Keep the browser tab open for later.

3. Use the `InstanceProfileArn` to update the `Value` of the `IamInstanceProfile` OptionName in `options-settings.json`.

4. The `options-settings.json` contains identical settings as the `OptionSettings` property of the `Environment` resource.

**Testing**  
We need to test the `Immutable` deployment policy.

1. Update the respone message sent for the root path in the `express-app/app.js` file.
2. Update the `versionCode` from `express-app-04-07-v1.zip` to `express-app-04-07-v2.zip` in `deploy-express.sh` file.
3. Redeploy the updated code version

```bash
$ ./deploy-express.sh
```

4. Create a new application version

```bash
$ aws elasticbeanstalk create-application-version \
    --application-name NodeApp \
    --version-label NodeApp-v2 \
    --source-bundle "S3Bucket=chucks-workspace-storage,S3Key=beanstalk-artifacts/express-app-04-07-v2.zip" > output-1.json
```

5. Create another environment identical to the existing environment

```bash
# Make sure you have updated options-settings.json with the InstanceProfileArn output as described in the After Deployment section
# Use the option-settings to create another environment
$ export platformArn="arn:aws:elasticbeanstalk:eu-west-2::platform/Node.js 22 running on 64bit Amazon Linux 2023/6.6.0"
$ aws elasticbeanstalk create-environment --application-name NodeApp  --version-label NodeApp-v2 --environment-name SimpleNodeEnvironment-v2 --platform-arn $platformArn --option-settings file://option-settings.json > output-2.json
```

You can use the same the platform-arn from the used in the template.  
Note that the version-label is the same as the one use for the newly created version in a previous step.

6. Get the `CNAME` of the new environment

```bash
$ aws elasticbeanstalk describe-environments --application-name NodeApp --environment-names SimpleNodeEnvironment-v2  > output-environment.json
# Search for CNAME in the output file
```

7. Confirm the new application code is running using the `CNAME` using a browser. Keep the browser tab open.

8. Swap environment domain

```bash
$ aws elasticbeanstalk swap-environment-cnames \
  --source-environment-name SimpleNodeEnvironment \
  --destination-environment-name SimpleNodeEnvironment-v2
```

9. Go back the ealier tab with the `EnvironmentUrl` and refresh the page. It should now serve the new version.
10. Got back the the tab with the `CNAME` and refresh the page. It shoudl now serve the old code verson.

11. Terminate the old Beanstalk Envionment.

```bash
$ aws elasticbeanstalk terminate-environment --environment-name SimpleNodeEnvironment
```

**Debug Errors**

**Cleanup**

1. Terminate the new Beanstalk Environment

```bash
$ aws elasticbeanstalk terminate-environment --environment-name SimpleNodeEnvironment-v2
```

Wait for the Environment to be deleted before deleting the stack.

2. Delete the verson

```bash
$ aws elasticbeanstalk delete-application-version --application-name NodeApp --version-label NodeApp-v2
```

Wait for the Version to be deleted before deleting the stack.

3. To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name DeploymentMode
```
