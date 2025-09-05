#!/bin/bash 
# Deploys a zipped configuration directory to S3

config_dir=$1
zip_file="$config_dir.zip"
s3_path=artifacts/$zip_file
cd $config_dir
zip -r $zip_file .
aws s3 cp $zip_file  s3://chucks-workspace-storage/$s3_path

echo "Deployed $zip_file to $s3_path"