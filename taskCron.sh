#!/bin/bash
mkdir -p /tmp/task
folder=/tmp/task
for f in "$folder"/*
do
  echo "Processing $f task..."
  # take action on each file. $f store current file name
  sh $f
done
