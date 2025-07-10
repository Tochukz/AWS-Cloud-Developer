#!/bin/bash
# Installs the CodeDeploy Agent on an EC2 instance running Amazon Linux 2.

# Installing CodeDeploy Agent
sudo yum update
sudo yum install ruby -y

# Download the agent (replace the region)
region=eu-west-2
wget https://aws-codedeploy-${region}.s3.${region}.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status