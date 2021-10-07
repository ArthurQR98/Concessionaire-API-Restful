FROM node
COPY . /var/www
WORKDIR /var/www
RUN npm install 
EXPOSE 4000
ENTRYPOINT ["npm", "start"]