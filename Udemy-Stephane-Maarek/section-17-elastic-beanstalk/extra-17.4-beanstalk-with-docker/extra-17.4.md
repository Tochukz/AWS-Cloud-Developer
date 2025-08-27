# Extra 17.4: Multi-Container Beanstalk Application

### Description

### Operation

**Before Deployment**  
Package the `Dockerrun.aws.json` file into a zip file and upload to S3

```bash
$ zip -r docker-package.zip Dockerrun.aws.json
$ aws s3 cp docker-package.zip s3://chucks-workspace-storage/artifacts/docker-package-2708.zip
```

**Deployment**
Lint the templates

```bash
$ cfn-lint SingleContainer.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SingleContainer.yaml  --stack-name SingleContainer --capabilities CAPABILITY_IAM --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Get the `EnvironmentUrl` and `EndpointUrl` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SingleContainer --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**
Use the `EnvironmentUrl` or `EndpointUrl` to access the application over a browser.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SingleContainer
```

### Learn more

🔐 Security Tip:

Do NOT hardcode secrets (e.g., DB password) in `Dockerrun.aws.json`.  
Use Elastic Beanstalk Environment Variables or AWS Secrets Manager.

✅ **Single-Container Docker on Elastic Beanstalk**

- Uses Docker directly on EC2 instances, not ECS.
- The EB platform launches EC2 instances, installs Docker, and runs your one container.
- No ECS cluster, no ECS task definitions, no ECS service.
- Scaling is managed by Elastic Beanstalk Auto Scaling groups, not ECS.
