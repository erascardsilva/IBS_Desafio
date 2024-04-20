# Use the official Node.js 21 image as a base
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Expose port 4200 to the outside world
EXPOSE 4200

# Command to run the application
CMD ["npm", "start"]
