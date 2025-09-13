### Lambda
* Free tier of 1 Million AWS Lambda Request and 400k GBs of compute time
* Up to 10GB of RAM configurable


__AWS Lambda Limits to Know - per region__
* __Execution:__
  - Memory allocation: 128 MB – 10GB (1 MB increments)
  - Maximum execution time: 900 seconds (15 minutes)
  - Environment variables (4 KB)
  - Disk capacity in the “function container” (in /tmp): 512 MB to 10GB
  - Concurrency executions: 1000 (can be increased)
* __Deployment:__
  - Lambda function deployment size (compressed .zip): 50 MB
  - Size of uncompressed deployment (code + dependencies): 250 MB
  - Can use the /tmp directory to load other files at startup
  - Size of environment variables: 4 KB
* __Lambda Payload Size Limits:__
  - Synchronous invocation Request - max size 6 MB
  - Synchronous invocation Response - max size 6 MB
  - Asynchronous invocation Request - max size 256 KB
  - Asynchronous invocation  Response - No direct response
