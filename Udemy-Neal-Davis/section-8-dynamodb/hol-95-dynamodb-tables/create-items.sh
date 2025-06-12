item1='{"PostId": 1000212, "Subject": "Hello"; "Replies": 12}'
aws dynamodb put-item --table-name Posts --item "$item1"