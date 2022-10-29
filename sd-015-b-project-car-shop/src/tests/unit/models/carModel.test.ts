import sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import { Car } from '../../../interfaces/CarInterface';

describe('1- Test CarModel', () => {
  describe(`1.1 test carModel's create method`, () => {
    let carModel: CarModel;

    const carMock = { 
      "_id": "4edd40c86762e0fb12000004",
      "model": "Ferrari",
      "year": 1970,
      "color": "black",
      "buyValue": 4000000,
      "seatsQty": 5,
      "doorsQty": 4
    }
  
    before(() => {
      carModel = new CarModel()
      sinon.stub(carModel.model, 'create').resolves(carMock)
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an object equal to carMock', async() => {
      const car = await carModel.create(carMock);
      
      expect(car).to.be.deep.equal(carMock);
    })
    it('b) The object must have a "model" property with the value "Ferrari"', async() => {
      const car = await carModel.create(carMock);
      
      expect(car).to.have.a.property('model');
      expect(car.model).to.be.equal('Ferrari');
    })
  });
  describe(`1.2- test carModel's read method`, () => {
    let carModel: CarModel;

    const carMock= [
        {         
        _id: "4edd40c86762e0fb12000004",
        model: "Ferrari",
        year: 1970,
        color: "black",
        buyValue: 4000000,
        seatsQty: 5,
        doorsQty: 4
      }
    ]
    before(() => {      
      carModel = new CarModel();
      sinon.stub(carModel.model, 'find').resolves(carMock as any)
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an array of objects equal to carMock', async() =>{
      const car = await carModel.read();

      expect(car).to.be.deep.equal(carMock);
    });
    it('b) The object must have an object with "model" property with the value "Ferrari"', async() => {
      const car = await carModel.read();

      expect(car[0]).to.have.a.property('model');
      expect(car[0].model).to.be.equal('Ferrari');
    })
  })
  describe(`1.3- test carModel's readOne method`, () => {
    let carModel: CarModel;

    const carMock= {         
      _id: "4edd40c86762e0fb12000004",
      model: "Ferrari",
      year: 1970,
      color: "black",
      buyValue: 4000000,
      seatsQty: 5,
      doorsQty: 4
    }
    before(() => { 
    carModel = new CarModel();
      sinon.stub(carModel.model, 'findOne').resolves(carMock as any);
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an objects equal to carMock', async() =>{
      const car = await carModel.readOne(carMock._id);

      expect(car).to.be.deep.equal(carMock);
    });
    it('b) The object must have an "model" property with the value "Ferrari"', async() => {
      const car = await carModel.readOne(carMock._id) as Car;

      expect(car).to.have.a.property('model');
      expect(car.model).to.be.equal('Ferrari');
    })
  });
  describe(`1.4- test carModel's update method`, () => {
    let carModel: CarModel;

    const udatedCarMock= {
      "_id": "4edd40c86762e0fb12000003",
      "model": "Fiat Uno",
      "year": 1963,
      "color": "blue",
      "buyValue": 3500,
      "seatsQty": 4,
      "doorsQty": 4
    }

    before(() => { 
    carModel = new CarModel();
      sinon.stub(carModel.model, 'findOneAndUpdate').resolves(udatedCarMock as any);
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an objects equal to carMock', async() =>{
      const car = await carModel.update(udatedCarMock._id, udatedCarMock);

      expect(car).to.be.deep.equal(udatedCarMock);
    });
    it('b) The object must have an "model" property with the value "Fiat Uno"', async() => {
      const car = await carModel.update(udatedCarMock._id, udatedCarMock) as Car;

      expect(car).to.have.a.property('model');
      expect(car.model).to.be.equal('Fiat Uno');
    })
  });
  describe(`1.5- test carModel's delete method`, () => {
    let carModel: CarModel;

    const carMock= {
      "_id": "4edd40c86762e0fb12000003",
      "model": "Fiat Uno",
      "year": 1963,
      "color": "blue",
      "buyValue": 3500,
      "seatsQty": 4,
      "doorsQty": 4
    }

    before(() => { 
    carModel = new CarModel();
      sinon.stub(carModel.model, 'findOneAndDelete').resolves(carMock as any);
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an objects equal to carMock', async() =>{
      const car = await carModel.delete(carMock._id);

      expect(car).to.be.equal(carMock);
    });
  });
})