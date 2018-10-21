# Based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:8.9.3

ARG port=3000

RUN echo "PORT: $port"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

ENV PORT ${port}

EXPOSE ${port}

CMD [ "npm", "start" ]