# AWS IAM
# Ways of accessing AWS

- The AWS management console provides a graphical ,
web based approach.
- The AWS cli provides a command-line,scripting approach.
- AWS SDKs and APIs offer programmatic ,code based access,
allowing users to integrate AWS directly into their applications.

# AWS cli Downlaod in window
search in google AWS cli download and download aws cli download exe file.

aws cli cmds are start with aws.

Commands : 

aws --version
aws configure --> configure aws cli with your credential
aws iam list-users


# AWS IAM best practies

- Avoid using root account except of account setup.
- Add user to a group and assign permission to group.
- Use password policy or MFA.(Account settings - password policy set kar skte hai.)
- Use Access keys for cli/sdk.(We can use access keys for accessing aws account.  we can create simple users go to iam users and inside user we go to security credential.)
- Never share access keys or password.
- Audit the permission using IAM credential report.(In IAM Dashboard we can see in bottom credential report. in credential report we can see all users login info.)
