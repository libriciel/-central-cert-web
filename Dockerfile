#PROD
#FROM node:8.11.2-alpine as builder

#RUN mkdir /usr/src/app
#WORKDIR /usr/src/app

#COPY . /usr/src/app

#RUN npm install

#EXPOSE 4200

#RUN npm run build --prod

#FROM nginx:alpine
#COPY --from=builder /usr/src/app/dist/* /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf


#DEV
FROM node:8.15.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# add app
COPY . /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.2.4

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --disable-host-check
