# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ./src ./src

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
