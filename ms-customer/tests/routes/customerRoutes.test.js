import {
  afterAll, beforeAll, describe, it,
} from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import {} from 'dotenv/config';
import app from '../../src/app.js';

const {
  TEST_USER: username,
  TEST_PASSWORD: password,
} = process.env;

beforeAll(async () => {
  await mongoose.connect(`mongodb://root:secret@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

let token;
describe('POST on /customers/login', () => {
  it('Must authenticate the user with correct credentials', async () => {
    const response = await request(app)
      .post('/customers/login')
      .set('Accept', 'application/json')
      .send({
        username,
        password,
      })
      .expect(204);

    token = response.headers.authorization;
  });

  it('Must return error with wrong credentials', async () => {
    await request(app)
      .post('/customers/login')
      .set('Accept', 'application/json')
      .send({
        username: '',
        password: '',
      })
      .expect(400);
  });
});

let responseId;
describe('POST on /customers/validateCard', () => {
  it('Must return the card owner id', async () => {
    const response = await request(app)
      .post('/customers/validateCard')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        name: 'Thiago Mendes',
        number: '5352730471443072',
        expirationDate: '2023-12',
        cvv: '444',
        invoiceExpirationDate: '25',
      })
      .expect('content-type', /json/)
      .expect(200);

    // eslint-disable-next-line no-underscore-dangle
    responseId = response.body._id;
  });

  it('Must not return data with unauthenticated user', async () => {
    await request(app)
      .post('/customers/validateCard')
      .set('Accept', 'application/json')
      .send({
        name: 'Thiago Mendes',
        number: '5352730471443072',
        expirationDate: '2023-12',
        cvv: '444',
        invoiceExpirationDate: '25',
      })
      .expect(401);
  });

  it('Must return error with an invalid card', async () => {
    await request(app)
      .post('/customers/validateCard')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        name: 'Jest',
        number: '1234567890123456',
        expirationDate: '0000-00',
        cvv: '000',
        invoiceExpirationDate: '01',
      })
      .expect(400);
  });
});

describe('GET on /customers/id', () => {
  it('Must return the client data', async () => {
    await request(app)
      .get(`/customers/${responseId}`)
      .set('Authorization', token)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Must return error with an invalid id', async () => {
    await request(app)
      .get('/customers/123456789012345678901234')
      .set('Authorization', token)
      .expect(404);
  });
});

describe('GET on /customers/invoiceExp/customerId', () => {
  it('Must return some client data', async () => {
    await request(app)
      .get(`/customers/invoiceExp/${responseId}`)
      .set('Authorization', token)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Must return error with invalid ID', async () => {
    await request(app)
      .get('/customers/invoiceExp/123456789012345678901234')
      .set('Authorization', token)
      .expect(404);
  });
});
