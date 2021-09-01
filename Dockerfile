FROM ubuntu:latest

USER root
WORKDIR /app
RUN apt-get update
RUN apt-get install nodejs npm git
RUN git clone https://github.com/scentlxss/TodoListEthDApp.git .
RUN npm install
RUN ./node_modules/.bin/webpack
EXPOSE 3000/tcp

CMD ["npm","run","dev-back"]
