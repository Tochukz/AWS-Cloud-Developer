# Extra-18.11: CloudFormation package command

### Description

The example shows how you can use `cloudformation package` command to package your Lambda function code and upload it to an S3 bucket, generating a new CloudFormation template that references the uploaded code.

Here we have a simple Lambda function defined in `index.js` and a CloudFormation template `SimpleTemplate.yaml` that defines a Lambda function resource. After running the `cloudformation package` command, a new template `GeneratedTemplate.yaml` is created with the S3 location of the Lambda function code.

Note that the `cloudformation package` actually zips the entire content of the current directory and uploads it to the specified S3 bucket. Therefore, ensure that only the necessary files are present in the directory to avoid uploading unnecessary files.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint SimpleTemplate.yaml
```

1. Package the Lambda function

```bash
$ aws cloudformation package --template-file SimpleTemplate.yaml --s3-bucket chucks-workspace-storage --s3-prefix templates --output-template-file GeneratedTemplate.yaml
```

This will zip the content of the current directory and upload it to the specified S3 bucket and generate a new CloudFormation template `GeneratedTemplate.yaml` with the S3 location of to the zipped code.

2.  Deploy a stack using the generated template

```bash
$ aws cloudformation deploy --template-file GeneratedTemplate.yaml --stack-name SimpleStack --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**  
Go to the Lambda Console to take a look at the code and test the function.

**Debug Errors**

**Cleanup**

Delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SimpleStack
```
