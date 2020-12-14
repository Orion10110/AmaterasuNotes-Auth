FROM node:12.18.4-alpine3.9

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install
RUN run build

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "./dist/index.js"]