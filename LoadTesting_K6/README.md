# Load Testing with K6
## Pre-requisites

1. Install
### Mac
Install with Homebrew by running:
```
$ brew install k6
```
### Windows
If you use the Chocolatey package manager you can install the unofficial k6 package with:
```bash
choco install k6
```
2. Navigate to folder LoadTesting_K6 and run testscripts to test End Points using below commands
```$k6 run --vus 1000 --iterations 10000 loginEndPoint.js
```
Note: Change the application URL to load balancer URL and number of load can be changed in the test script

3. View the results and compare the CPU usage based on number of inputs. Also in the monitoring tool CPU usage can be monitored.
