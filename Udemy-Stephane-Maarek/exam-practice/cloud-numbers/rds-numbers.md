# RDS
### RDS Limits
* Automated backups in RDS have a maximum retention of _35 days_
* You can have read replicas of read replicas for MySQL and
MariaDB but not for PostgreSQL
* You cannot have more than four instances involved in a replication chain i.e Primary → Replica1 → Replica2 → Replica3 → Replica4


### Amazon Aurora
* Aurora databases can scale up to _64 TB_ and Aurora replicas features _millisecond latency_
* All other RDS engines have a limit of _16 TiB_ maximum DB size and asynchronous replication typically takes _seconds_  
