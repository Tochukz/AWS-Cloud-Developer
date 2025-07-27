#!/bin/bash 
# Deploy code the S3 bucket

zip lambda-code.zip lambda.js

aws s3 cp lambda-code.zip s3://chucks-workspace-storage/artifacts/lambda-code-27-07.zip