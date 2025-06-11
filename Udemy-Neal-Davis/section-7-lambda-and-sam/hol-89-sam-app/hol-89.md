# Run SAM App - HOL-89

### Description

This example uses the Serverless Application Model (SAM) CLI tool to generate a SAM application.  
The SAM application consists of Sample Application Code for Lamba function and SAM template.

### Operation

**Before deployment**

1. Generate a new SAM Application

```bash
$ sam init --runtime python3.9 --dependency-manager pip --app-template hello-world --name sam-app
```

This will generate Sample Python Application and a SAM template to deploy Lambda function and API Gateway resource inside the `sam-app` folder represented by the `--name` flag.

2. Build and deploy the application

```bash
$ cd sam-app
$ sam build
$ sam deploy --guided
```

3. Get the stack outputs

```bash
$ sam list stack-outputs
```

Or use `cloudformation` for convinience

```bash
$  aws cloudformation describe-stacks --stack-name sam-app --query "Stacks[0].Outputs" --no-cli-pager
```

**Deployment**

**After deployment**

**Testing**  
Use the `HelloWorldApi` from the stack output to browse the application with a browser.

**Cleanup**

To delete the Application

```bash
$ cd sam-app
$ sam delete
```
