cat log/adbs.log | grep ICAO | awk '{split($0,a,":"); print a[2]}' | sort | uniq
