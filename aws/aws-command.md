<!-- how to see our aws sytstem specifciation -->

# CPU Information
lscpu

Architecture: x86_64
CPU(s): 2
Model name: Intel Xeon Platinum 8375C

# RAM (Memory)
free -h 

               total        used        free
Mem:           3.8Gi       1.2Gi       2.1Gi
Swap:          2.0Gi       0B          2.0Gi

# Disk Space

df -h

# Operating System
cat /etc/os-release

NAME="Ubuntu"
VERSION="24.04 LTS"

# Kernel Version
uname -a

# Storage Devices
lsblk

Output:

NAME         SIZE TYPE
nvme0n1       20G disk
├─nvme0n1p1   20G part

# EC2 Instance Type

Agar AWS EC2 instance ka type dekhna hai:

curl http://169.254.169.254/latest/meta-data/instance-type

Output:

t3.micro

# Ip Address
hostname -I


<!-- Use aws in local system -->
https://app.localstack.cloud/getting-started