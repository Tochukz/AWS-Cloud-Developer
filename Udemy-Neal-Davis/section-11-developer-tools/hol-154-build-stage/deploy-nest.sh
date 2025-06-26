#!/bin/bash
# This script packages the Nest.js application and deploys it to an existing Elastic Beanstalk Environment.

# Make sure the scripts.start = "node dist/main" is in your package.json file

bucket=chucks-workspace-storage
key=beanstalk-artifacts/nestjs-app-25-06.zip
packageName=nestjs-app.zip
appName=NodeApp
appVersion=v2-nestjs
envName=SimpleNodeEnvironment

cd nest-app 
npm install
npm run build

mkdir eb-package
cp -r dist eb-package/
cp package.json eb-package/
cp package-lock.json eb-package/   # if you use it
# cp -r .ebextensions eb-package/ 

rm $packageName
cd eb-package
npm ci --omit=dev
zip -q -r ../$packageName . -x "*.zip"
cd ../
aws s3 cp $packageName s3://$bucket/$key

aws elasticbeanstalk create-application-version \
  --application-name $appName \
  --version-label $appVersion \
  --source-bundle S3Bucket="$bucket",S3Key="$key" --no-cli-pager

# Wait for the version to be processed
echo "Waiting for application version to be processed..."

while true; do
  STATUS=$(aws elasticbeanstalk describe-application-versions \
    --application-name $appName \
    --version-label $appVersion \
    --query "ApplicationVersions[0].Status")

  echo "Current status: $STATUS"

  if [ $STATUS = '"PROCESSED"' ] || [ "$STATUS" = '"UNPROCESSED"' ];  then
    break
  elif [ $STATUS = '"FAILED"' ]; then
    echo "Application version failed to process. Aborting."
    exit 1
  fi

  sleep 5
done

# Update the application version on the environment
aws elasticbeanstalk update-environment \
  --environment-name $envName \
  --version-label $appVersion --no-cli-pager