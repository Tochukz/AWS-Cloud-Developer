# Lesson 255: X-Ray Sampling rule

### Description

X-Ray sampling rules determineS the amount of data that is sent to X-Ray from our instrumented application.

**Working with X-Ray Sampling rule (CloudWatch Console)**

1. Go to CloudWatch Console > Settings
2. Click on the _X-Ray Traces_ tab
3. Under _Sampling rules_, click the _View Settings_ link
4. You should see a default sampling rule
5. You can click on the _Create sampling rule_ button to create your own.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint SamplingRule.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file SamplingRule.yaml  --stack-name SamplingRule --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

**Testing**

Go the the CloudWatch Console > Settings > X-Ray Traces tab > View settings under Sampling rules.  
You should see the new sampling rule we just created.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name SamplingRule
```
