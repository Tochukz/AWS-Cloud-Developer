### API Gateway
__Limits to know__  
* 29 seconds timeout
* 10 MB max payload size

__Caching API responses__  
* Default TTL (time to live) is 300 seconds (min: 0s, max: 3600s)
• Cache capacity between 0.5GB to 237GB



#### REquest Limits
__API Gateway REST API (v1) – Default Limits__

AWS enforces __two levels of throttling__:

1. Account-level limit (per Region)
  * 10,000 requests per second (RPS)
  * 5,000 requests in a 5-second burst

This applies across _all_ your REST APIs in that region.

2. Per-method limit (default)
  * 500 RPS
  * 1000 burst

You can override these per stage/method by defining your own throttling settings (but cannot exceed the account-level limit).

---

__API Gateway HTTP API (v2) – Default Limits__

HTTP APIs provide higher throughput:

* 10,000 RPS per Region (same as REST)
* Burst is also automatically managed but typically higher than REST.

HTTP APIs are more scalable and cheaper for high-throughput use cases.

---

__Important__: These limits are NOT hard maximums**

If you need more than 10,000 RPS:
* You can request a _Service Quota increase_
  - AWS routinely approves increases up to _50,000–100,000 RPS_ per Region
(some customers go even higher with support).
* API Gateway _scales horizontally_
  - There is no “theoretical maximum” — AWS will scale if you request a quota raise.


__Summary__

| API Type          | Default RPS Limit | Can Increase? |
| ----------------- | ----------------- | ------------- |
| **REST API**      | 10,000 RPS        | ✔ Yes         |
| **HTTP API**      | 10,000 RPS        | ✔ Yes         |
| **WebSocket API** | 10,000 RPS        | ✔ Yes         |
