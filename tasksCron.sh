#!/bin/bash
mkdir -p /tmp/tasks
folder=/tmp/tasks
for f in "$folder"/*
do
  echo "Processing $f task..."
  # take action on each file. $f store current file name
  sh $f
  rm -f $f
done
