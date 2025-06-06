#!/bin/bash
cd code
zip -r lambda-code-05-06.zip . -x "lambda-code-05-06.zip"
aws s3 cp lambda-code-05-06.zip s3://chucks-workspace-storage/v0.0.1/lambda-code-05-06.zip