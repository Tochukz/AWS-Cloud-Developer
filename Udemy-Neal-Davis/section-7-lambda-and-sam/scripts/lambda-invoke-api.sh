#!/bin/bash
# Invoke a Lambda function behind a REST API (e.g., API Gateway) with a payload that simulates a HTTP request.
# Usage: ./invoke_api_lambda.sh <lambda-name> [payload-file] [output-file]

FUNCTION_NAME=$1
PAYLOAD_FILE=$2
OUPUT_FILE=$3

if [ -z "$FUNCTION_NAME" ]; then
  echo "Usage: $0 <lambda-name>  [payload-file] [output-file]"
  exit 1
fi

# Invoke Lambda with simulated HTTP request payload
aws lambda invoke \
  --function-name "$FUNCTION_NAME" \
  --payload file://$PAYLOAD_FILE \
  --cli-binary-format raw-in-base64-out \
  --log-type Tail \
  $OUPUT_FILE \
  --query 'LogResult' \
  --output text | base64 --decode

# Print the Lambda function's output
echo -e "\n\nLambda Response:"
cat output.json
echo
