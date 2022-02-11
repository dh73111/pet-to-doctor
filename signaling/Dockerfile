FROM node:16.13.1-alpine
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
# COPY package.json ./
# COPY package-lock.json ./

COPY signaling/package.json /app/package.json
RUN npm install

# add app
COPY signaling ./
WORKDIR /app/src

EXPOSE 2000

# start app
CMD ["node", "server.js"]