#!/bin/bash
# Deploy code to S3 bucket 

zip lambda.zip lambda.py
aws s3 cp lambda.zip s3://chucks-workspace-storage/artifacts/custom-3007.zip