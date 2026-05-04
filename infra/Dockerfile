FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# HTML files are mounted via volume at runtime
EXPOSE 80
