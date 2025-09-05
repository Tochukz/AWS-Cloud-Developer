# Extra 17.4: Single Container Beanstalk Application

### Description

This example configures a Docker Application in an Elastic Beanstalk Environment. It uses a single container and deploys it using the _v1_ syntax of the `Dockerrun.aws.json` file.  
The docker application is a simple Nginx web server that serves the default Nginx welcome page.

### Operation

**Before Deployment**  
Package the `Dockerrun.aws.json` file into a zip file and upload to S3

```bash
$ ./deploy-config.sh ngix-container-config-v1
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
Use the `EnvironmentUrl` or `EndpointUrl` to access the application on a browser.

**Debug Errors**  
If the application does not work as expected your can debug by SSHing into the EC2 instance.

```bash
# SSH into the EC2 instance
$ ssh -i Udemy-Neal-Davis/dev-simple-key.pem ec2-user@3.8.191.0

# Check the running docker containers
$ sudo docker ps

# Check the docker images that have been pulled
$ sudo docker images

# Check if the application is running locally on the instance
$ curl localhost
```

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
