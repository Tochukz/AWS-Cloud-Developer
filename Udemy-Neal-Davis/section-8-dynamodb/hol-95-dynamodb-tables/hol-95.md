# Practice Creating DynamoDB Tables - HOL-95

### Description

This configuration creates two DynamoDB table - Posts and Orders.  
The Posts table using a Partition key as it's primary key.  
The Orders table uses a Composite key (i.e Partition key + Sort key) as it's primary key.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint Tables.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file Tables.yaml --stack-name Tables
```

**After deployment**

**Testing**

1. Put an item in the `Posts` table

```bash
$ aws dynamodb put-item --table-name Posts --item file://post1.json
```

2. Put a2 items in the `Orders` table

```bash
$ aws dynamodb put-item --table-name Orders --item file://order1.json
$ aws dynamodb put-item --table-name Orders --item file://order2.json
```

**Cleanup**

To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name Tables
```
