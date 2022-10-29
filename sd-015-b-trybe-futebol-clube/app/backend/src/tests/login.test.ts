import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http')
import jwt from 'jsonwebtoken';

import User from '../database/models/User';
import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  describe('Login com usuário encontrado', () => {
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

    it('O usuário consegue se logar', async () => {
      const { body, status } = await chai.request(app).post('/login').send({
          email: "admin@admin.com",
          password: 'secret_admin'
        });

      expect(status).to.be.equal(200);
      expect(body).to.have.property('token')
    });

    it(`O usuário não consegue se logar (senha incorreta),
    exibe a menssagem "Incorrect email or password"`, async () => {
      const { body, status } = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: 'incorrect_password'
      });

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('Incorrect email or password')
    });

    it(`O usuário não consegue se logar (email vazio), 
    exibe a menssagem "All fields must be filled"`, async () => {
      const { body, status } = await chai.request(app).post('/login').send({
        email: "",
        password: 'secret_admin'
      });

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('All fields must be filled')
    });
  });
  // describe('Login sem o usuário encontrado', () => {
  //   const loginMock2 = {}

  //   before(() => {
  //     sinon.stub(User, 'findOne').resolves(loginMock2 as User);
  //   });

  //   after(()=>{
  //     (User.findOne as sinon.SinonStub).restore();
  //   });

  //   it('Retorna a mensagem "User not found"', async () => {
  //     const { body, status } = await chai.request(app).post('/login').send({
  //         email: "admin@admin.com",
  //         password: 'secret_admin'
  //       });
  //     console.log("usuário não encontrado", body)
  //     expect(status).to.be.equal(401);
  //     expect(body.message).to.be.equal('User not found')
  //   });

  // })
})
