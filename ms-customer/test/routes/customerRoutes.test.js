import {
  afterAll, beforeAll, describe, it,
} from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://root:secret@127.0.0.1:27019/fraudshield-customers?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET on /customers/validateCard', () => {
  it('Must return the card owner id', async () => {
    await request(app)
      .get('/customers/validateCard')
      .set('Accept', 'application/json')
      .send({
        name: 'Thiago Mendes',
        number: '5352730471443072',
        expirationDate: '2023-12',
        cvv: '444',
        invoiceExpirationDate: '25',
      })
      .expect(200);

    // eslint-disable-next-line no-underscore-dangle
  });

  it('Must return error with invalid card', async () => {
    await request(app)
      .get('/customers/validateCard')
      .set('Accept', 'application/json')
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
  });
});
