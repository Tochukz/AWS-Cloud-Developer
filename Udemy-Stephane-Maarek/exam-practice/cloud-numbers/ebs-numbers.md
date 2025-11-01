# Elasic Block store
__Provision IOPS to Volume Ratio__   
The maximum ratio of provisioned IOPS to requested volume size (in GiB) is _50:1_.  
So, for a _200 GiB_ volume size, max IOPS possible is 200*50 = 10,000 IOPS.  
* IOPS:volume Size = 50:1 for io1
* Remember that Max Volume size if _16TiB_
* And max IOPS is _64,000 IOPS_
* Min Volume size is 4GiB
* Amazon EBS delivers about _90 percent_ of the provisioned IOPS performance 99.9 percent of the time over a given year.

__Amazon EBS General Purpose SSD (gp2/gp3)__   
* __gp3__: Baseline 3,000 IOPS and 125 MB/s throughput, cheaper than gp2 if you don’t need more than that.
* __gp2__: IOPS tied to volume size (500 GB → 1,500 IOPS baseline).



* SSD, General Purpose (GP2) provides _3 IOPS per GB_ up to _16,000 IOPS_. Volume size is 1 GB to 16 TB
* Provisioned IOPS (Io1) provides the IOPS you assign up to _50 IOPS
per GiB_ and up to _64,000 IOPS_ per volume. Volume size is 4 GB to
16TB
* Throughput Optimized HDD (ST1) provides up to 500 IOPS per
volume but does not provide an SLA for IOPS
* Cold HDD (SC1) provides up to 250 IOPS per volume but does not
provide an SLA for IOPS


Type | IOPS per GB    | Max IOPS    | Volume Range
-----|----------------|-------------|------------
gp2  | 3 IOPS per GB  | 16,000 IOPS | 1GB - 16TB
io1  | 50 IOPS per GB | 64,000 IOPS | 4GB - 16TB
st1  |                | 500 IOPS    | 125GB - 16TB
sc1  |                | 250 IOPS    | 125GB - 16TB
