# Extra 17.1: Elastic Beanstalk Custom Platform

### Description

In the configuration we use the Elastic Beanstak configuration resource, `AWS::ElasticBeanstalk::ConfigurationTemplate` to remove the configuration aspect away from the Beanstak environment resouce `AWS::ElasticBeanstalk::Environment`.

### Operation

**Before Deloyment**  
Copy the ExpressJS application to S3 bucket

```bash
$ ./deploy-express.sh
```

**Deployment**
Lint the templates

```bash
$ cfn-lint EbConfigTemplate.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EbConfigTemplate.yaml  --stack-name EbConfigTemplate --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `EnvironmentUrl` and `AlbDomain` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name EbConfigTemplate --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**
Use the `EnvironmentUrl` or `AlbDomain` to access the application over a browser.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EbConfigTemplate
```
