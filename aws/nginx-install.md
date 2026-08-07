<!-- Login as root user -->

sudo -i

<!-- Update Ubuntu -->

sudo apt update

<!-- Install nginx -->

sudo apt install nginx -y

<!-- check status of service nginx -->

sudo systemctl status nginx
or in bash->
service status nginx

<!-- Test the Nginx configuration -->

nginx -t


Expected output:
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
