FROM ubuntu:latest

USER root
COPY ./ /app/
WORKDIR /app
EXPOSE 3000/tcp
RUN apt-get update -y 
RUN apt-get install -y nodejs npm git
RUN npm install -g truffle
RUN npm install -g webpack@3.2.0
RUN truffle migrate --reset
RUN webpack

CMD ./run.sh
