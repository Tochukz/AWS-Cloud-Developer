# Extra 17.7: Elastic Beanstalk with SSL

### Description

This configuration setup an Elastic BeanStalk Environment with SSL configured using ACM certificate to setup a HTTPS listener.  
All HTTP traffic are redirected to HTTPS.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint BeanstalkWithSsl.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BeanstalkWithSsl.yaml  --stack-name BeanstalkWithSsl    --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Get the `EnvironmentUrl` and `AlbDomain` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BeanstalkWithSsl --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the `EnvironmentUrl` or `AlbDomain` to access the application over a browser. This should display the Nginx default welcome page.
2. Login to the Database container using the EC2 Public IP, username and password with a Database client:

- Go to ECS Console, get the Public IP of the running EC2 instance that have been create by Elastic Beanstalk.
- Use the username `root` and the value of the `MYSQL_ROOT_PASSWORD` supplied in the `Dockerrun.aws.json` file for the database password.
- Use the Public IP, username `root` and the password with on Database Client (such as _MySQL WorkBench_) to login to the MySQL database container.

3. Checkout the ECS Cluster and Task Definition created by Elastic Beanstalk :

- Go to the ECS Console > Clusters, you should see the ECS Cluster created by Beanstalk
- There is 1 running task, 1 container instance (EC2) and zero service on the Cluster
- Go to ECS Console > Task Definitions, you should see the Task Definition created by Beanstalk
- Select the task definition > select the lastest revision > click the JSON tab, you should see the details of the task definition generated from the `Dockerrun.aws.json` config.

**Debug Errors**

If the application did not work as expected your can debug by SSHing into the EC2 instance.

```bash
# SSH into the EC2 instance
$ ssh -i dev-simple-key.pem ec2-user@3.8.191.0

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
$ aws cloudformation delete-stack --stack-name BeanstalkWithSsl
```
