# Extra-24.1: Run CodeBuild Locally

### Description

This shows how CodeBuild can be run locally for the purposes of testing and debugging.  
You can use it to test your buildspec.yml file and the commands in it, without having to push changes to your repository and wait for the CodePipeline to run.

### Prerequisites

1. Docker must be installed and running on your local machine.
2. The AWS CLI configured with the necessary permissions to access CodeBuild if your `buildspec` doesn’t depend on AWS credentials

### Steps to run CodeBuild locally

1. Install the CodeBuild local agent  
   Download the CodeBuild agent Docker image:

```bash
$ docker pull public.ecr.aws/codebuild/local-builds:latest
```

2. Run CodeBuild locally
   Navigate into your project directory where your `buildspec.yml` file is located.  
   Run this from your project directory:

<!--This is not working-->

```bash
$ cd ~/workspace/nest-app-07-07
$ docker run -it --rm \
  -v /Users/tochukz/workspace/nest-app-07-07:/codebuild/output/src \
  -v /var/run/docker.sock:/var/run/docker.sock \
  public.ecr.aws/codebuild/local-builds:latest \
  -i aws/codebuild/standard:7.0 \
  -a /codebuild/output/artifacts \
  -s /codebuild/local/src
```

Where:
-i = The Docker image used for the build (must match your AWS CodeBuild environment image)
-a = Directory where artifacts will be written
-s = Source directory (your project)

3. When it runs:

- You’ll see the exact logs that AWS CodeBuild would produce.
- You can edit your `buildspec.yml` or fix any local issues before pushing again.
