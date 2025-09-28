#!/bin/bash
# Description: Installing Apache Web Server
yum update -y
yum install httpd -y
systemctl start httpd
systemctl enable httpd
