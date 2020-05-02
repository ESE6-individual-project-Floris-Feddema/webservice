# Get the nginx 1.16.0 alpine image from Docker Hub
FROM nginx:1.16.0-alpine

# Set the current work directory in the image
WORKDIR /var/www/

# Copy the /build folder into the current work directory
COPY /build ./

# Execute nginx command
# '-g daemon off;' will ensure NGINX stays at the foreground for Docker to track properly
ENTRYPOINT ["nginx", "-g", "daemon off;"]