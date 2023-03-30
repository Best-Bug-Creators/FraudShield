FROM node:18-alpine

WORKDIR /FraudShield/api-gateway

COPY . .

RUN npm config set strict-ssl false

RUN npm install

EXPOSE 3000

ENTRYPOINT npm start