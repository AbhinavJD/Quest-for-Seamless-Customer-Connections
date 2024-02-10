FROM node:18-alpine as build_image
WORKDIR /usr/src/quest_ceadar/client

# Install serve globally
RUN npm install -g serve

# Copy the built files from the build directory
COPY ./build .

# Expose port 3000
EXPOSE 3000

# Run serve to serve the built files
CMD ["serve", "-s", "build"]
