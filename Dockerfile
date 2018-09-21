FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN npm install -g grunt-cli
#RUN npm install grunt
COPY . .
EXPOSE 4000
CMD [ "grunt" ]