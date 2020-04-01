#!/bin/bash
mkdir -p /tmp/tasks
folder=/tmp/tasks
for f in "$folder"/*; do
  if [ -f "$f" ]; then
    echo "Processing $f task..."
    fn=/tmp/SH$(($(date +%s%N)/1000000)).sh
    cp -fr $f $fn
    sh $f
    rm -f $f
  fi
done
