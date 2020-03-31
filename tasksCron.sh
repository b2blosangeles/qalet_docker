#!/bin/bash
mkdir -p /tmp/tasks1
folder=/tmp/tasks1
for f in "$folder"/*; do
  if [ -f "$f" ]; then
    echo "Processing $f task..."
    # take action on each file. $f store current file name
    sh $f
    rm -f $f
  fi
done
