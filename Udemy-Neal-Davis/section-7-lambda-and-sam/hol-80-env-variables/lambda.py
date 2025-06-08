import json
import os
import boto3
from base64 import b64decode

# Code for encrypted variables

def handler(event, context):
    DB_HOST = os.environ["DB_HOST"]
    DB_USER = os.environ["DB_USER"]
    ENCRYPTED_DB_PASS = os.environ["DB_PASS"]
    decrypted_base64_text = boto3.client('kms').decrypt(CiphertextBlob=ENCRYPTED_DB_PASS)['Plaintext']
    plain_text_db_pass=b64decode(decrypted_base64_text)
    print("Connected to %s as %s with %s" % (DB_HOST, DB_USER, ENCRYPTED_DB_PASS))
    print(plain_text_db_pass)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }