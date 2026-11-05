# first login in google developer console

# link for implement OPENID

https://developers.google.com/identity/openid-connect/openid-connect

# THis url is imp for login with google

https://accounts.google.com/o/oauth2/v2/auth?
response_type=code&
client_id=${client_id}&
scope=openid email profile&
redirect_uri=http://localhost:5500&
state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2-login-demo.example.com%2FmyHome&
login_hint=jsmith@example.com&
nonce=0394852-3190485-2490358&
hd=example.com


There are 4 query params are imp : - 
response_type, client_id, scope, redirect_uri

In scope we pass email and profile (in profile we get photo and name)