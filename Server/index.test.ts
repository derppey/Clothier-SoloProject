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
 test('GET / should not work', async () => {
  const response = await request(server).get('/');
  expect(response.status).toEqual(404);
 });
 test('GET /users should return all users', async () => {
  const res = await request(server).get('/users');
  expect(res.status).toEqual(200);
 })
 test('POST /users should create a user', async () => {
  const addUser = await request(server)
    .post('/users')
    .send({
      "email": "testUser123@gmail.com",
      "password" : "password",
      "firstName" : "TestFirstName",
      "lastName" : "TestLastName",
      "username" : "userName123"
    })
    .expect(201);
  expect(addUser.body).toHaveProperty('primaryKey');
 });
 test('POST /login should login a user with correct login', (done) => {
  request(server)
    .post('/login')
    .send({
      "email": "testUser123@gmail.com",
      "password" : "password"
    })
    .expect(200)
    .then(response => {
      expect(response.body).toHaveProperty('accessToken');
      done();
    })
    .catch(err => done(err));
 });
 test('POST /login should not login a user with incorrect login', (done) => {
   request(server)
    .post('/login')
    .send({
      "email": "testUser123@gmail.com",
      "password" : "ihuhiufsdiuhfihufsd"
    })
    .expect(401)
    .end((err, res) => {
      if(err) return done(err);
      return done();
    })
 })
});