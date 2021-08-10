# air-collection

Tools to collect plane data

## Collecting data

There is always a question about where to obtain _dump1090_, the one included here works. Simply `tee` it's data into the log file: `dump-1090/dump1090 > log/adbs.log`

The raw output can then be processed by the various scripts which are activated by the `package.json`
