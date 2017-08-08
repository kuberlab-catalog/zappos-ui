FROM ubuntu:16.04

RUN apt-get update \
	&& apt-get -y install curl wget unzip \
	&& curl -sL https://deb.nodesource.com/setup_7.x | bash - \
    && apt-get install -y nodejs \
	&& apt-get -y install nodejs git \
	&& npm install -g bower gulp-cli

RUN wget http://vision.cs.utexas.edu/projects/finegrained/utzap50k/ut-zap50k-images.zip \
    && mkdir /images \
    && unzip ut-zap50k-images.zip \
    && mv ut-zap50k-images/* /images/ \
    && rm -rf ut-zap50k-images.zip \
    && rm -rf ut-zap50k-images

ENV IMAGES_PATH /images

RUN mkdir /zappos-ui
ADD ./api /zappos-ui/api
ADD ./ui /zappos-ui/ui

WORKDIR /zappos-ui/ui

RUN npm i
RUN npm i webpack -g
RUN webpack
#RUN webpack --watch --watch-poll

WORKDIR /zappos-ui/api

RUN npm i

CMD node index.js
EXPOSE 8888
