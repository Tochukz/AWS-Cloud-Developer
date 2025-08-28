# Extra-4.3: Decode Authorization Message

### Description

When you make an AWS request that is denied, the response includes an encoded message that contains details about the error. You can use the `DecodeAuthorizationMessage` API to decode this message and gain more insight to why your request was denied.  
To be able to decode an authorization message, you need to have the `sts:DecodeAuthorizationMessage` permission.

### Steps

1. Make a request that is denied and obtain the encoded authorization message from the error response.

```
$ aws ec2 run-instances --instance-type t2.micro --image-id ami-04ba8620fc44e2264 --profile peter
```

2. Copy the encoded message from the error response starting after _Encoded authorization failure message:_

3. Use the AWS CLI to decode an encoded authorization message.

```bash
$ export message="PASTE_YOUR_ENCODED_MESSAGE_HERE"
$ aws sts decode-authorization-message --encoded-message $message > decoded-message.json
```
