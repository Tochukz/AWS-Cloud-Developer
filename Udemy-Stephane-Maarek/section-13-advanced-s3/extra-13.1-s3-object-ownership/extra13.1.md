# Extra-13.1: S3 Object Ownership

### Description

If you configure cross account permission to your S3 bucket, objects uploaded by any permitted third party account will be owned by the account that uploaded it.  
The implication os this that you will not have access to the object, even though it is in your bucket, the _object owner_ is the account that uploaded it.  
To solve this problem, we need to configure the S3 bucket so the the _default object owner_ becomes the bucket owner.  
Not that this also _disables ACLs_, so you rely only on IAM policies & bucket policies.

In this example, we configure two bucket, the first with default setting and the order having bucket owner as default object owner.  
We also configure bucket policies for each bucket at allows another AWS account to have full object level access to the bucket.

**Important Note**  
This demo did not go as expected.

- The objects uploaded to `default-bucket-28` by the secondary account were successfully delete by the IAM user of the primary account, event though `OwnershipControls` was not set on the bucket.
- All objects uploaded to `default-bucket-28` by the IAM user of the primary and secondary account all bear the same ownership Id when we list them using `aws s3api list-objects --bucket default-bucket-28`.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint ObjectOwnership.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file ObjectOwnership.yaml  --stack-name ObjectOwnership --parameter-overrides file://private-parameters.json
```

**After Deployment**

**Testing**

1. First we use the external IAM account's profile to upload object to both buckets in the primary account

```bash
$ aws s3 cp users.txt  s3://default-bucket-28/ --profile sovtechchucks
$ aws s3 cp users.txt  s3://ownership-bucket-28/ --profile sovtechchucks
```

2. Next, we try to use the primary account to delete the objects from both buckets

```bash
$ aws s3 rm s3://default-bucket-28/users.txt
$ aws s3 rm s3://ownership-bucket-28/users.txt
```

Both objects uploaded by the secondary account were successfully deleted by the primary account's IAM user

This demo did not go as expected.

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name ObjectOwnership > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
Empty the content of the Buckets

````bash
$ aws s3 rm s3://default-bucket-28/ --recursive
$ aws s3 rm s3://ownership-bucket-28/ --recursive
```
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name ObjectOwnership
````

## Question and Answer

**Question**  
A development team uses shared Amazon S3 buckets to upload files. Due to this shared access, objects in S3 buckets have different owners making it difficult to manage the objects.

As a developer associate, which of the following would you suggest to automatically make the S3 bucket owner, also the owner of all objects in the bucket, irrespective of the AWS account used for uploading the objects?

**Answer**  
Use S3 Object Ownership to default bucket owner to be the owner of all objects in the bucket

### Learn More
