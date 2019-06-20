FROM nginx:1.12

RUN apt-get update -qq &&  apt-get install curl software-properties-common gnupg  -yqq
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install nodejs -yyq
COPY . /var/www/centralcert/webroot/angular
COPY ./docker-ressources/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www/centralcert/webroot/angular
RUN npm install
RUN npm install -g @angular/cli@7.2.4
RUN ng build
