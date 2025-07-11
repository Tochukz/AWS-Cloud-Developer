#!/bin/bash

cd python-app

# Transform SAM template to CloudFormation template
aws cloudformation package \
    --template-file template.yaml \
    --output-template-file gen/cfn-template.yaml \
    --s3-bucket chucks-workspace-storage
# This will generate a CloudFormation template in the 'gen' directory

# Deploy the CloudFormation stack
aws cloudformation deploy --template-file gen/cfn-template.yaml --stack-name HelloWorldSam --capabilities CAPABILITY_IAM