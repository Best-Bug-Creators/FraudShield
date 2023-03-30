import request from 'supertest';
import {
  afterEach, beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import app from '../src/app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

let idResponse;
describe('POST /analyses', () => {
  it('should create a new analysis', async () => {
    const response = await request(app).post('/analyses')
      .send({
        clientId: '6424a9b90db2a1862cdf9c41',
        transactionId: '6424a9c45c78aef36b1a7df7',
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('Under review');

    // eslint-disable-next-line no-underscore-dangle
    idResponse = response.body._id;
  });

  it('should not create anything when passing empty body', async () => {
    await request(app)
      .post('/analyses')
      .send({})
      .expect(500);
  });
});

describe('GET /analyses', () => {
  it('should return all analyses', async () => {
    const response = await request(app).get('/analyses');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /analyses/:id', () => {
  it('should return a detailed analysis when passing a valid ID', async () => {
    const response = await request(app).get(`/analyses/${idResponse}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.analysisId).toBe(idResponse);
    expect(response.body.clientId).toBe('6424a9b90db2a1862cdf9c41');
    expect(response.body.transactionId).toBe('6424a9c45c78aef36b1a7df7');
  });

  it('should not return an analysis when passing a invalid ID', async () => {
    const response = await request(app).get('/analyses/invalidIdHere');
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Analysis not found');
  });
});

describe('GET /analyses/under-review', () => {
  it('should return all analyses with under review status', async () => {
    const response = await request(app).get('/analyses/under-review');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('PATCH /analyses/:id', () => {
  it('should not change the analysis status when passing a EMPTY BODY', async () => {
    const req = { request };
    const spy = jest.spyOn(req, 'request');
    await request(app).patch(`/analyses/${idResponse}`).send({}).expect(400);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not change the analysis status when passing an INVALID STATUS', async () => {
    const req = { request };
    const spy = jest.spyOn(req, 'request');
    await request(app).patch(`/analyses/${idResponse}`).send({ status: 'Apple' }).expect(400);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not change the field status when passing an INVALID ID', async () => {
    const req = { request };
    const spy = jest.spyOn(req, 'request');
    await request(app).patch('/analyses/invalidIdHere123').send({ status: 'Approved' }).expect(500);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should change the analysis status when passing a VALID ID and STATUS', async () => {
    const req = { request };
    const spy = jest.spyOn(req, 'request');
    await req.request(app)
      .patch(`/analyses/${idResponse}`)
      .send({ status: 'Approved' })
      .set('Accept', 'application/json')
      .expect(200);
    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE /analyses/:id', () => {
  it('should not delete a resource when passing an invalid ID', async () => {
    await request(app).delete('/analyses/invalidIdHere123').expect(400);
  });

  it('should delete the resource corresponding to the chosen ID', async () => {
    await request(app).delete(`/analyses/${idResponse}`).expect(204);
  });
});
