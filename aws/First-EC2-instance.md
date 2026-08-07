<!-- What is an EC2 Instance? -->

An EC2 instance is a virtual computer (VM) running in AWS.

Think of it like this:

Your Laptop → Physical computer
EC2 Instance → Virtual computer in AWS's data centre

You can install software on it, run applications, host websites, databases, APIs, etc.

<!-- Steps for Creating Instance -->

Launch Instance
Choose an AMI(Amazon Machine Image)
Choose Instance Type(t2.micro,t3.micro,t2.small)
Create a key pair ->server.pem
Create Network Settings ->
Allow inbound rules -> SSH(22)
For a web server, you can also allow:
HTTP(80),HTTPS(443)
Configure storage -> Default 8GB
Launch Instance -> wait 20-30 seconds

AWS will create the server.

<!-- AWS will create the server. -->

Get Public IP ->
13.201.89.124
or
Get Public DNS ->

ec2-13-201-89-124.ap-south-1.compute.amazonaws.com

<!-- Connect Using SSH -->

For Ubuntu, the default username is: ubuntu

ssh -i "filename.pem" username@<public-ip>
                    or
ssh -i "filename.pem" username@<public-DNS>

<!-- Connect EC2 instance when ssh not used -->
git bash