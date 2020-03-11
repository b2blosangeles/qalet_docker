#!/bin/bash
mkdir -p /tmp/tasks
folder=/tmp/tasks
for f in "$folder"/*
fn = "$folder/$f"
do
  if [[ -f "$fn" ]]; then
    echo "Processing $fn task..."
    # take action on each file. $f store current file name
    sh $fn
    # rm -f $f     
  fi

done
