FROM node:19.5.0-alpine

# Set working directory
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app

# Install dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci --production

# Copy app source code
COPY --chown=node:node . .

# Build app
RUN node ace build --production --ignore-ts-errors

ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0

# Expose port
EXPOSE $PORT

RUN node --harmony_proxies ace migration:fresh

# Start app
CMD ["node", "run", "start"]
