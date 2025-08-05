# Lesson 407: Error Handling - Hands On

### Description

### Operation

**Before Deployment**
Copy the state machine definition to the S3 bucket

```bash
$ aws s3 cp state-machine.json s3://chucks-workspace-storage/artifacts/state-machine-0408-1.json
```

**Deployment**  
Lint the template

```bash
$ cfn-lint ErrorHandling.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ErrorHandling.yaml --stack-name ErrorHandling --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**

1. Go to the StepFunction console and the _Start Execution_
2. The Execution should fail and be retried 3 times and eventually cause by the `ErrorEquals: ["CustomError"]` catch block
3. Go to the Lambda function Console, Code, change the `error.name` from `CustomError` to `NotCustomError`
4. Start the Execution again to see the difference in the branching of the State machine.

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name ErrorHandling
```
