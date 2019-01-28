
FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install --save express
COPY . /app
CMD PORT=${PORT} node server.js
EXPOSE ${PORT}



