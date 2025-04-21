## Chapter 1: Introduction to AWS Cloud API

**AWS SDK**  
The Python SDK for AWS is called AWS SDK for Python (Boto) [AWS SDK for Python](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)

To install _boto3_ using pip

```bash
$ pip install boto3 --upgrade –user
# See where the package was installed into
$ pip show boto3
```

For other SDKs go to [Tools to Build on AWS](https://aws.amazon.com/developer/tools/#sdk)

**Regional API**  
Upload a Lexicon file to Amazon Poly

```bash
$ aws polly put-lexicon --name AwsLexicon --content file://lexicon/aws-lexicon.xml
--region us-west-2
```

Synthesizing speech with custom the uploaded lexicon

```bash
$ aws polly synthesize-speech --text 'I work at AWS Cape Town!' --voice-id Joanna --output-format mp3 hello-dev.mp3 --lexicon-names="AwsLexicon" --region us-west-2
```

**Regional Endpoint**  
protocol://service-code.region-code.amazonaws.com

**Other Credentials for IAM Users**  
You can have _X.509 certificates_, which are used with SOAP APIs, or you can have _GIT credentials_ as either Secure Shell (SSH) keys or passwords to interact with the AWS CodeCommit service.

**Roles**  
To control access to an IAM role, define a _trust policy_ that specifies which principals can assume a role.  
Potential principals include AWS services and also users who have authenticated using _identity federation_.  
Principals could also include users who authenticate with _web identity federation_,
IAM users, IAM groups, or IAM roles from other accounts.

When a principal assumes a role, AWS provides new short-term security credentials that
are valid for a time-limited session through the _AWS Security Token Service (AWS STS)_.
These credentials are composed of an access key ID, secret access key, and, additionally, a
session token with a known expiration date.

**Custom Policies**  
Write custom policies manually or use tools like the _Visual Policy Editor_ in the AWS Management Console to generate policies more easily.  
To help you test the effects of policies, you can also use the _IAM policy simulator_ at https://policysim.aws.amazon.com.

#### Exercises
**Exercise 1.3**  
To view the available voices for Amazon Polly.
```bash
$ aws polly describe-voices --language en-US --output table
```

**Exercise 1.6**  
To display your current region
```bash
$ aws configure get region
```

**Exercise 1.7**  
To setup a new profile in AWS CLI
```bash
$ aws configure --profile restricted
```

**Review Questions**   
Questions - Page[85]  
Answer    - Page[938]
