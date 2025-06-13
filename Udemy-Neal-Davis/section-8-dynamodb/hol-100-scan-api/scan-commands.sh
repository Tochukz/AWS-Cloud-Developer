# Import data
aws dynamodb batch-write-item --request-items file://orders.json

#### SCANS ####

# Perform scan of ProductOrders table:
aws dynamodb scan --table-name Orders

# Use Page-Size Parameter:
aws dynamodb scan --table-name Orders --page-size 1
aws dynamodb scan --table-name Orders --page-size 2

# Use Max-Items Parameter:
aws dynamodb scan --table-name Orders --max-items 1

# Use Projection-Expression Parameter:
aws dynamodb scan --table-name Orders --projection-expression "createdAt"
aws dynamodb scan --table-name Orders --projection-expression "category"
aws dynamodb scan --table-name Orders --projection-expression "colour"

# Use Filter-Expression Parameter:
aws dynamodb scan --table-name Orders --filter-expression "clientId = :username" --expression-attribute-values '{ ":username": { "S": "chris@example.com" }}'
aws dynamodb scan --table-name Orders --filter-expression "size = :n" --expression-attribute-values '{ ":n": { "N": "12" }}'
aws dynamodb scan --table-name Orders --filter-expression "size > :n" --expression-attribute-values '{ ":n": { "N": "12" }}'

