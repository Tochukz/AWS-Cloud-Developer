#!/bin/bash
# Copy ExpressJS application to S3 bucket

cd express-app
npm install
zip -r ../express-app.zip *
cd ../

versionCode=express-app-04-07-v2.zip
aws s3 cp express-app.zip s3://chucks-workspace-storage/beanstalk-artifacts/$versionCode