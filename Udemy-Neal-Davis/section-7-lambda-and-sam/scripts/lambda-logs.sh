#!/bin/bash
# Get logs from lambda invokation

function_name=FunctionName
encoded=$(aws lambda invoke --function-name $function_name --log-type Tail output.json --query "LogResult" --no-cli-pager)

# Strip newlines and quotes
clean_base64=$(echo "$encoded" | tr -d '\n"' | tr -d '[:space:]')

decoded=$(echo "$clean_base64" | base64 --decode)

echo $decoded > logs.txt
echo $decoded
