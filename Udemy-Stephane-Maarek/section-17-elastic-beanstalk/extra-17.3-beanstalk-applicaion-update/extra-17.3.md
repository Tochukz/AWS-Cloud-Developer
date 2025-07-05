## How to update application running on Elastic Beanstalk

**Updating application code**

1. Create an updated version of the code and push to S3 with a unique key say `beanstalk-artifacts/express-app-05-07-v2.zip`.
2. Create a new application version

```bash
$ aws elasticbeanstalk create-application-version \
    --application-name NodeApp \
    --version-label NodeApp-v2 \
    --source-bundle "S3Bucket=chucks-workspace-storage,S3Key=beanstalk-artifacts/express-app-05-07-v2.zip"
```

3. Update the Environment with the new application version

```bash
$ aws elasticbeanstalk update-environment --environment-name SimpleNodeEnvironment --application-name NodeApp --version-label NodeApp-v2
```
