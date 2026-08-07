<!-- What is Cloud Computing ? -->

Cloud computing is the delivery of computing services such as servers, storage, databases, networking, and software over the internet on a pay-as-you-go basis.

Apna server kharidne ki jagah, internet par available server ko kiraye (rent) par use karna hi Cloud Computing hai.

<!-- Cloud Service Models -->

1. IaaS (Infrastructure as a Service)

AWS tumhe server deta hai.

Baaki sab tum manage karte ho.  

Example: EC2

2. PaaS (Platform as a Service)

Server ki tension nahi.

Bas code upload karo.

Example:

Azure App Service
Google App Engine

3. SaaS (Software as a Service)

Software ready milta hai.

Install bhi nahi karna.

Examples:

Gmail
Google Docs
Microsoft 365

# Note :-

IaaS = "Server do, baaki main kar lunga."

PaaS = "Platform do, main sirf code dunga."

SaaS = "Software ready do, main sirf use karunga."

<!-- AWS Region Kya Hota Hai? -->

Region = Kisi country ya area mein AWS ka ek bada location jahan AWS apni cloud services provide karta hai.

<!-- Availability Zone (AZ) Kya Hoti Hai? -->

Availability Zone ek ya ek se zyada physical data centers ka group hota hai jo:

Availability Zone ek isolated physical location hoti hai jo ek AWS Region ke andar hoti hai. Har Availability Zone mein ek ya ek se zyada data centers hote hain. Multiple Availability Zones ka use karke applications ko high availability aur fault tolerance di jaati hai.

Ek hi AWS Region ke andar hote hain.
Ek dusre se physically alag hote hain.
High-speed private network se connected hote hain.

| Region                 | Availability Zone                              |
| ---------------------- | ---------------------------------------------- |
| Geographical area      | Region ke andar isolated location              |
| Example: Mumbai        | Example: ap-south-1a, ap-south-1b, ap-south-1c |
| Multiple AZs hoti hain | Data centers ka group hota hai                 |
| Bahut bada area        | Region ka ek part                              |

<!-- What is IAM --> Identity and Access Management

IAM (Identity and Access Management) ek AWS service hai jo ye decide karti hai:
Kaun AWS me login kar sakta hai?
Kaun kya access kar sakta hai?
Kis user ko kaunsi permission milegi?

Simple definition:
IAM ek security service hai jo AWS resources par authentication (kaun ho?) aur authorization (kya kar sakte ho?) control karti hai.

# Real Life Example

Socho tumhari company me alag-alag employees hain.

Admin 👨‍💼

Admin sab kuch kar sakta hai.

Server bana sakta hai ✅
Database delete kar sakta hai ✅
User create kar sakta hai ✅

Developer 👨‍💻

Developer sirf application deploy kar sakta hai.

EC2 access ✅
S3 access ✅
Database delete ❌

Accountant 👩‍💼

Accountant ko sirf billing dekhni hai.

Billing ✅
EC2 ❌
RDS ❌

Ye sab control IAM karta hai.

<!-- AWS Billing -->

AWS Billing ek service hai jo batati hai ki tumne AWS ki kaun-kaun si services kitni use ki hain aur uske kitne paise ban rahe hain.

<!-- VPC (Virtual Private Cloud)  -->
VPC ek private network hai jo tum AWS ke andar create karte ho.

Us network ke andar tum:

EC2
RDS
Lambda (VPC-enabled)
ECS
aur dusre resources rakhte ho.

Yeh network sirf tumhara hota hai.

