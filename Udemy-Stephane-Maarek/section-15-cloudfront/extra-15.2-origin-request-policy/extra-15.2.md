# Extra 15.2 - Custom Origin Request Policy

### Description

In this configuration we setup a custom _Origin Request Policy_ for our CloudFront distribution.  

We use the Origin Request Policy to specify the query string parameters, cookies and/or request headers that should be forwarded to the origin server.  

We use Origin Request Policy for request properties that should ONLY be forwarded to the origin server but should not form a part of the cache key.  
If you want to certain request properties to also form the cache key, in addition to being forwarded to the origin server, then use a _Cache policy instead_. See `extra-15.1-caching-policy`.  

Note that there are predefined managed origin request policy that may be used if you don't want to configure your own.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint OriginRequestPolicy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file OriginRequestPolicy.yaml  --stack-name OriginRequestPolicy --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  


**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name OriginRequestPolicy
```
