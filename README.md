# nginx container with node.js containers


# Create Simple Node.js Application
    
    npm init
    touch server.js
    
# Create Dockerfile


# Create Docker Image
    
    docker build -t simple-node .

# Check docker images

    docker images

# Create Docker network

    docker network create -d bridge myNetwork
    

# Run SimpleNode Container  
    running 3 different instances with different ports
    
    docker run --name simple-node1 -e PORT=5000  -d  --network myNetwork simple-node
    docker run --name simple-node2 -e PORT=5001  -d  --network myNetwork simple-node
    docker run --name simple-node3 -e PORT=5002  -d  --network myNetwork simple-node


# Check docker containers
     docker ps 
     
    
# Create a host file path for nginx.conf file as <path>
    nginx.conf
    
    
    
    #user  nobody;
    worker_processes  1;
    
    #error_log  logs/error.log;
    #error_log  logs/error.log  notice;
    #error_log  logs/error.log  info;
    
    #pid        logs/nginx.pid;
    
    
    events {
    worker_connections  1024;
    }
    
    
    http {
    include       mime.types;
    default_type  application/octet-stream;
    
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    
    #access_log  logs/access.log  main;
    
    sendfile        on;
    #tcp_nopush     on;
    
    #keepalive_timeout  0;
    keepalive_timeout  65;
    
    #gzip  on;
    
    upstream load_balancing_list {
    server simple-node1:5000;
    server simple-node2:5001;
    server simple-node3:5002;
    }
    
    server {
    listen       80;     # watch out the port, not 8080 !
    server_name  nginx;
    
    location / {
    proxy_pass         http://load_balancing_list;
    }
    
    location = /50x.html {
    root   html;
    }
    
    }
    
    
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    
    
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
    }
    




# Install and run nginx docker image

    docker run --name nginx -p 8080:80 -v <path>/nginx.conf:/etc/nginx/nginx.conf:ro -d  --network myNetwork nginx




# Check docker containers

    docker ps
    

# Check localhost:8080

    each request is going to go different instance
