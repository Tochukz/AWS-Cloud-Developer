# Extra 15.1 - Custom Caching Policy

### Description

In this configuration we setup a custom _Caching Policy_ for our CloudFront distribution.

The Caching Policy determines what properties of the request are used to form part of the Cache key for resources in the Edge location.  
We can specify which query string parameter, cookies and/or request header should form part of the Cache key.  
All the enabled query string parameter, cookies or request header are automatically forwarded to the origin server.

Sometimes you may want certain request properties to be sent to the origin server without forming part of the cache key. In that case, an _Origin Request Policy_ is your answer. See `extra-15.2-origin-request-policy`.

**Note:** There are predefined managed cache policies that may be used if you don't want to configure your own Cache Policy. See [managed-cache-policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)

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
$ cfn-lint CachingPolicy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CachingPolicy.yaml  --stack-name CachingPolicy --capabilities CAPABILITY_IAM
```

**After Deployment**  
Get the `DistDomain` and `LambdaUrl` from the stack output.

```bash
$ aws cloudformation describe-stacks --stack-name CachingPolicy --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

1. Make a curl request using the `LambdaUrl`

```bash
$ curl -b "session-id=abc123; userId=james12" <lambda-url>\?name\=Chucks\&page\=12
```

The `session-id` and `userId` cookie params should be found in the `cookies` of the response object.  
Also the `name` and `page` query params should be found in the queryStrings of the response object.

2. Make a curl request using the `DistDomain`

```bash
$ curl -b "session-id=abc123; userId=james12" -L <dist-domain>\?name\=Chucks\&page\=12
```

The `userId` cookie params should be absent in the `cookies` of the response object.  
 Also the `name` query params should be absent in the queryStrings of the response object.

3. Compare `lambda-url-response.json` and `cloudfront-response.json` to see the difference.

4. Use the url of the `DistDomain`, `https://d1x4e7nzedf4bt.cloudfront.net?name=peter&page=15` to test on a browser. Keep the browser tab open

5. Go and update the version number in the `message` in the Lambda code in the Lambda Console. Deploy the code changes.

6. Go back to the browser and refresh the page. It should stay unchanges because it has been cahced.

7. Change the value of the `name` in the query string and refresh the page. It should still stay the same because the `name` query parameter is not part of the cache key.

8. Now change the value of the `page`in the query stirng and refresh the page. The page should change now as `page` is part of the cache key.

**Summary:** Only the query string, headers and cookies that are allowed by the custom policy are used as part of the cache key and also forwarded to the origin server.

**Debug Errors**

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CachingPolicy
```
