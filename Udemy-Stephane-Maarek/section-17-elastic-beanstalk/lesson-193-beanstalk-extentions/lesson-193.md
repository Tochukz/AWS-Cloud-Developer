# Lesson 192: Beanstalk Extensions - Hands On

### Description

The example shows how to use `.ebextensions/*.config` file to modify the Elastic Beanstalk environment.  
With a `.ebextensions/*.config` file you modify the your Elastic Beanstalk environment from within the application's source code.  
With `.ebextensions/*.config` you can also provision any CloudFormation resources you need to support your application e.g S3 Bucket, ElastiCache etc.

### Operation

**Before Deployment**
Deploy the ExpressJS application code the S3 bucket

```bash
$ ./deploy-express.sh
```

**Deployment**  
Lint the templates

```bash
$ cfn-lint EbExtensions.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file EbExtensions.yaml  --stack-name EbExtensions --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  
Get the `EnvironmentUrl` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name EbExtensions --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**
Use the `EnvironmentUrl` to test the application on a Browser.  
Confirm that the values of the environment variables `DB_URL` and `NODE_ENV` defined in `express-app/.ebextensions/env-vars.config` file is present in the page's content.

**Debug Errors**

**Cleanup**  
Note: You must delete any additional Application Version you created outside the template before you can delete the Application defined in the template.

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EbExtensions
```
