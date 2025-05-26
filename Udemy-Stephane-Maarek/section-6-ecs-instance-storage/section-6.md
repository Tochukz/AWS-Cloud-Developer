# Section 6: EC2 Instance Storage

## Elastic Block Store (EBS)
### EBS Snapshots Features
* __EBS Snapshot Archive__
  - Move a Snpshot to an "archive tier" that is 75% cheaper
  - Takes within 24 to 72 hours for restoring the archive
* __Recycle Bin for EBS Snapshot__  
  - Setup rules to retain deleted snapshots so you can recover them after an accidental deletion
  - Specify retention (from 1 day to 1 year)
* __Fast Snapshot Restore (FSR)__  
  - Force full initialization of snapshot to have no latency on the first use (for large snapshot and it cost money)

### EBS Volume Types
* EBS Volumes comes in 6 types
  - _gp2/gp3 (SSD)_: General purpose SSD volume that balances price and performance for a wide variety of workloads
  - _io1/io2 Block Express SSD_: Highest-performance SSD volume for mission-critical low-latency or high-throughput workload
  - _st1 (HDD)_: Low cost HDD volume designed for frequently accessed, throughput-intensive workload
  - _sc1 (HDD)_: Lowest cost HDD volume designed for less frequently accessed workloads
* EBS Volumes are characterized in Size | Throughput | IOPS (I/O Ops Per Sec)
* When in doubt always consult the AWS documentation
* Only _gp2/gp3_ and _io1/io2 Block Express_ can be used as boot volumes

### EBS Volume Types Use cases
__General Purpose SSD__  
* Cost effective storage, low-latency
* System boot volumes, Virtual desktops, development and test environment
* 1 GiB - 16 TiB
* gp3:  
  - Baseline of 3,000 IOPS and throughput of 125 MiB/s
  - Can increase IOPS up to 16,000 and throughput up to 1000 MiB/s independently
* gp2:
  * Small gp2 volumes can burst IOPS to 3,000
  * Size of the volume and IOPS are linked, max IOPS is 16,000
  * 3 IOPS per GB, means at 5,334 GB WE ARE AT THE MAX IOPS

__Provisioned IOPS (PIOPS) SSD__  
* For critical business applications with sustained IOPS performance
* Or applications that need more than 16,000 IOPS
* Great for database workloads (sensitive to storage performance and consistency)
* io1 (4GiB - 16TiB)
  - Max PIOPS: 64,000 for Nitro EC2 instances & 32,000 for others
  - Can increase PIOPS independently from storage size
* io2 Block Express (4GiB - 64GiB)
  - Submillisecond latency
  - Max PIOPS: 256,000 with an IOPS:GiB ration of 1000:1
* Supports _EBS multi-attach_

__Hard Disk Drives (HDD)__  
* Cannot be a boot volume
* 125GiB TO 16TiB
* _Throughput Optimized HHD (st1)_
  - For Big Data, Data Warehouses, Log Processing
  - Max throughput 500MiB/s - max IOPS 500
* _Code HDD (sc1)_  
  - For data that is infrequently accessed
  - Scenarios where lowest cost is important
  - Max throughput 250Mib/s - max IOPS 250

__Learn more on EBS volume types__  
[Amazon EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)

### EBS Multi-Attach - io1/io2 family
* Attach the same EBS volume to multiple EC2 instances in the same AZ
* Each instance has full read & write permissions to the high-performance volume
* Use cases:
  - Achieve higher application availability in clustered Linux application (eg. Teradata)
  - Applications must manage concurrent write operations
* _Up to 16 EC2 instances at a time_  
* Must use a file system that is cluster-aware (not XFS, EXT4, etc...)

## Elastic File System (EFS)
__Introduction__  
* Managed NFS (Network File System) that can be mounted on many EC2
* EFS works with EC2 instances in multi-AZ
* Highly avilable, scalable, expensive (3x gp2), pay per use

__EFS Use cases__  
* Used for content management, web serving, data sharing, Wordpress
* Uses nfsV4.1 protocol  
* Uses security group to control access to EFS
* _Compatible with Linux based AMI (not windows)_
* You can enable encryption at rest using KMS
* POSIX file system  (~Linux) that has a standard file API
* File system scales automatically, pay-per-use, no capacity planning

__EFS - Performance Settings__  
* __EFS Scale__
  - 1000s of concurrent NFS clients, 10GB+/s throughput
  - Grows to Petabyte-cale network file system automatically
* __Performance Mode (set at EFS creation time)__
  - General Purpose (default) - latency-sensitive use cases (web server, CMS, etc)
  - Max I/O-  higher latency, throughput , highly parallel (big data, media processing)
* __Throughput Mode__
  - __Bursting__ - 1TB = 500MiB/S + burat of up to 100MiB/s
  - __Provisioned__ - set your throughput regardless of storage size, ex: 1GiB/s to 1 TB storage
  - __Elastic__ - automatically scales throughput up or down based on your workloads
    * Up to 3GiB/s for reads and 1 GiB/s for writes
    * Used for unpredictable workloads

__EFS - Storage Classes__  
* __Storage Tiers (lifecycle management features move file after N days)__
  - __Standard__: for frequently accessed files
  - __Infrequently access (EFS-IA)__: cost to retrieve files, lower price to store
  - __Archive__: rarely accessed data (few times each year), 50%
  - Implement _lifecycle policies_ to move files between storage tiers
* __Availability and durability__  
  - Standard: Multi-AZ, greate for production
  - One Zone: One AZ, great for dev, backup enabled by default, compatible with IA (EFS One Zone-IA)
* Over 90% in cost savings
