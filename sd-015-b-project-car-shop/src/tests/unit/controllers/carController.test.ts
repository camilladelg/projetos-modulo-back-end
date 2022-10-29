import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import CarModel from '../../../models/CarModel';
import server from '../../../server';
import { Car } from '../../../interfaces/CarInterface';

chai.use(chaiHttp);

const { expect } = chai;

describe('3- Test CarController', () => {
  describe(`3.1 test carController's create method`, () => {
    describe(`3.1.1 If schema is valid `, () => {

      let carModel: CarModel;
      let app = server.app

      const carMock: Car = {
        "model": "Ferrari",
        "year": 1970,
        "color": "black",
        "buyValue": 4000000,
        "seatsQty": 5,
        "doorsQty": 4
      }
    
      before(() => {
        carModel = new CarModel()

        sinon.stub(carModel.model, 'create').resolves(carMock);
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an object equal to carMock and code 201', async() => {
        const { status, body } = await chai.request(app).post('/cars').send(carMock);

        expect(status).to.be.equal(201);
        expect(body).to.be.deep.equal(carMock);
      })
    })
    describe(`3.1.2 If schema is invalid `, () => {

      let carModel: CarModel;
      let app = server.app

      const carMock = { 
        "_id": "4edd40c86762e0fb12000003",
        "model": "Ferrari",
        "year": "1970",
        "color": "black",
        "buyValue": 4000000,
        "seatsQty": 5,
        "doorsQty": 4
      }

      const error = { error: 'year must be a number' }
    
      before(() => {
        carModel = new CarModel()

        sinon.stub(carModel.model, 'create').resolves(carMock)
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an error and code 400', async() => {
        const { status, body } = await chai.request(app).post('/cars').send(carMock);

        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal(error);
      })
    })
    describe(`3.1.3 Error 500 `, () => {

      let carModel: CarModel;
      let app = server.app

      const carMock = { 
        "model": "Ferrari",
        "year": 1970,
        "color": "black",
        "buyValue": 4000000,
        "seatsQty": 5,
        "doorsQty": 4
      }

      const error = { error: 'Internal Server Error' }
    
      before(() => {
        carModel = new CarModel()

        sinon.stub(carModel.model, 'create').rejects(carMock)
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an internal server error and code 500', async() => {
        const {status, body} = await chai.request(app).post('/cars').send(carMock);

        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal(error);
      })
    })
  });
  describe(`3.2 test carController's read method`, () => {
    let carModel: CarModel;
    let app = server.app;

    const carMock = [
      { 
        "_id": "4edd40c86762e0fb12000003",
        "model": "Ferrari",
        "year": 1970,
        "color": "black",
        "buyValue": 4000000,
        "seatsQty": 5,
        "doorsQty": 4
      }
    ]
  
    before(() => {
      carModel = new CarModel()

      sinon.stub(carModel.model, 'find').resolves(carMock as any[])
    });

    after(() => {
      sinon.restore();      
    });

    it('a) Should return an array whith all cars and code 200', async() => {
      const { status, body } = await chai.request(app).get('/cars').send();
      // console.log(status, body)
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(carMock);
    })
  });
  describe(`3.3- test carController's readOne method`, () => {
    describe('3.3.1- Retuns a object equal carMock and code 200', () => {
      let carModel: CarModel;
      let app = server.app;
  
      const carMock = { 
        "_id": "4edd40c86762e0fb12000003",
        "model": "Ferrari",
        "year": 1970,
        "color": "black",
        "buyValue": 4000000,
        "seatsQty": 5,
        "doorsQty": 4
      }
    
      before(() => {
        carModel = new CarModel()
  
        sinon.stub(carModel.model, 'findOne').resolves(carMock as any)
      });
  
      after(() => {
        sinon.restore();      
      });
  
      it('a) Should return an array whith all cars and code 200', async() => {
        const { status, body } = await chai.request(app).get(`/cars/${carMock._id}`).send();
        // console.log(status, body)
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(carMock);
      })
    });
    describe('3.3.2- Retuns a errors', () => {
      let carModel: CarModel;
      let app = server.app;

      const WrongId = '4edd40c86762e0fb1200000'
      const id = '4edd40c86762e0fb12000003'
      const errorIdLength = { error: 'Id must have 24 hexadecimal characters'};
      const internalError = {error: 'Internal Server Error'}
    
      before(() => {
        carModel = new CarModel()
  
        sinon.stub(carModel.model, 'findOne').rejects()
      });
  
      after(() => {
        sinon.restore();      
      });
  
      it('a) Should return an id error and code 400', async() => {
        const { status, body } = await chai.request(app).get(`/cars/${WrongId}`).send();
     
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal(errorIdLength);
      })

      it('b) Should return an internal server error and code 500', async() => {
        const { status, body } = await chai.request(app).get(`/cars/${id}`).send();

        expect(status).to.be.equal(500);
        expect(body).to.be.deep.equal(internalError);
      })
    })


  })
});