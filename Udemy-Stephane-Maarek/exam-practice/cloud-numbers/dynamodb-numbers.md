### DynamoDB
__DynamoDB - Basics__   
* Maximum size of an item is _400KB_

__DynamoDB – Write Capacity Units (WCU)__  
* One Write Capacity Unit (WCU) represents one write per second for an
item up to 1 KB in size
* If the items are larger than 1 KB, more WCUs are consumed
* Transactional write requests require two WCUs to perform one write per second for items up to 1 KB.
* For example, a standard write request of a 1 KB item would require one WCU, a standard write request of a 3 KB item would require three WCUs, and a transactional write request of a 3 KB item would require six WCUs.
* See page 620 for examples

__DynamoDB – Read Capacity Units (RCU)__  
* One Read Capacity Unit (RCU) represents one Strongly Consistent Read per second, or two Eventually Consistent Reads per second, for an item up to 4 KB in size
* Transactional read requests require two RCUs to perform one read per second for items up to 4 KB.
* If the items are larger than 4 KB, more RCUs are consumed
* For example, a strongly consistent read of an 8 KB item would require _two RCUs_, an eventually consistent read of an 8 KB item would require _one RCU_, and a transactional read of an 8 KB item would require _four RCUs_.
* See page 622 for examples
