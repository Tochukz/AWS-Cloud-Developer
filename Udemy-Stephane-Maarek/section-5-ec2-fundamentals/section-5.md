# Section 5: EC2 Fundamentals

## Security Group
__Classic Ports to know__  
* 22   - SSH
* 21   - FTP
* 22   - SFTP
* 80   - HTTP
* 443  - HTTPS
* 3389 - RDP (Remote Desktop Protocol)
* 1433 - SQL Server

### Type of Reserved Instance (RI) in EC2
1. __Regional Reserved Instances__
  - Apply to any AZ within a region.
  - Provide billing discount (up to 72% cheaper).
  - _Do NOT guarantee capacity reservation._
  - Flexible across Availability Zones in the same region.

2. __Zonal Reserved Instances__  
  - Tied to a specific Availability Zone.
  - Provide both capacity reservation and cost savings.
  - Ensures you can launch the instances in that AZ when you need them.
