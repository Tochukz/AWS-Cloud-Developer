# Extra-8.1: RDS with IAM Authentication

### Description

This configuration enabled IAM authentication on an RDS database instance.  
This means that any compute that desired to connect to the RDS instance may have the proper IAM permission to be able to do so.

Note that IAM Authentication is only supported on MySQL and PostgreSQL RDS instances.  
It is also support for Aurora MySQL and Aurora PostgreSQL.

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint RdsIamAuth.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file RdsIamAuth.yaml  --stack-name RdsIamAuth --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**

1. Get the `RdsInstanceEndpoint` and `Ec2PublicIP` from the Stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name RdsIamAuth --query "Stacks[0].Outputs" --no-cli-pager
```

2. Update the database credential in the `scripts/.env` file

3. Zip and copy the `scripts` directory to the EC2 instane

```bash
# Make sure to update the .env file
$ zip -r -q scripts.zip scripts/.
$ scp -i dev-simple-key.pem scripts.zip ec2-user@35.176.122.22:~/

```

**Testing**

1. SSH into the EC2 instance and unzip the script

```bash
$ ssh -i dev-simple-key.pem ec2-user@35.176.122.224

# Now inside the archive
$ unzip scripts.zip
$ cd scripts
$ npm install
```

2. Make sure node is install and run the node scripts

```bash
$ cd ~/scripts
$ node connect.js
$ node show-dbs.js
# Creating table
$ node run-operation.js create-table
# Inserting record
$ node run-operation.js insert-record "James Young"
# Reading table
$ node run-operation.js read-all
```

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name RdsIamAuth > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name RdsIamAuth
```
