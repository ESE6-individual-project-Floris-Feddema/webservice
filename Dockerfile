# Get the nginx 1.16.0 alpine image from Docker Hub
FROM nginx:1.16.0-alpine

#copy the nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the /build folder into the public html folder
COPY /build /usr/share/nginx/html

EXPOSE 80

# Execute nginx command
ENTRYPOINT ["nginx", "-g", "daemon off;"]
