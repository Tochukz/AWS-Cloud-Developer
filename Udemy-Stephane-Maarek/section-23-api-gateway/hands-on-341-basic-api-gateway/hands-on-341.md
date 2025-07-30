# Lesson 341: Basic API Gateway - Hands On

### Description

This configuration integrates two Lambda functions to an API Gateway. The Two Lambda function will then becomes accessible over the root path (`/`) and `/houses` of API Gateway endpoint.

### Operation

**Before Deployment**

**Deployment**  
Lint the templates

```bash
$ cfn-lint BasicApiGateway.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file BasicApiGateway.yaml  --stack-name BasicApiGateway --capabilities CAPABILITY_IAM --disable-rollback
```

**After Deployment**  
Get the `ApiEndpoint` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name BasicApiGateway --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**  
Use the `ApiEndpoint` to access the API Gateway on a browser.
Test the route `/` and the `/houses` path on the `ApiEndpoint`
For example:

1. https://9r9v1ramv1.execute-api.eu-west-2.amazonaws.com/dev
2. https://9r9v1ramv1.execute-api.eu-west-2.amazonaws.com/dev/houses

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name BasicApiGateway
```
