| Service    | Purpose                           |
| ---------- | --------------------------------- |
| EC2        | Virtual server                    |
| S3         | File storage                      |
| RDS        | Managed database                  |
| IAM        | Users and permissions             |
| VPC        | Private networking                |
| Lambda     | Run code without managing servers |
| CloudWatch | Monitoring and logs               |

EC2 -> S3 -> RDS -> IAM -> VPC -> Security Group

S3 -> Storage
IAM -> User Permission
VPC -> Networking

<!-- Tum Kya Rent Par Le Sakte Ho? -->

Cloud mein sirf server hi nahi.

Bahut saari cheezein rent par milti hain.

1. Server -> Ec2 instance

Node.js chalane ke liye

AWS Service: EC2

2. Storage -> S3

Images aur PDF rakhne ke liye

AWS Service: S3

3. Database -> RDS

PostgreSQL ya MySQL

AWS Service: RDS

4. Networking -> VPC

Internet configure karna

AWS Service: VPC

5. User Permission -> IAM

Kaun login karega

AWS Service: IAM

6. Security Group -> it is virtual firewall that can manage or control ec2 incoming traffic(inbound rule) and out traffic (outbound rule)
