#!/bin/bash
# Deploy Lambda code to S3 bucket

zip lambda.zip lambda.js
aws s3 cp lambda.zip s3://chucks-workspace-storage/artifacts/lambda-code-180725.zip