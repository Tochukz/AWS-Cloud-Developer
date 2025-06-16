#!/bin/bash/

filename=hol-126-lambda.zip
zip $filename lambda.py
aws s3 cp $filename s3://chucks-workspace-storage/v0.0.1/$filename