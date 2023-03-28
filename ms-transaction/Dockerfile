FROM node:18-alpine

WORKDIR /FraudShield/ms-transaction

COPY . .

RUN npm config set strict-ssl false

RUN npm install

EXPOSE 3003

ENTRYPOINT npm start
