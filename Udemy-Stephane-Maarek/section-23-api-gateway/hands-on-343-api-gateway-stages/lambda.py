import json

def handler(event, context):
    print(event)

    body = "Hello from Lambda version 3"
    statusCode = 200
    return {
        "statusCode": statusCode,
        "body": json.dumps(body),
        "headers": {
            "Content-Type": "application/json"
        }
    }