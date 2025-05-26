# Lesson 27: IAM Security Tools - Hands On

### Security Tools

1. IAM Credential Report
2. IAM Last Accessed

**IAM Credential Report**  
You can access the IAM credential reports of all your IAM users from the IAM Console

1. Login to IAM console
2. On the Nav Bar click on _Access report_ > _Credential report_
3. Click the _Download credentials report_ button

Alternatively, you can download the _credentials report_ using AWS CLI

```bash
# First generate the report
$ aws iam generate-credential-report
# After a few seconds, download the report
$ aws iam get-credential-report --query Content --output text | base64 -d > credential-report.csv
```

**IAM Last Accessed**  
You can use _IAM Last Accessed_ to evaluate a user's last accessed history to determine how much permission the user really needs.

1. Login to the IAM Management Console
2. On the Nav Bar click on _Access management_ > _Users_
3. Select the user from the list of users and click on the _Last Accessed_ tab

Alternatively, you can get the Last Accessed for the user using AWS CLI

```bash
# First, find the ARN of the target user
$ aws iam list-users
# Generate the ServiceLastAccessedDetails for the target user using the ARN copied from the previous command.
# Make sure to copy the JobId from the result output
$ aws iam generate-service-last-accessed-details --arn arn:aws:iam::123456789012:user/test-user
# Retrieve ServiceLastAccessedDetails using the JobId from the previous comment
$ aws iam get-service-last-accessed-details --job-id 12345678-1234-1234-1234-1234567890ab
```
