#!/bin/bash
mkdir -p /tmp/tasks
folder=/tmp/tasks
for f in "$folder"/*; do
  if [ -f "$f" ]; then
    echo "Processing $f task..."
    fn=/tmp/SH$(date +%s%N).sh
    cp -fr $f $fn && rm -fr $f
    sh $fn
    rm -fr $fn
  fi
done
