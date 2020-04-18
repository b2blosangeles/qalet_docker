#!/bin/bash

[ -z "$1" -o -z "$2" ] && {  ## validate input
    printf "error: insufficient input. Usage: %s tmpfiles storage\n" ${0//*\//}
    exit 1
}

for i in "$1"/*; do
    fn=${i##*/}  ## strip path, leaving filename only

    ## if file in backup matches filename, skip rest of loop
    ls ${2}* | grep -q $fn &>/dev/null && continue

    printf "removing %s\n" "$i"
    # rm "$i" ## remove file
done
