# Use the official Node.js 20 image as a base for building the application
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller image to serve the built application
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 5174
EXPOSE 5174

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
