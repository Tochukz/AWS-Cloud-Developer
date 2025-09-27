# Extra 30.1 KMS Envelop Encryption

### Description

Envelope encryption uses a data key (fast symmetric key) to encrypt your data locally,
and uses an AWS KMS _Customer Master Key (CMK)_ to encrypt (wrap) that data key.  
You store the encrypted data key alongside the ciphertext.
To read, you ask KMS to decrypt the encrypted data key, then use the returned plaintext data key to decrypt the data.

Why do this?

- Symmetric crypto (AES) is fast for large payloads.
- KMS protects the small secret (data key) and centralizes key policy / auditing.
- Limits number of requests to KMS (you only call KMS to generate/decrypt the data key, not to encrypt every object).

See the ""Learn more" section.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint KmsKey.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file KmsKey.yaml --stack-name KmsKey
```

**After Deployment**  
Get stack outputs

```bash
$ aws cloudformation describe-stacks --stack-name KmsKey --query "Stacks[0].Outputs" --no-cli-pager
```

Use the `KeyId` output to update tne `KMS_KEY_ID` environment variable in the `.env` file.

**Testing**

1. Encrypt a data file

```bash
$ node main.js encrypt data-file.txt
```

This will return the filename where the envelop is stored e.g `envelop-99442b50fa40.json`.  
The envelop is a JSON object.

2. Decrypt the envelop file

```bash
$ node main.js decrypt envelop-99442b50fa40.json
```

This will return the filename where the decrypted data file is stored e.g `output-8a28e81ef54b.txt` .  
The content of the decrypted data file will look identical to the original `data-file.txt`

**Debug Errors**

**Cleanup**  
Delete the stack

```bash
$ aws cloudformation delete-stack --stack-name KmsKey
```

## Learn More

#### KMS Encryption

While AWS KMS does support sending data up to 4 KB to be encrypted directly, envelope encryption can offer significant performance benefits.  
When you encrypt data directly with AWS KMS it must be transferred over the network. Envelope encryption reduces the network load since only the request and delivery of the much smaller data key go over the network.  
The data key is used locally in your application or encrypting AWS service, avoiding the need to send the entire block of data to AWS KMS and suffer network latency.

The direct 'Encrypt' API of KMS has an upper limit of 4 KB for the data payload. To encrypt 1 MB or more, you need to use the Encryption SDK and save the encrypted file.

#### High-level flow

**Encryption**

1. Call GenerateDataKey on KMS with KeyId and KeySpec=AES_256.
2. KMS returns:

   - Plaintext — the raw data key (never store this long-term).
   - CiphertextBlob — the data key encrypted under the CMK.

3. Use Plaintext as your AES-256-GCM key to encrypt your payload locally (generate random IV).

4. Store:
   - The ciphertext (and GCM auth tag),
   - The CiphertextBlob (encrypted data key),
   - The IV (nonce) and any metadata you need.

**Decryption**

1. Retrieve CiphertextBlob, IV, and ciphertext from storage.
2. Call KMS Decrypt with the CiphertextBlob — KMS returns the Plaintext data key.
3. Use returned plaintext to decrypt the ciphertext locally.
4. Zero-out plaintext key memory after use.

**Important security notes and best practices**

- Never persist the plaintext data key. Only persist the CiphertextBlob returned by KMS.
- Zero memory that held plaintext keys as soon as possible (shown above).
- Use AES-GCM (authenticated encryption) and store auth tag. Consider AAD (e.g., object id, region) to bind metadata.
- Use KMS key policies / IAM so only services that need to decrypt can call KMS:Decrypt.
- Use EncryptionContext with KMS if you need extra binding on KMS decrypt (and provide the same context on decrypt).
- Rotate CMKs periodically. Data keys can remain valid; when rotating CMKs you still can decrypt previously encrypted data via KMS (if policy allows). Consider re-encrypting data if needed.
- Prefer the AWS Encryption SDK for more heavyweight needs — it implements envelope encryption best practices for you (multi-master keys, keyrings, framing, etc.).
- Audit KMS usage in CloudTrail (Decrypt/GenerateDataKey calls are logged).
- Limit KMS calls if doing many small encrypts — using data keys reduces calls (only generate or decrypt per object, not per block); design caching judiciously (but be careful with long-lived plaintext keys).
