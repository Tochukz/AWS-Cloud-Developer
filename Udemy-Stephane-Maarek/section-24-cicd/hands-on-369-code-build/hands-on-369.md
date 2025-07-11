# Lesson 369: CodeBuild - Part 1 Hands On

### Description

This configuration creates a CodeBuild project that build a NestJS application hosted on GitHub.  
The build is triggered for ever push to the master branch of the GitHub repository.  
After the build is complete, the build artifact is stored in a S3 bucket and can be downloaded for inspection.

### Operation

**Before Deployment**
This template uses an existing GitHub Connection ARN for it's `GitHubConnectionArn` parameter in the `CodeBuild` stack.  
See `Udemy-Neal-Davis/section-11-developer-tools/hol-154-build-stage/hol-154.md` on how to create a GitHub Connection.

A NestJS application in a GitHub repository (`nest-app-07-07`) is used for this demonstration.
This GitHub repo contains a `buildspec.yml` file in the root of the project directory.   
A copy of the `buildspec.yml` file is also included in here.

**Deployment**  
Lint the templates

```bash
$ cfn-lint CodeBuild.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CodeBuild.yaml  --stack-name CodeBuild --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After Deployment**

**Testing**

1. Go to the CodeBuild console and start a build.
2. After the build complete, check the _Build details_, locate the artifact file that point to the S3 object.
3. Copy the artifact file and unzip it to view the built code.
4. Update the Git repos code locally, commit and push to the remote repo.
5. This should trigger the build to start running.
6. You can also look at the CloudWatch logs.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name CodeBuild
```
