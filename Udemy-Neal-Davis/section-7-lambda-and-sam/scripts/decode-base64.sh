#!/bin/bash
# Decode base64 encoded string

encoded="SGVsbG8gV29ybGQh"
echo "$encoded" | base64 --decode
