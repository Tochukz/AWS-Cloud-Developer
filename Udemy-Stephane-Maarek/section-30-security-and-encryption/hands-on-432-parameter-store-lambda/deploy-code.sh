#!/bin/bash 
# Package code and copy to S3 bucket

zip lambda.zip lambda.py 
aws s3 cp lambda.zip s3://chucks-workspace-storage/artifacts/0.0.1/lambda-0808.zip