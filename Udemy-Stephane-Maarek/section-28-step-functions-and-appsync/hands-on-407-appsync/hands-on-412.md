# Lesson 412: Error Handling - Hands On

### Description

Create an AppSync GraphQL API that is backed by a DynamoDB table.
The GraphQL API has three resolvers to support `getBook`, `listBooks` and `addBook` operations.

<!-- This configuration is currently not working -->

### Operation

**Before Deployment**

1. Copy the Schema to the S3 bucket

```bash
$ aws s3 cp schema.graphql s3://chucks-workspace-storage/v0.0.1/schema.graphql
```

2. Get the Epoch time for 2 days in the future

```bash
$ node compute-expire.json
```

3. Use the value of the time displayed on the terminal for the `EpochInSeconds` parameter.

**Deployment**  
Lint the template

```bash
$ cfn-lint AppSync.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AppSync.yaml --stack-name AppSync --capabilities CAPABILITY_IAM --parameter-overrides EpochInSeconds=1754515521
```

**After Deployment**

**Testing**

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name AppSync
```
