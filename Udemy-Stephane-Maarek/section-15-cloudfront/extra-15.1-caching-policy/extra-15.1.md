# Extra 15.1 - Custom Caching Policy

### Description

In this configuration we setup a custom _Caching Policy_ for our CloudFront distribution.  

The Caching Policy determines what properties of the request are used to form part of the Cache key for resources in the Edge location.   
We can specify which query string parameter, cookies and/or request header should form part of the Cache key.  
All the enable query string parameter, cookies or request header are automatically forwarded to the origin service.   

Sometimes you may want certain request properties to be sent to the origin server without forming part of the cache key. In that case, an _Origin Request Policy_ is your answer. See `extra-15.2-origin-request-policy`.

Note that there are predefined managed cache policy that may be used if you don't want to configure your own.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint CachingPolicy.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CachingPolicy.yaml  --stack-name CachingPolicy --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**  


**Testing**

**Debug Errors**

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name CachingPolicy
```
