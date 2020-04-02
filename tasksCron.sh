#!/bin/bash
mkdir -p /tmp/tasks1
folder=/tmp/tasks1
for f in "$folder"/*; do
  if [ -f "$f" ]; then
    echo "Processing $f task..."
    fn=/tmp/SH$(($(date +%s%N)/1000000)).sh
    cp -fr $f $fn && rm -fr $f
    sh $fn
    rm -fr $fn
  fi
done
