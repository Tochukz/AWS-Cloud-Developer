# Using Environment Variables - HOL-80

### Description

This configuration enables a customer managed KMS key for a Lambda function.  
We then use the KMS key to manually encrypt the `DB_PASS` environment variable of the Lambda function.  
The Lambda function code can then decrypt the `DB_PASS`.

### Operation

**Before deployment**

**Deployment**

Lint the templates

```bash
$ cfn-lint EnvVariables.yaml
```

1. Deploy the stack

```bash
$ aws cloudformation deploy --template-file EnvVariables.yaml --stack-name EnvVariables --capabilities CAPABILITY_NAMED_IAM --parameter-overrides file://private-parameters.json
```

2. Use the key to encrypt your database password

```bash
$  aws kms encrypt --key-id alias/simple-key --plaintext "$(echo -n 'just-de-Goo' | base64)"
```

Copy the `CiphertextBlob` value which represents the encrypted password.

3. Use the encrypted password to update the `EncryptedDbPass` parameter value in `private-parameters.json`

4. Redeploy the configuration using the deploy command in step 1.

**After deployment**

1. To decrypt an encrypted text, first decrypt using the KMS key

```bash
$ aws kms decrypt --key-id alias/simple-key --ciphertext-blob asalsalsa
```

2. Then base64 decode the `Plaintext` from the decrypt result

```bash
$ echo "anVzdC1kZS1Hb28=" | base64 --decode
```

**Testing**

Invoke the lambda function

```bash
$ aws lambda invoke --function-name SimpleFunc --log-type Tail output.json --no-cli-page
```

**Cleanup**

To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name EnvVariables
```
