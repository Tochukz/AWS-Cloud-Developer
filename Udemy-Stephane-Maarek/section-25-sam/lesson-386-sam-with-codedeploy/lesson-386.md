# Lesson 386: SAM with Code Deploy

### Description

This example shows how to use SAM CLI to create an example SAM application.  
We then mondify the SAM template to include CodeDeploy for traffic shifting using the `Canary10Percent10Minutes` deployment strategy.

### Operation

**Before Deployment**

**Deployment**

**Step 1** - Download a sample application

```bash
$ sam init --runtime python3.9
```

You will be prompted to select a template.  
Select the _AWS Quick Start Templates_ option.  
And then the _Hello World Example_ template.

**Step 2** - Build your application

```bash
$ cd sam-app
$ sam build
```

**Step 3** - Package and deploy your application

```bash
$ sam deploy --guided
```

Alternatively you can do package and deploy seperately

```bash
$ sam package --output-template packaged.yaml --s3-bucket <your-s3-bucket>
$ sam deploy --template-file packaged.yaml --stack-name HelloWorldSam --capabilities CAPABILITY_IAM
```

**After Deployment**  
Copy the API Gateway URL from the output of the deployment and use it the browser to test the application.

**Testing**

1. Update the body message in the `hello_world/app.py` file to change the response message.
2. Build the application again

```bash
$ sam build
```

3. Deploy the application again

```bash
$ sam deploy --guided
```

4. Go to Lambda Console, the Lambda Function's page, Alias Tab and see the two version with the new version getting 10% traffic.

5. Go to the CodeDeploy Console and see the deployment in action with traffic shifting - 90% for the present version and 10% for the new version.

6. It will take 10 minutes before 100% of the traffic will be forwarded to the new version - `Canary10Percent10Minutes`

**Debug Errors**

**Cleanup**  
To delete the Application

```bash
$ sam delete
```
