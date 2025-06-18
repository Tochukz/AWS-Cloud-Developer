import json
import boto3

dynamo = boto3.client('dynamodb')

def handler(event, context):

    print("Received event: ", json.dumps(event))

    body = event.get('body', {})
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except json.JSONDecodeError:
            body = {}
    else:
        body = event

        
    print("body: ", json.dumps(body))

    operation = body['operation']
    # Ensure TableName is included in payload
    if 'tableName' in body:
        body['payload']['TableName'] = body['tableName']

    try:
        if operation == 'create':
            body['payload']['Item'] = format_item(body['payload']['Item'])
            dynamo.put_item(**body['payload'])
            key = {k: v for k, v in body['payload']['Item'].items() if 'id' in k.lower()}
            response = dynamo.get_item(TableName=body['payload']['TableName'], Key=key)
        elif operation == 'read':
            body['payload']['Key'] = format_item(body['payload']['Key'])
            response = dynamo.get_item(**body['payload'])
        elif operation == 'update':
            body['payload']['Key'] = format_item(body['payload']['Key'])
            body['payload']['AttributeUpdates'] = format_updates(body['payload']['AttributeUpdates'])
            response = dynamo.update_item(**body['payload'])
        elif operation == 'delete':
            body['payload']['Key'] = format_item(body['payload']['Key'])
            response = dynamo.delete_item(**body['payload'])
        elif operation == 'list':
            response = dynamo.scan(**body['payload'])
        elif operation == 'echo':
            response = "Success"
        elif operation == 'ping':
            response = "pong"
        else:
            raise ValueError(f"Unknown operation: {operation}")
        
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }

def format_item(raw_item):

    formatted_item = {}
    for key, value in raw_item.items():
        if isinstance(value, str):
            formatted_item[key] = {"S": value}
        elif isinstance(value, int) or isinstance(value, float):
            formatted_item[key] = {"N": str(value)}
        elif isinstance(value, list):
            formatted_item[key] = {"L": [format_item(item) if isinstance(item, dict) else item for item in value]}
        elif isinstance(value, dict):
            formatted_item[key] = {"M": format_item(value)}
        else:
            raise ValueError(f"Unsupported type for key {key}: {type(value)}")
    return formatted_item

def format_updates(raw_updates):
    
    formatted_updates = {}
    for key, value in raw_updates.items():
        action = value.get("Action", "PUT")  # Default action is PUT
        formatted_value = format_item({key: value["Value"]})[key]
        formatted_updates[key] = {
            "Value": formatted_value,
            "Action": action
        }
    return formatted_updates