### Snowball
* Each Snowball  Edge Storage Optimized device can handle  _80 Terrabytes_ of data.  

### S3 – Baseline Performance  
* Amazon S3 automatically scales to high request rates, _latency 100-200 ms_
* Your application can achieve at least _3,500 PUT/COPY/POST/DELETE_ or _5,500 GET/HEAD requests per second per prefix_ in a bucket.
* There are no limits to the number of prefixes in a bucket.
* If you spread reads across all four prefixes evenly, you can achieve 22,000 requests per second for GET and HEAD
* For objects larger than _100 MB_, you should use multipart upload

### S3 LifeCycle Policy
* The minimum storage duration is _30 days_ before you can transition objects from Amazon S3 Standard to One Zone-IA or Standard-IA.

### Amazon Glacier
* Expedited retrieval enables access to data in _1-5 minutes_
* Standard retrievals typically complete in _3-5 hours_
* Bulk retrievals allow cost-effective access to significant amounts of data in _5-12 hours_
