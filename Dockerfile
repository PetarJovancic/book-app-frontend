FROM node:15.13-alpine

COPY . /

EXPOSE 3000

RUN npm i
RUN npm run build

CMD ["npm", "start"]