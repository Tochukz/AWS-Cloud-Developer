# Section 19: AWS Integration and Messaging
## Amazon SQS
__SQS – Message Visibility Timeout__  
* If a message is not processed within the visibility timeout, it will be processed twice
* A consumer could call the `ChangeMessageVisibility` API to get more time

__Amazon SQS - Long Polling__  
* When a consumer requests messages from the queue, it can optionally “wait” for messages to arrive if there are none in the queue
* This is called Long Polling
* _LongPolling decreases the number of API calls made to SQS while increasing the efficiency and decreasing the latency of your application._
* The wait time can be between 1 sec to 20 sec
(20 sec preferable)
* Long Polling is preferable to Short Polling
* Long polling can be enabled at the queue level or at the API level using `ReceiveMessageWaitTimeSeconds`

__SQS – Must know API__
* `CreateQueue` (`MessageRetentionPeriod`), `DeleteQueue`
* `PurgeQueue`: delete all the messages in queue
* `SendMessage` (DelaySeconds), `ReceiveMessage`, `DeleteMessage`
* `MaxNumberOfMessages`: default 1, max 10 (for `ReceiveMessage` API)
* `ReceiveMessageWaitTimeSeconds`: Long Polling
* `ChangeMessageVisibility`: change the message timeout
* Batch APIs: `SendMessageBatch`, `DeleteMessageBatch`, `ChangeMessageVisibilityBatch` helps decrease your costs

__Amazon SQS – FIFO Queue__
* FIFO = First In First Out (ordering of messages in the queue)
* Limited throughput: _300 msg/s without batching, 3000 msg/s with_
* Exactly-once send capability (by removing duplicates using Deduplication ID)
* Messages are processed in order by the consumer
* Ordering by Message Group ID (all messages in the same group are ordered) – mandatory parameter

__SQS FIFO – Deduplication__  
* De-duplication interval is 5 minutes
* Two de-duplication methods:
  - Content-based deduplication: will do a SHA-256 hash of the message body
  - Explicitly provide a Message Deduplication ID

__SQS FIFO – Message Grouping__  
* If you specify the same value of `MessageGroupID` in an SQS FIFO queue, you can only have one consumer, and all the messages are in order
* To get ordering at the level of a subset of messages, specify different values for `MessageGroupID`
  - Messages that share a common Message Group ID will be in order within the group
  - Each Group ID can have a different consumer (parallel processing!)
  - Ordering across groups is not guaranteed

## Amazon SNS
Take not that Fifo Topic only support SQS Queue as subscriber.   
Standard Topic on the other hand support Email, SQS Queue, HTTP/HTTPS, SMS and Kinesis Firehose as subscribers.  

__Application: S3 Events to multiple queues__  
* For the same combination of: _event type_ (e.g. object create) and _prefix_ (e.g. images/) you can only have one S3 Event rule
* If you want to send the same S3 event to many SQS queues, use fan-out

__Amazon SNS – FIFO Topic__  
* FIFO = First In First Out (ordering of messages in the topic)
* Similar features as SQS FIFO:
  - __Ordering__ by Message Group ID (all messages in the same group are ordered)
  - __Deduplication__ using a Deduplication ID or Content Based Deduplication
* _Can have SQS Standard and FIFO queues as subscribers_
* Limited throughput (same throughput as SQS FIFO)

## Amazon Kinesis Data Streams
__Kinesis Data Streams__  
* Retention between up to 365 days
* Ability to reprocess (replay) data by consumers
* Data can’t be deleted from Kinesis (until it expires)
* Data up to 1MB (typical use case is lot of “small” real-time data)
* Data ordering guarantee for data with the same “Partition ID”
* At-rest KMS encryption, in-flight HTTPS encryption
* Kinesis Producer Library (KPL) to write an optimized producer application
* Kinesis Client Library (KCL) to write an optimized consumer application

__Kinesis Data Streams – Capacity Modes__  
* __Provisioned mode:__  
  - Choose number of shards
  - Each shard gets 1MB/s in (or 1000 records per second)
  - Each shard gets 2MB/s out
  - Scale manually to increase or decrease the number of shards
  - You pay per shard provisioned per hour
* __On-demand mode:__   
  - No need to provision or manage the capacity
  - Default capacity provisioned (4 MB/s in or 4000 records per second)
  - Scales automatically based on observed throughput peak during the last 30 days
  - Pay per stream per hour & data in/out per GB
