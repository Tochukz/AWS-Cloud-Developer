# Lesson 376: Beanstalk Extensions - Hands On

### Description

This configuration sets up a CodePipeline that deploys a NodeJS application from a GitHub repository to two Beanstalk environments - development and production environment.  
The Piepline first deploys to a Developmenet environment automatically and then waits for approval before deploying to the Production environment.

### Operation

**Before Deployment**
This template using an existing GitHub Connection ARN for it's `GitHubConnectionArn` parameter in the `CodePipeline` stack.  
See `Udemy-Neal-Davis/section-11-developer-tools/hol-154-build-stage/hol-154.md` on how to create a GitHub Connection.

**Deployment**  
Lint the templates

```bash
$ cfn-lint BeanstalkMultiEnv.yaml
$ cfn-lint CodePipeline.yaml
```

1. Deploy the `BeanstalkMultiEnv` stack

```bash
$ aws cloudformation deploy --template-file BeanstalkMultiEnv.yaml  --stack-name BeanstalkMultiEnv --capabilities CAPABILITY_NAMED_IAM
```

2. Get the `DevEnvironmentUrl` and `ProdEnvironmentUrl` from the `BeanstalkMultiEnv` stack for testing

```bash
$ aws cloudformation describe-stacks --stack-name BeanstalkMultiEnv --query "Stacks[0].Outputs" --no-cli-pager
```

You should find the default Elastic Beanstalk NodeJS application home page.

3. Deploy the `CodePipeline` stack

```bash
$ aws cloudformation deploy --template-file CodePipeline.yaml  --stack-name CodePipeline --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After Deployment**  
Get the `EnvironmentUrl` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BeanstalkMultiEnv --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**
Use the `EnvironmentUrl` to test the application on a Browser.  
Confirm that the values of the environment variables `DB_URL` and `NODE_ENV` defined in `express-app/.BeanstalkMultiEnv/env-vars.config` file is present in the page's content.

**Debug Errors**

**Cleanup**  
Note: You must delete any additional Application Version you created outside the template before you can delete the Application defined in the template.

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name CodePipeline
$ aws cloudformation delete-stack --stack-name BeanstalkMultiEnv
```
