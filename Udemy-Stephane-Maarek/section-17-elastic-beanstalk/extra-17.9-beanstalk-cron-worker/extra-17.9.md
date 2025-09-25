# Extra 17.9: Beanstalk Cron Worker

### Description

In this example, we configure Elastic Beanstalk Worker Environment that run  scheduled tasks defined in the `cron.yaml` file.

**Important rules**  
1. The `cron.yaml` must be named exactly `cron.yaml`.
2. Must be in the root directory of the `.zip` file.
3. EB will automatically detect it and configure the _SQSD daemon_ to schedule the tasks.

**How EB Uses It**  
1. When your worker environment launches:
3. EB scans the application bundle for cron.yaml.
3. If found, it configures cron jobs in the EC2 instance via the SQSD daemon.
4. SQSD will then send HTTP POST requests to your worker’s endpoints based on the schedule defined in cron.yaml.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint BeanstalkCronWorker.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BeanstalkCronWorker.yaml  --stack-name BeanstalkCronWorker --parameter-overrides file://private-parameters.json
```

**After Deployment**  
Get the `EnvironmentUrl` and `AlbDomain` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BeanstalkCronWorker --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name BeanstalkCronWorker
```

### Learn More
