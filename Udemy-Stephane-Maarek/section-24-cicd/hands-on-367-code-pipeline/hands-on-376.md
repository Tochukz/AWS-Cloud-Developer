# Lesson 376: CodePipeline - Hands On

### Description

This configuration sets up a CodePipeline that deploys a NodeJS application from a GitHub repository to two Beanstalk environments - Development and Production environment.  
The Pipeline first deploys to the Developmenet environment automatically and then waits for approval before deploying to the Production environment.

### Operation

**Before Deployment**  
This template uses an existing GitHub Connection ARN for it's `GitHubConnectionArn` parameter in the `CodePipeline` stack.  
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

Use the URLs to test the application on a Browser.  
You should find the default Elastic Beanstalk NodeJS application home page.

3. Deploy the `CodePipeline` stack

```bash
$ aws cloudformation deploy --template-file CodePipeline.yaml  --stack-name CodePipeline --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After Deployment**

**Testing**

1. After the deployment of the `CodePipeline` stack, it should automatically run it's first build immediately,
2. Refresh the browser tag with the `DevEnvironmentUrl` page and confirm the content change.
3. Go to the CodePipeline console, locate the Pipeline and approve the deployment to the Production Environment. Wait for the build to complete.
4. Return to the browser tab where `ProdEnvironmentUrl` is opened and refresh the page to confirm a new version of the code has bee deployed.
5. Make a change to the code represented by the repo `node-app-24-06`.
6. Commit you changes and push the commit to the remote repo.
7. Go to the CodePipeline Console and watch the build running for the updated code.
8. Check the Applications on the browser to confirm the new changes.

**Debug Errors**

**Cleanup**  
Note: You must delete any additional Application Version you created outside the template before you can delete the Application defined in the template.

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name CodePipeline
$ aws cloudformation delete-stack --stack-name BeanstalkMultiEnv
```
