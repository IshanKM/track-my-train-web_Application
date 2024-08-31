# Use the official Node.js 20 image as a base
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Install an HTTP server to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5174

# Start the application
CMD ["npm", "start"]
