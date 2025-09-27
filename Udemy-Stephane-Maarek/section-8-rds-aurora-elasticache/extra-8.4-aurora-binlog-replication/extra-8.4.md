# Extra-8.4: Aurora MySQL BinLog Replication

### Description

Setting up Aurora MySQL _binlog replication_ across regions is a common pattern when you need cross-region disaster recovery or read scaling with external MySQL systems.   

In this example, we setup Aurora MySQL primary Cluster in one region and a secondary Aurora MySQL cluster in another region.
We configure _binlog replication_ from the primary instance in the main cluster to the instance in the secondary cluster.  

Here we have two template and two stacks in different regions.

**Notes**
* Both Regions must allow RDS cluster creation.
* Binlog replication requires `binlog_format=ROW` on the primary cluster.
* The replica cluster is read-only. Writes go only to the primary.
* Failover across Regions is manual, unless you combine with Aurora Global Database (which is usually preferred).

Aurora Global Database setup is AWS’s recommended alternative to _cross-region binlog replication_. It gives faster cross-region replication (<1s) and easier managed failover.   

### Operation

**Deployment**  
Lint the templates

```bash
$ cfn-lint AuroraBinlogReplica.yaml
```

Deploy the stack

```bash
$ aws cloudformation deploy --template-file AuroraBinlogReplica.yaml  --stack-name AuroraBinlogReplica --parameter-overrides file://secret-parameters.json --capabilities CAPABILITY_NAMED_IAM
```

**After Deployment**


**Testing**

**Debug Errors**  
 In the case of error during deployment, checkout the stack events

```bash
$ aws cloudformation describe-stack-events --stack-name AuroraBinlogReplica > events.json
```

Search for _"Resource handler returned message"_ to see the root failure.

**Cleanup**  
To delete the stacks

```bash
$ aws cloudformation delete-stack --stack-name AuroraBinlogReplica
```

### Learn More
__BinLog Replication__  
BinLog Replication in Aurora refers to binary log replication, where Aurora MySQL publishes MySQL-compatible binary logs (binlogs) that can be used for replication to external MySQL databases or other Aurora clusters.
* In MySQL, binlogs record every change to the database (INSERT, UPDATE, DELETE, DDL, etc.).
* Aurora can be configured to write and export binlogs, so external MySQL instances (on Amazon RDS MySQL, EC2, or on-premises) can use them for replication.

__Why is it useful?__  
* __Hybrid architectures__ → keep an on-premises MySQL database in sync with Aurora.
* __Migration / DR__ → migrate from Aurora to MySQL or maintain a standby outside Aurora.
* __Analytics / Reporting__ → replicate changes into another system for analysis.
* __Cross-region replication__ (if you don’t want to use Aurora Global Database).
