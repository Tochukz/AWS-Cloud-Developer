# Lesson 370: CodeBuild - Part 2 - Hands On

### Description

This configuration is a continuation of `hands-on-369-code-build` which configures a CodeBuild project to build a NestJS application and send the build artifacts to an S3 bucket.  
Here we integrate the CodeBuild project with a CodePipeline to automate the build.  
This time, CodePipeline will get the source code from a GitHub repository, and uses CodeBuild in it's second stage to build the application and `ElasticBeanstalk` provider in the third stage to deploy the application to a `ElasticBeanstalk` environment.

### Operation

**Before Deployment**  
This template uses an existing GitHub Connection ARN for it's `GitHubConnectionArn` parameter in the `BuildAndPipeline` stack.  
See `Udemy-Neal-Davis/section-11-developer-tools/hol-154-build-stage/hol-154.md` on how to create a GitHub Connection.

A NestJS application in a GitHub repository (`nest-app-07-07`) is used for this demonstration.
This GitHub repo contains a `buildspec.yml` file in the root of the project directory.  
A copy of the `buildspec.yml` file is also included in here.

**Deployment**  
Lint the templates

```bash
$ cfn-lint Beanstalk.yaml
$ cfn-lint CodeBuild.yaml
```

1. Deploy the `Beanstalk` stack

```bash
$ aws cloudformation deploy --template-file Beanstalk.yaml  --stack-name Beanstalk --capabilities CAPABILITY_NAMED_IAM
```

2. Get the `DevEnvironmentUrl` and `ProdEnvironmentUrl` outputs from the `Beanstalk` stack

```bash
$ aws cloudformation describe-stacks --stack-name Beanstalk --query "Stacks[0].Outputs" --no-cli-pager
```

Use the `DevEnvironmentUrl` and `ProdEnvironmentUrl` outputs to access the Beanstalk environments in a browser.

3. Deploy the `BuildAndPipeline` stack

```bash
$ aws cloudformation deploy --template-file BuildAndPipeline.yaml  --stack-name BuildAndPipeline --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After Deployment**

**Testing**

1. Go to the CodePipeline console and see the Build and deployment in action.
2. After the `DeployToDev` stage is complete, you can access the Dev environment using the `DevEnvironmentUrl` output from the `Beanstalk` stack.
3. You will need to Approve the `DeployToProd` stage manually before the artifact will be deploy the the Production environment.
4. After the production deployment is complete, you can access the Prod environment using the `ProdEnvironmentUrl` output from the `Beanstalk` stack.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name BuildAndPipeline
$ aws cloudformation delete-stack --stack-name Beanstalk
```
