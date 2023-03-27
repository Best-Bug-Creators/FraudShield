FROM node:18-alpine

WORKDIR /FraudShield/ms-anti-fraud

COPY . .

RUN npm config set strict-ssl false

RUN npm install

EXPOSE 3001

ENTRYPOINT npm start
