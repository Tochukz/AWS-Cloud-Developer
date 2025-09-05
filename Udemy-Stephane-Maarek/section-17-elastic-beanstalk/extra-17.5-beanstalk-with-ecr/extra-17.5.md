# Extra 17.4: Single Container Beanstalk Application with ECR image

### Description

This configuration is a modification of `extra-17.4-beanstalk-with-docker` where the Docker image (`nginx:latest`) is pulled from the public DockerHub registry.  
However, in this configuration, the Docker image is stored in a private ECR repository and pulled from there. The Docker image is built from a Node Docker application.

### Operation

**Before Deployment**

1. Build and test the Docker image locally

```bash
$ cd express-app
$ docker build -t express-app .
$ docker run -p 81:3000 express-app
# use the url http://localhost:81 to test the application
```

2. Push the Docker image to a private ECR repository

```bash
$ docker tag express-app:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/nestjs-repos:latest
$ aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
$ docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/express-app:latest
```

3. Update the `Image` section of the `node-container-config-v1/Dockerrun.aws.json` file with your ECR image URI
4. Package the `Dockerrun.aws.json` file into a zip file and upload to S3

```bash
$ deploy-config.sh node-container-config-v1
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
