# AWS Cloud Developer
[AWS Certified Developer - Associate](https://aws.amazon.com/certification/certified-developer-associate/)   

### CodeBuild Local Build Tool
To test your CodeBuild `buildspec.yml` locally before deploying your CloudFormation template, the best and most accurate method is to use _AWS CodeBuild’s local build environment_, also known as the _CodeBuild local agent_.   
This allows you to fully simulate the CodeBuild environment — including runtime, build commands, phases, environment variables, and artifacts — all on your machine using Docker.

__Requirements__  
What you need:
* Docker installed on your machine
* Your `buildspec.yml` file
* The same image you plan to use in CodeBuild (e.g., `aws/codebuild/standard:7.0`)

__Steps__  
1. Install CodeBuild Local Agent
Pull the official agent:
```bash
$ docker pull public.ecr.aws/codebuild/local-builds:latest
```
2. Pull the CodeBuild runtime image
You must use the SAME runtime image as configured in the CodeBuild project environment.  
Example (Standard 7.0):
```bash
# $ docker pull public.ecr.aws/codebuild/amazonlinux2-x86_64-standard:7.0
$ docker pull public.ecr.aws/codebuild/amazonlinux2-x86_64-standard:5.0  
```
Note that the image here have the `public.ecr.aws` prefix whereas the image in your cloud formation template will only have the `aws` prefix.

3. Run the local build
From your project root (where `buildspec.yml` exists):
```bash
$ EnvImage="public.ecr.aws/codebuild/amazonlinux2-x86_64-standard:5.0"
$ docker run \
  -it \
  -v "$(pwd)":/codebuild/output/src \
  -e "IMAGE_NAME=$EnvImage" \
  public.ecr.aws/codebuild/local-builds:latest \
  build
```
This simulates a CodeBuild execution and runs ALL phases:
* install
* pre_build
* build
* post_build
It prints the same logs you would get in AWS CodeBuild.

4. Test with an override buildspec
Useful when you want to test without affecting your committed buildspec:
```bash
$ EnvImage="public.ecr.aws/codebuild/amazonlinux2-x86_64-standard:5.0"
$ docker run \
  -it \
  -v "$(pwd)":/local \
  -e "IMAGE_NAME=$EnvImage" \
  public.ecr.aws/codebuild/local-builds:latest \
  build -c local/buildspec-test.yml
```
5. Optional: Add Environment Variables Just Like CodeBuild
```bash
-e "ENV_VAR1=value" \
-e "ENV_VAR2=abc" \

```
To simulate parameter store:
```bash
-e "DB_PASSWORD=my-password"
```
6. Validate Artifact Output
```bash
./codebuild/output/artifacts/
```
Check that the build produced:
* zipped artifacts
* reports
* compiled binaries
* migrations packages, etc.
