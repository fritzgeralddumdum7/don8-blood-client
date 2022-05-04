ARG NODE_IMAGE=node:17.9.0

FROM $NODE_IMAGE AS base

RUN mkdir -p /avion/frontend

WORKDIR /avion/frontend

COPY package.json /avion/frontend/package.json
COPY package-lock.json /avion/frontend/package-lock.json

ADD . /avion

EXPOSE 3000

CMD npm start
