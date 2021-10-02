const request = require('supertest');
const server = require('./index');
beforeAll(async () => {
 // do something before anything else runs
});
// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');

});


describe('basic route tests', () => {
 test('get home route GET /', async () => {
  const response = await request(server).get('/');
  expect(response.status).toEqual(404);
 });
});