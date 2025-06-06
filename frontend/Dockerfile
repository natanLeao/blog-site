
FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./pages /usr/share/nginx/html/pages
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
