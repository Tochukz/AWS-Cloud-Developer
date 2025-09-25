import json
import boto3
import random
import string
import urllib3

def handler(event, context):
    ssm = boto3.client('ssm')
    request_type = event['RequestType']
    param_name = '/dev/SECRET'
    
    if request_type == 'Create':
        random_value = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        ssm.put_parameter(Name=param_name, Value=random_value, Type='String', Overwrite=True)

    elif request_type == 'Delete':
        try:
            ssm.delete_parameter(Name=param_name)
        except:
            pass  # ignore errors on delete

    response = {
        'Status': 'SUCCESS',
        'PhysicalResourceId': param_name,
        'Data': {
            'Value': random_value if request_type == 'Create' else ''
        }
    }

    
    http = urllib3.PoolManager()
    http.request(
        'PUT',
        event['ResponseURL'],
        body=json.dumps(response),
        headers={'content-type': ''}
    )