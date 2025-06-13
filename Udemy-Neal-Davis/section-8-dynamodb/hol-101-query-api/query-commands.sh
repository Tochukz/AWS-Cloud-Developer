# Import data if you have not already done so.
aws dynamodb batch-write-item --request-items file://orders.json

#### QUERIES ####

# Use Key-Conditions Parameter:
aws dynamodb query  --table-name Orders --key-conditions '{ "clientId":{ "ComparisonOperator":"EQ", "AttributeValueList": [ {"S": "chris@example.com"} ] } }'

# Use Key-Condition-Expression Parameter:
aws dynamodb query --table-name Orders --key-condition-expression "clientId = :name" --expression-attribute-values '{":name":{"S":"chris@example.com"}}'