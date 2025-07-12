const cdk = require("aws-cdk-lib");

const s3 = require("aws-cdk-lib/aws-s3");
const iam = require("aws-cdk-lib/aws-iam");
const lambda = require("aws-cdk-lib/aws-lambda");
const lambdaEventSource = require("aws-cdk-lib/aws-lambda-event-sources");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");

const bucketId = "cdk-rekn-imagebucket";
const bucketName = "images-bucket-12-07"; // Ensure the bucket name is unique across all AWS accounts

class CdkAppStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, bucketId, {
      bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    new cdk.CfnOutput(this, "Bucket", { value: bucket.bucketName });

    const role = new iam.Role(this, "cdk-rekn-lambdarole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "rekognition:*",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resources: ["*"],
      })
    );

    const table = new dynamodb.Table(this, "cdk-rekn-imagetable", {
      tableName: "ImageLabelsTable",
      partitionKey: { name: "Image", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    new cdk.CfnOutput(this, "Table", { value: table.tableName });

    const lambdaFn = new lambda.Function(this, "cdk-rekn-function", {
      functionName: "ImageRekognitionFunc",
      code: lambda.AssetCode.fromAsset("lambda"),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "index.handler",
      role: role,
      environment: {
        TABLE: table.tableName,
        BUCKET: bucket.bucketName,
      },
    });
    lambdaFn.addEventSource(
      new lambdaEventSource.S3EventSource(bucket, {
        events: [s3.EventType.OBJECT_CREATED],
      })
    );

    bucket.grantReadWrite(lambdaFn);
    table.grantFullAccess(lambdaFn);
  }
}

module.exports = { CdkAppStack };
