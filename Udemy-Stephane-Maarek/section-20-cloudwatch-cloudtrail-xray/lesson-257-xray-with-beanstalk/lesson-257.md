# Lesson 257 - X-Ray with BeanStalk

### Description

This configuration enables X-Ray tracing for an Elastic Beanstalk application.  
We use the `aws:elasticbeanstalk:xray` namespace to enable X-Ray tracing for the application.  
Alternatively, X-Ray can be enabled from withing the application using a `.ebextensions/xray-daemon.config` file at the root of application source code with the following content:

```yaml
option_settings:
  aws:elasticbeanstalk:xray:
    XRayEnabled: true
```

This configuration only sets up the environment to support X-Ray tracing, you still need to instrument your application code with the X-Ray SDK to send trace data to the X-Ray daemon.

### Operation

**Before Deployment**  
Note that no application code is provided in this example. This is because ElasticBeankstalk will use it's default application if no application version is provided.

**Deployment**  
Lint the templates

```bash
$ cfn-lint XRayWithBeanStalk.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file XRayWithBeanStalk.yaml  --stack-name XRayWithBeanStalk --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

Get the `EnvironmentUrl` and `PublicIp` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name XRayWithBeanStalk --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Use the `EnvironmentUrl` to access the application in a web browser.
2. Generate some traffic by refreshing the page a few times.
3. Go to the X-Ray console to view the traces. (This should only work if the application code is instrumented with the X-Ray SDK).

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name XRayWithBeanStalk
```
