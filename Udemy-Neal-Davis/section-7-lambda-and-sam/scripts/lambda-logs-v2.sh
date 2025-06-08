#!/bin/bash
# Get logs from lambda invokation with payload

# Ensure a function name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <lambda-function-name> [payload-file.json]"
  exit 1
fi

FUNCTION_NAME=$1
PAYLOAD_FILE=${2:-''}

# Build the base AWS CLI command
INVOKE_CMD=(aws lambda invoke --function-name "$FUNCTION_NAME" \
             --log-type Tail \
             output.json \
             --query 'LogResult' \
             --no-cli-pager)

# Add payload if provided
if [ -n "$PAYLOAD_FILE" ]; then
  INVOKE_CMD+=(--payload file://"$PAYLOAD_FILE")
fi

# Invoke the Lambda and capture the LogResult
LOG_BASE64=$("${INVOKE_CMD[@]}")

# Strip newlines and quotes
clean_base64=$(echo "$LOG_BASE64" | tr -d '\n"' | tr -d '[:space:]')

# Decode and print the logs
echo "Decoded Logs:"
echo "$clean_base64" | base64 --decode

