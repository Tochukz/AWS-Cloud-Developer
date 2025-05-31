# Section 2: AWS Accounts and IAM
## AWS Security Token Service (STS)
__Introduction__  
* STS is use to generate temporary security credential
* Credentials includes, `AccessKeyId`, `Expiration`, `SecretAccesskey` and `SessionToken`.  
* Temporary credentials are used with
  - Identity federation
  - Delegation
  - Cross-account
  - IAM roles
* You can generate temporary security credential using any of the following STS API operations
  - AssumeRole
  - AssumeRoleWithSAML
  - AssumeRoleWithWebIdentity
  - GetFederationToken
  - GetSessionToken
* Only `AssumeRole` and `GetSessionToken` API operations support MFA

__Create temporary security credential__  
```bash
$ aws sts get-session-token --duration-seconds 900 --token-code 123456
```
The `token-code` parameter is optional and may be used when you want to generate security credential to be used for API operations that required MFA authentication.   

## Access Control Methods - RBAC and ABAC
__Role Bases Access Control (RBAC)__  
* IAM Groups are created to hold IAM Users with specific job roles.
* Permission policies are then applied to the IAM Groups.  

__Attribute Based Access Control (ABAC)__   
* We use attributes such as Tags to define access to AWS resources
* Principal Tags are attached to IAM users
* Resources Tags are attached to AWS resources
* IAM policies are created that allows certain actions if the principal matches PrincipalTag and the resource in question matches the resource tag.  

[Sample policy document using ABAC](tag-iam-policy.json)

```json
{
  "Sid": "AllowUsersWithDBAdminEqualDepartment",
  "Effect": "Allows",
  "Actions": [
    "rds:RebootDBInstance",
    "rds:StartDBInstance",
    "rds:StopDBInstance"
  ],
  "Resources": "*",
  "Condition": {
    "StringEquals": {
      "aws:PrincipalTag/Department": "DBAdmin",
      "rds:db-tag/Environment": "Production"
    }
  }
}
```
