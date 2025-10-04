# Extra 22.1: DynamoDB Table Cross Account Access
### Description

__Question__  
The development team at a retail organization wants to allow a Lambda function in its AWS Account A to access a DynamoDB table in another AWS Account B.

As a Developer Associate, which of the following solutions would you recommend for the given use-case?

__Answer__  

### Operation
Attach resource policy to existing DynamoDB table
```bash
$ aws dynamodb put-resource-policy \
  --resource-arn arn:aws:dynamodb:us-east-1:123456789012:table/MyAppTable \
  --policy file://table-policy.json
```


**Testing**


**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name ReservedVsProvisioned
```

### Learn More
