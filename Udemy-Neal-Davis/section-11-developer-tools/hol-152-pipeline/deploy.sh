#!/bin/bash
# This script packages the Express.js application and uploads it to an S3 bucket for AWS Elastic Beanstalk deployment.

cd node-app
zip -r ../node-app.zip *
cd ../
aws s3 cp node-app.zip s3://chucks-workspace-storage/beanstalk-artifacts/node-app-24-06.zip