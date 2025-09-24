# Section 7: AWS Fundamentals: ELB + ASG
## Application Load Balancer (ALB)
__Introduction__  
* Application load balancers is Layer 7 (HTTP)
* Load balancing to multiple HTTP applications across machines (target groups)
* Load balancing to multiple applications on the same machine (ex: containers)
* Support for HTTP/2 and WebSocket
* Support redirects (from HTTP to HTTPS for example)

__ALB Good to know__  
* Fixed hostname (xxxx.region.elb.amazonaws.com)
* The application servers don't see the IP of the client directly
  - The true IP of the client is inserted in the header _X-Forwarded-For_
  - We can also get Port (_X-Forwarded-Port_) and proto (_X-Forwarded-Proto_)  

## Network Load Balancer
__Introduction__  
* Network load balancers (Layer 4) allow to:
  - Forward TCP & UDP traffic to your instances
  - Handle millions of request per seconds
  - Ultra-low latency
* NLB has one static IP per AZ, and supports assigning Elastic IP (helpful for whitelisting specific IP)
* NLB are used for extreme performance, TCP or UDP traffic
* Not included in the AWS free tier

## SSL, TLS and SNI
__SSL - Server Name Indication (SNI)__  
* SNI solved the problem of loading multiple SSL certificates onto one web server (to serve multiple websites)
* It is a newer protocol and requires the client to indicate the hostname of the target server in the initial SSL handshake
* The server will then find the correct certificate or return the default one.
* SNI only works for ALB, NLB and CloudFront
* SNI is not supported for CLB
