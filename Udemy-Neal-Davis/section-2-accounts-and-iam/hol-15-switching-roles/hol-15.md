# Switching IAM Roles - HOL-15

### Description

This configuration is used to demonstrate how an IAM user can switch role.  
We configures a Role and then grant existing IAM Users permission to Assume the role.

For the IAM User, using the Console, the user need to have `iam:ListRoles` and `iam:GetRole`.  
For the IAM user using AWS CLI, no previous permission are required.

### Operation

**Deployment**  
Lint the template

```bash
$ cfn-lint SwitchingRole.yaml
```

Deploy a stack using the template

```bash
$ aws cloudformation deploy --template-file SwitchingRole.yaml --stack-name SwitchingRole --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://secret-parameters.json
```

**After deployment**  
Get the role `RoleArn` from the stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name SwitchingRole --query "Stacks[0].Outputs" --no-cli-pager
```

**Testing**

A) Switching role using AWS IAM Console

The user should already have `iam:ListRoles` and `iam:GetRole` permission.

1. Login to the IAM Console using the user that wants to assume the role
2. Go to Roles, enter the role name `DemoEc2Role` to seach for the role
3. Select the Role, you will find _Link to switch roles in console_ under the Summary section.
4. Copy the link and open in another browser tab/window.
5. Fillout the form and click on the _Switch Role_ button
6. Now navigate the the EC2 Console to confirm that you can access all the EC2 operation that the Role permits.

B) Switch role using AWS CLI (using temporary token)

No previous permission is required

1. Execute the `sts assume-role` command to generate security credentials

```bash
$ aws sts assume-role --role-arn arn:aws:iam::123456789:role/DemoEc2Role --role-session-name Session31May --duration-seconds 3600 --profile john
```

The `duration-seconds` is optional.

Copy the generated security credentials

2. Export the `AccessKeyId`, `SecretAccessKey` and `SessionToken` on a new terminal window

```bash
$ export AWS_ACCESS_KEY_ID=xxxxxxxxxxxxx
$ export AWS_SECRET_ACCESS_KEY=xxxxxxxxx
$ export AWS_SESSION_TOKEN=xxxxxxxxxxxxx
```

3. Confirm that the Role is being used in the terminal

```bash
$ aws sts get-caller-identity
```

You should see the Role's ARN in the result

4. Confirm that you can access the EC2 API operation granted by the Role's attached policy.

```bash
$ aws ec2 describe-instances
```

C) Switch role using AWS CLI (using permanent profile)

To avoid having to always generate temporary security credential when you want to switch role, you can create a profile instead

1. Create a profile that references the user that wants to assume the role. In you `~/.aws/config` file add the following

```
[profile demo-ec2-role] # john profile can assume DemoEc2Role role
role_arn = arn:aws:iam::123456789:role/DemoEc2Role
region = eu-west-2
source_profile = john
```

This means that the profile `john` can assume the `DemoEc2Role` role.

2. Test the newly created profile

```bash
$ aws sts get-caller-identity --profile demo-ec2-role
```

3.  Confirm that you can access the EC2 API operations granted by the Role's attached policy.

```bash
$ aws ec2 describe-instances --profile demo-ec2-role
```

**Debug Errors**  
In the case of error during deployment

```bash
$ aws cloudformation describe-stack-events --stack-name SwitchingRole > events.json
```

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name SwitchingRole
```
