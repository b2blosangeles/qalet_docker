#!/bin/bash
FILES=/var/qalet/cron
for f in $FILES
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  # sh $f
  # rm -fr $f
done
