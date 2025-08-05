# Lesson 405: Step Function Invoke Lambda - Hands On

### Description

The example creates a simple State Machine that invokes a Lambda function.

### Operation

**Before Deployment**
Copy the state machine definition to the S3 bucket

```bash
$ aws s3 cp state-machine.json s3://chucks-workspace-storage/artifacts/state-machine-0308-1.json
```

**Deployment**  
Lint the template

```bash
$ cfn-lint StepFuncLambda.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file StepFuncLambda.yaml --stack-name StepFuncLambda --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**

1. Go to the StepFunction console and the _Start Execution_
2. To simulate a successful run, enter the following input

```json
{
  "who": "Stephane Maarek"
}
```

3. To simulate a failure run, enter the following input

```json
{
  "who": "Unknown Person"
}
```

**Debug Errors**

**Cleanup**

```bash
$ aws cloudformation delete-stack --stack-name StepFuncLambda
```
