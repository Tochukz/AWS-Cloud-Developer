### Amazon SQS – Standard Queue
* Attributes:
  - Unlimited throughput, unlimited number of messages in queue
  - Default retention of messages: _4 days, maximum of 14 days_
  - Low latency (<10 ms on publish and receive)
  - Limitation of _256KB per message sent_

### SQS – Message Visibility Timeout
* By default, the “message visibility timeout” is _30 seconds_

### Amazon SQS – Delay Queue
* Delay a message (consumers don’t see it immediately) up to 15 minutes

### Amazon SQS - Long Polling
* The wait time can be between 1 sec to 20 sec
(20 sec preferable)
