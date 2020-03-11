#!/bin/sh
sec = "$(date +"%S")"
if [ $sec == 36 ]
then
   echo "a is 36"
else
   echo "a is not 36"
fi
#!/bin/bash
mkdir -p /tmp/task
folder=/tmp/task
for f in "$folder"/*
do
  echo "Processing $f task..."
  # take action on each file. $f store current file name
  sh $f
done
