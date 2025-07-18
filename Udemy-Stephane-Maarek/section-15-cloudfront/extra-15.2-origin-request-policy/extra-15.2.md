# Extra 15.2 - Custom Origin Request Policy

### Description

In this configuration we setup a custom _Origin Request Policy_ for our CloudFront distribution.

We use the Origin Request Policy to specify the query string parameters, cookies and/or request headers that should be forwarded to the origin server.

We use Origin Request Policy for request properties that should ONLY be forwarded to the origin server but should not form a part of the cache key.  
If you want to certain request properties to also form the cache key, in addition to being forwarded to the origin server, then use a _Cache Policy_ instead. See `extra-15.1-caching-policy`.

Note that there are predefined managed origin request policy that may be used if you don't want to configure your own.

### Operation

**Before Deployment**  
The CloudFront distribution is backed by a Lambda function as Origin server.  
Upload the Lambda handler code to S3 bucket

```bash
$ ./deploy-code.sh
```

**Deployment**  
Lint the template

```bash
$ cfn-lint OriginRequestPolicy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file OriginRequestPolicy.yaml  --stack-name OriginRequestPolicy --capabilities CAPABILITY_IAM
```

**After Deployment**
Get the `DistDomain` and `LambdaUrl` from the stack output.

```bash
$ aws cloudformation describe-stacks --stack-name OriginRequestPolicy --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Make a curl request using the `LambdaUrl`

```bash
# Remember to replace  <lambda-url> by the actual Lambda URL
$ curl -b "SessionId=abc123; UserName=james12" -H "Content-Type: application/json" -H "X-API-Token: sjajskjasas" -H "x-api-key: asklakslaks"  -H "Authorization: Bearer ashaksjks" <lambda-url>\?name\=Chucks\&page\=12 > lambda-url-response.json
```

The response object should contain all the query string, headers and cookies specified in the curl request.

2. Make a similar curl request using the `DistDomain`

```bash
# Remember to replace <dist-domain> by the actual Distribution domain name
$ curl -b "SessionId=abc123; UserName=james12" -L -H "Content-Type: application/json" -H "X-API-Token: sjajskjasas" -H "x-api-key: asklakslaks"  -H "Authorization: Bearer ashaksjks" <dist-domain>\?name\=Chucks\&page\=12
```

The response object should only contain the query string, headers and cookies specified in the Origin Request Policy.

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name OriginRequestPolicy
```
