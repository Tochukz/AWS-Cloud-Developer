### DynamoDB
__DynamoDB - Basics__   
* Maximum size of an item is 400KB

__DynamoDB – Write Capacity Units (WCU)__  
* One Write Capacity Unit (WCU) represents one write per second for an
item up to 1 KB in size
* If the items are larger than 1 KB, more WCUs are consumed
* See page 620 for examples

__DynamoDB – Read Capacity Units (RCU)__  
* One Read Capacity Unit (RCU) represents one Strongly Consistent Read per second, or two Eventually Consistent Reads per second, for an item up to 4 KB in size
* If the items are larger than 4 KB, more RCUs are consumed
* See page 622 for examples
