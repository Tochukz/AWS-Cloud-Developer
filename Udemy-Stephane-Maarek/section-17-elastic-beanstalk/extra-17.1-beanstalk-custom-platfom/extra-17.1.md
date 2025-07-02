# Extra 17.1: Elastic Beanstalk Custom Platform

### Description

In this configuration we create Elastic Beanstalk Environment using a Custom Platform.  
When we use Custom platform for the `AWS::ElasticBeanstalk::Environment` resource, we set the `PlatformArn` and omit the `SolutionStackName` or set it to null.

To view the list of custom platform available in a specific AWS region:

```bash
$  aws elasticbeanstalk list-platform-versions > output-platforms.json

# To reduce it to platform category and platform ARN only
$ aws elasticbeanstalk list-platform-versions --query "PlatformSummaryList[].{Category: PlatformCategory, Arn: PlatformArn}" > output-category-arns.json
```

### Operation

**Before Deloyment**  
Copy the ExpressJS application to S3 bucket

```bash
$ ./deploy-express.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint EbCustomPlatform.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EbCustomPlatform.yaml  --stack-name EbCustomPlatform --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `EnvironmentUrl` and `EnvironmentIp` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name EbCustomPlatform --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the `EnvironmentUrl` or `EnvironmentIp` to access the application over a browser.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EbCustomPlatform
```
