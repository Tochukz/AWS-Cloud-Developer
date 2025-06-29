### MFA with CLI

- To use MFA with the CLI, you must create a temporary seccion
- To do so, you must run the STS `GetSessionToken` API call

```bash
$ aws sts get-session-token --serial-number <mfa-device-arn> --token <mfa-code> --duration-seconds 3600
```

- You can get the MFA Device ARN by going to the IAM User console and selecting the _Security Credential_ tab.
- The `-serial-number` and `--token` are optional and should be used when the IAM Identity Policy or Resource Policy requires it to access a specific resource.
