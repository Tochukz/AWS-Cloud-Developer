### Amazon SQS – Standard Queue
* Attributes:
  - Unlimited throughput, unlimited number of messages in queue
  - Default retention of messages: _4 days, maximum of 14 days_
  - Low latency (<10 ms on publish and receive)
  - Limitation of _256KB per message sent_

### SQS – Message Visibility Timeout
* By default, the “message visibility timeout” is _30 seconds_

### Amazon SQS – Delay Queue
* Delay a message (consumers don’t see it immediately) up to _15 minutes_

### Amazon SQS - Long Polling
* The wait time can be between 1 sec to 20 sec
(20 sec preferable)

### SQS Limits
* Maximum size of SQS Message is 256KB
* Maximum count of messages - Unlimited

__Standard Queue__   
* ~3000 messages/sec per API action (send, receive, delete)
* with batching (10 per batch → effectively 30,000+ msg/sec possible)
* Practically unlimited message rate — AWS automatically scales.

__Fifo Queue__  
* 300 messages/sec without batching
* Up to 3,000 messages/sec with batching (10 messages per batch)

__Question:__ What is the maximum number of messages that can be stored in an SQS queue?
__Answer:__ no limit
