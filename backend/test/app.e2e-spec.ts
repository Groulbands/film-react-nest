import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Film! API (e2e, memory repository)', () => {
  let app: INestApplication;
  const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';
  const sessionId = 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce';

  beforeAll(async () => {
    process.env.DATABASE_DRIVER = 'memory';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/afisha');
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    delete process.env.DATABASE_DRIVER;
  });

  it('GET /api/afisha/films returns films', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/afisha/films')
      .expect(200);
    expect(response.body.total).toBe(6);
    expect(response.body.items[0]).toHaveProperty('id');
    expect(response.body.items[0]).not.toHaveProperty('schedule');
  });

  it('GET /api/afisha/films/:id/schedule returns sessions', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/afisha/films/${filmId}/schedule`)
      .expect(200);
    expect(response.body.total).toBeGreaterThan(0);
    expect(response.body.items[0]).toHaveProperty('taken');
  });

  it('POST /api/afisha/order updates taken and rejects repeated purchase', async () => {
    const body = {
      email: 'test@example.com',
      phone: '+79999999999',
      tickets: [{ film: filmId, session: sessionId, row: 2, seat: 4 }],
    };
    const response = await request(app.getHttpServer())
      .post('/api/afisha/order')
      .send(body)
      .expect(200);
    expect(response.body.total).toBe(1);
    expect(response.body.items[0].id).toBeTruthy();
    const schedule = await request(app.getHttpServer())
      .get(`/api/afisha/films/${filmId}/schedule`)
      .expect(200);
    expect(schedule.body.items[0].taken).toContain('2:4');
    await request(app.getHttpServer())
      .post('/api/afisha/order')
      .send(body)
      .expect(400);
  });

  it('serves poster files', async () => {
    await request(app.getHttpServer())
      .get('/content/afisha/bg1s.jpg')
      .expect(200);
  });
});
