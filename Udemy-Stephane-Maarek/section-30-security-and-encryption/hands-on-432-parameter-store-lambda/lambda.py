import json
import boto3
import os

ENV = os.environ['ENV']
AWS_REGION = os.environ['AWS_REGION']
ssm = boto3.client('ssm', region_name=AWS_REGION)


def handler(event, context):
    db_url = ssm.get_parameters(Names=["/myapp/" + ENV + "/db-url"])
    print(db_url)   
    db_password = ssm.get_parameters(Names=["/myapp/" + ENV + "/db-password"], WithDecryption=True)
    print(db_password)
    return "worked!"