FROM ubuntu:latest

USER root
COPY ./ /app/
WORKDIR /app
EXPOSE 3000/tcp
RUN apt-get update -y 
RUN apt-get install -y nodejs npm git
RUN npm install -g truffle
RUN npm install -g webpack@3.12.0
RUN npm install -g ganache-cli
RUN npm install -D
RUN truffle migrate --reset

CMD ./run.sh
