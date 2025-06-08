# Using Versions and Aliases - HOL78

### Description

This configuration shows how to work with a Lambda Version and Alias.  
Here we deploy a Lambda function, published 2 versions of the Lambda function and create an Alias directing 50% of the invocation to each version.

The `LambdaVersion.yaml` template deploys the Lambda function and the first version.  
We then use AWS CLI to publish the second version.  
The `LambdaAlias.yaml` template is used to deploy the `Alias` that point to the first and second version sending 50% of the invocation to each version.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint LambdaVersion.yaml
$ cfn-lint LambdaAlias.yaml
```

1. Set the `LambdaMessage` value in `parameter.json` to `Version 1 code` and deploy the `LambdaVersion` stack

```bash
$ aws cloudformation deploy --template-file LambdaVersion.yaml --stack-name LambdaVersion --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://parameters.json
```

2. Update the `LambdaMessage` value in the `parameter.json` to `Version 2 code` and update the `LambdaVersion` stack using the deploy command in step 1.

3. Create a second function version using AWS CLI

```bash
$ aws lambda publish-version --function-name SimpleFunc --description "The second version of the function"
```

4. List the versions of the function

```bash
$ aws lambda list-versions-by-function --function-name SimpleFunc --query "Versions[*].FunctionArn" --no-cli-pager
```

5. Update the Version1 and Version2 value with the second and third version from the list i.e 1 and 2 or 2 and 3.

6. Deploy the `LambdaAlias` stack

```bash
$ aws cloudformation deploy --template-file LambdaAlias.yaml --stack-name LambdaAlias --parameter-overrides file://parameters.json
```

7. Update the `LambdaMessage` value in the `parameter.json` to `Latest version code` and update the `LambdaVersion` stack again.

**After deployment**

Now the versions `1`, `2` and `$Latest` should have different code.  
You can confirm this by going to the Lambda Console:

- Select the Lambda function > Code tab
- Copy the function code or take a good look at it
- Now click on Version tab > click on `1` under the versions list
- Click on Code tab for `Version 1`.
- You should see a different code here. Specificly the message is different.

**Testing**

1. List all the Function's versions

```bash
$ aws lambda list-versions-by-function --function-name SimpleFunc --query "Versions[*].FunctionArn" --no-cli-pager
```

2. Invoke the version 1

```bash
$ aws lambda invoke --function-name SimpleFunc:1 version1-response.json
```

3. Invoke the version 2

```bash
$ aws lambda invoke --function-name SimpleFunc:2 version2-response.json
```

4. Invoke the latest version

```bash
$ aws lambda invoke --function-name SimpleFunc:\$LATEST latest-response.json
```

5. Invoke the alias

```bash
$ aws lambda invoke --function-name SimpleFunc:simple-alias alias-response.json
```

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name LambdaAlias
$ aws cloudformation delete-stack --stack-name LambdaVersion
```
