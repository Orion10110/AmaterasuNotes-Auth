FROM node:12.18.4-alpine3.9

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

USER node

COPY --chown=node:node . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/index.js"]