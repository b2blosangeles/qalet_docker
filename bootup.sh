echo "bootup.sh ran at $(date '+%Y-%m-%d %H-%M-%S')"  >> /var/cron.sh.log
#!/bin/bash
input="/path/to/txt/file"
while IFS= read -r line
do
  echo "$line"
