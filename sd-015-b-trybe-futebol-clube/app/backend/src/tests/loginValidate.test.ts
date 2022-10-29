import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http')
import jwt from 'jsonwebtoken';

import User from '../database/models/User';
import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login/validate', () => {
  const loginMock = {
    "id": 1,
    "username": "Admin",
    "role": "admin",
    "email": "admin@admin.com",
    "password": '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
  // let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(User, 'findOne').resolves(loginMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Deve retornar a string "admin"', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send({
         email: "admin@admin.com",
         password: 'secret_admin'
       });

    const { body, status } = await chai.request(app).get('/login/validate').set({
      Authorization: token
    })

    expect(status).to.be.equal(200);
    expect(body).to.be.equal('admin');


  });

  it('Deve ter a propriedade "message: Token not found"', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send({
         email: "admin@admin.com",
         password: 'secret_admin'
       });

    const { body, status } = await chai.request(app).get('/login/validate').set({
      Authorization: ""
    })

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token not found');


  });

  it('Deve ter a propriedade "message: invalid signature"', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send({
         email: "admin@admin.com",
         password: 'secret_admin'
       });

    const { body, status } = await chai.request(app).get('/login/validate').set({
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjUxMDY2NDUxLCJleHAiOjE2NTE5MzA0NTF9.1j9UBLNqDtBnDa7ry-D-_1RFGMVKsaAzpIuWEAchtX'
    })

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('invalid signature');


  });

  it('Deve ter a propriedade "message: jwt malformed"', async () => {
    const { body: { token } } = await chai.request(app).post('/login').send({
         email: "admin@admin.com",
         password: 'secret_admin'
       });

    const { body, status } = await chai.request(app).get('/login/validate').set({
      Authorization: '5555'
    })

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('jwt malformed');

  });
});
