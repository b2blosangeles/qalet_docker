#!/bin/bash
cd /var/qalet/sites
git pull
folder=/var/qalet/cron
for f in "$folder"/*
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  sh $f
done
