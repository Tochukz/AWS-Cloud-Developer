# Lesson 375: Code Artifact Hands On

### Description

This confguration creates a CodeArtifact repository with a `npm` external connection.

### Operation

**Before Deployment**

**Deployment**  
Lint the template

```bash
$ cfn-lint CodeArtifact.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file CodeArtifact.yaml  --stack-name CodeArtifact
```

**After Deployment**

**Testing**

1. Go to the CodeArtifact console, select the _DemoRepository_ and click on the _View connection instructions_ button.
2. Select OS, choice `npm` for package manager client and then select, Configure using AWS CLI
3. You should get the followoing configuration commmand

```bash
$ aws codeartifact login --tool npm --repository DemoRepository --domain chucks-company --domain-owner <account-id> --region eu-west-2
```

This will get you authorization to access the CodeArtifact repository.  
4. Run npm install for any npm package

```bash
$ npm install axios
```

5. Go back to CodeArtifact console, select your respository and select the _Packages_ tab. You should see the `axios` package listed there.

**Debug Errors**

**Cleanup**  
To delete the stack

```bash
$ aws cloudformation delete-stack --stack-name CodeArtifact
```
