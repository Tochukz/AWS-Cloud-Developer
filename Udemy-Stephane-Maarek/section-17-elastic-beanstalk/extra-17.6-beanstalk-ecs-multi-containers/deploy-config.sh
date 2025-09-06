#!/bin/bash
# Deploys a zipped configuration directory to S3

config_dir=$1
version=$2
zip_file="$config_dir.zip"
s3_path=artifacts/$version/$zip_file
cd $config_dir
zip -r $zip_file .
aws s3 cp $zip_file  s3://chucks-workspace-storage/$s3_path

echo "Deployed successfully!"
echo "Package S3 Key: $s3_path"

rm $zip_file

# 35.178.35.131