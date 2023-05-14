# Base image
FROM node:14-alpine AS base
WORKDIR /app

# Install dumb-init for init process
RUN apk add --no-cache dumb-init

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application files
COPY . .

# Run migrations
RUN node ace migration:run

# Expose the default port for the application
EXPOSE 3333

# Run the application with dumb-init
CMD [ "dumb-init", "node", "server.js" ]
