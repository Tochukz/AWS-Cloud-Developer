## Manual Deployment

**Description**  
How to run one-off deployment using existing CodeDeploy Application and AWS CLI.  
This is useful for testing your `taskdef.json` and `appspec.yml` and debugging the deploy stage of a CodePipeline configuration.

**Steps**

1. Replace the `TaskDefinition` property placeholder in the `appspec.yml` file with the current TaskDefinition ARN, including the revision number in the ARN.

2. Zip up your `taskdef.json` and `appspec.yml` files and upload to S3

```bash
$ zip artifact-2806.zip appspec.yml taskdef.json
$ aws s3 cp artifact-2806.zip s3://chucks-workspace-storage/v0.0.3/artifact-2806.zip
```

3. Create the Deployment Manually

```bash
$ aws deploy create-deployment \
  --application-name SimpleEcsDeploy \
  --deployment-group-name SimpleEcsDeploymentGroup \
  --revision "revisionType=S3,s3Location={bucket=chucks-workspace-storage,key=v0.0.3/artifact-2806.zip,bundleType=zip}" \
  --deployment-config-name CodeDeployDefault.ECSAllAtOnce \
  --description "Manual one-off ECS deployment test"
```

4. Monitor the Deployment
   You can monitor the deployment from the AWS Developer Tools Console:

- Go to CodeDeploy > Deployments
- Find the deployment ID returned from the CLI
- View Events and Logs

Or via CLI:

```bash
$ aws deploy get-deployment --deployment-id <deployment-id>
```

Linting your yaml file

```bash
$ yamllint appspec.yml
```
