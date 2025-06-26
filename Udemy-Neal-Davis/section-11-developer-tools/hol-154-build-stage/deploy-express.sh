#!/bin/bash
# This script packages the Express.js application and uploads it to an S3 bucket for AWS Elastic Beanstalk deployment.

cd express-app
npm install
zip -q -r ../express-app.zip .
cd ../
aws s3 cp express-app.zip s3://chucks-workspace-storage/beanstalk-artifacts/express-app-26-06.zip