# Extra 21.2: Provisioned Vs Reserved Concurrency in Lambda Function

### Description

In this configuration we have two Lambda functions. The first function have a _reserved concurrency_ of 5 and the second function have an alias which have a _provisioned concurrency_ of 2.  
Reserved concurrency is set on the Lambda function while provisioned concurrency is set on either a published Version or an Alias that points to a published Version.

Provisioned concurrency can only be applied to:

- A published version of a function, or
- An alias pointing to a published version

You cannot apply it directly to `$LATEST`, because `$LATEST` is mutable and provisioned concurrency requires an immutable target.

If you set provisioned concurrency on a version and also on an alias that point to the same version, then the provisioned concurrency settings are summed up and you are billed for the total amount.

Usually, you set it on the alias (e.g., PROD, STAGING) because:

- Aliases are stable logical names.
- You can shift traffic between versions without reconfiguring provisioned concurrency.

See the Learn more section to know more about reserved concurrency versus provisioned concurrency.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint ReservedVsProvisioned.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ReservedVsProvisioned.yaml  --stack-name ReservedVsProvisioned --capabilities CAPABILITY_IAM
```

**After Deployment**

**Testing**

Go to the Lambda Console to inspect both Lambda functions.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ReservedVsProvisioned
```

### Learn More

**Reserved Concurrency**

- A limit you place on a Lambda function to control the maximum number of concurrent executions it can have.
- Prevents a single function from consuming all concurrency in your account.
- Guarantees that your function always has at least that concurrency capacity available.

**Provisioned Concurrency**

- A performance optimization that keeps a set number of Lambda execution environments pre-initialized and ready to handle requests instantly.
- Removes cold starts (slow startup time when Lambda initializes).
- You pay extra for the number of provisioned instances per GB-s even when idle.
- On top of that, you pay for invocations and execution duration.

**Quick memory aid:**

- Reserved Concurrency = Quota control (how much it can run).
- Provisioned Concurrency = Performance control (how fast it starts).
