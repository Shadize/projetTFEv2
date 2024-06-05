# Base image
FROM node:18-alpine
# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .
RUN npm ci

ENV NODE_ENV production


# Start the server using the production build
CMD [ "node", "main.js" ]