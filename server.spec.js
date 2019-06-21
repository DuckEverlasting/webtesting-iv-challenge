const supertest = require('supertest');

const db = require('./data/dbConfig.js');
const server = require('./server.js');

describe('server', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('GET / (basic test)', () => {
    it('responds 200', async () => {
      await supertest(server)
        .get('/')
        .expect(200);
    });
    
    it('responds api = ALIVE', async () => {
      await supertest(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ api: 'ALIVE' })
      })
    });
  });

  describe('ADD /users', () => {
    it('responds 201', async () => {
      await supertest(server)
        .post('/users')
        .send({ username: 'Jack', department: 'Shipping' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
    })
  })

  describe('REMOVE /users/:id', () => {
    it('responds 204', async () => {
      await supertest(server)
        .post('/users')
        .send({ username: 'Jack', department: 'Shipping' })
        .set('Accept', 'application/json')
      
      await supertest(server)
        .delete('/users/1')
        .expect(204);
    })
  })


})