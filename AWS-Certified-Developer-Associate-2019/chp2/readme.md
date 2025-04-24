## Chapter 2: Introduction to Compute and Networking

### Amazon Elastic Compute Cloud
__Instance Type__  
Instances within a given family share similar characteristics, such as the ratio of vCPU to RAM or access to different types of storage options.  

__Network Interrfaces__  
The number of network interfaces that you can attach to an instance and the network
throughput depends on the specific instance type and size that you select.  

__Amazon EC2 Key Pairs__  
For a Linux instance, the public key from the key pair is added to the `~/.ssh/authorized_keys` file for the default user.  
For a Windows instance, the password for the default administrator account is encrypted with the public key and can be decrypted with the private key.

__Discovering Instance Metadata__  
With the _instance metadata service (IMDS)_, code running on an Amazon EC2 instance can discover properties about that instance.  
The instance metadata service exposes a special IP address, 169.254.169.254, which you can query using HTTP to perform lookups
```bash
$ curl 169.254.169.254/latest/meta-data
```
With IMDS, it also possible to retrieve the user data that was used to bootstrap an instance
```bash
$ curl 169.254.169.254/latest/user-data
```  
Do not store sensitive data, such as passwords or access keys, as user data.  

__Assigning AWS API Credentials__  
When an instance profile with an IAM role is associated with an instance, the Amazon EC2 service makes the necessary calls to the _AWS Security Token Service (AWS STS)_ automatically to generate short-term credentials for that instance.    
The credentials are exposed to the instance through the _Amazon EC2 metadata service_.  

__Monitoring Instances__
You can supplement THE built-in metrics, such as _CPU utilization_, _disk reads and writes_, and _network utilization_ with data from the guest operating system on your instance, such as _memory utilization_ and logs from your application, by installing and configuring the _CloudWatch agent_ on the instance.

### Customizing the Network
__Connecting to Other Networks__  
Types of connections that you can establish between an Amazon VPC and other networks.

Connection Type              | Description
-----------------------------|-------------------
Internet Gateway             | Allows outbound and inbound requests to the internet from your Amazon VPC
Egress Only Internet Gateway | A special type of internet gateway for IPv6 that allows outbound traffic and corresponding responses but blocks inbound connections
Virtual Private Gateway      | Allows you to establish a private connection to your corporate network by using a VPN connection or through Direct Connect (DX)
Amazon VPC Endpoints         | Allows traffic from your Amazon VPC to go to specific AWS services or third-party SaaS services without traversing an internet gateway
Amazon VPC Peering           | Privately routes traffic from one Amazon VPC to another Amazon VPC by establishing a peer relationship between this VPC and another VPC
AWS Transit Gateway          | Allows you to centrally manage connectivity between many VPCs and an on-premises environment using a single gateway

#### IP Addresses
__Private IP Addresses__  
When an instance is assigned a private IPv4 address, this association persists for the lifecycle of the instance—even when the instance is stopped.  

__Public IP Addresses__  
AWS manages the association between an instance and a public IPv4 address, and the
association persists only while the instance is running.  

__Elastic IP Addresses__  
You may also assign Elastic IP addresses to infrastructure such as NAT gateways.  
These addresses can come from a pool of IP addresses that AWS manages or from blocks of IPv4 addresses you have brought to your AWS account.  

__IPv6 Addresses__  
In addition to IPv4 addresses, you can associate an Amazon-provided block of IPv6 addresses to your VPC.
