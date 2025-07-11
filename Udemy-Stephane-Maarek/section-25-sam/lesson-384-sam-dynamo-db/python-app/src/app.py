
import boto3
import json
import os

print('Loading function')

# Initialize the DynamoDB client outside the handler as best practice
region = os.environ.get('AWS_REGION', 'eu-west-2')
dynamo = boto3.client('dynamodb', region_name=region)
table_name = os.environ['TABLE_NAME']

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    scan_result = dynamo.scan(TableName=table_name)
    return respond(None, res=scan_result)