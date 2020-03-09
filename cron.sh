#!/bin/bash
cd /var/app_qalet/sites
git pull
folder=/var/qalet/crons
for f in "$folder"/*
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  sh $f
done
