# AWS Ec2 Service(Elastic compute cloud)

It is a cloud service that provides resizable virtual servers, called instances, which you can use to run applications.

Imagine you are running a business and need a server to host your website and application.

Instead of buying and managing phsical servers,
AWS Ec2 lets you rent virtual servers in the cloud. these virtual servers are called instances. 

# You can configure serveral options:
OS
RAM 
cpu
Disk Space
Netword / Firewall

- Instance Type :
select the hardware capacity(e.g. cpu,memory)

- AMI(Amazon machine image):Choose the operation system software (linux ,mac,windows)

- Storage: configure the type and size of storage(e.g. EBS volume)
- Security Groups : Set up firewall rules to control inbound and outbound traffic.
- Key pair: Create or use and existing key pair for ssh access.


# Security Groups:
Network firewall rules that control inbound and outbound traffic.

# Imp points about security groups
- Region specific
- Only allow rule(but no deny rule)
- All inbound traffic blocked and outbound allowed by default.

- If you allow incoming traffic on a specific port
the outgoing response traffic is automatically allowed
without an explicit outbound rule.