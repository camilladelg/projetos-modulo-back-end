import sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/CarService';
import { Car } from '../../../interfaces/CarInterface';


describe('2- Test CarService', () => {
  describe(`2.1 test carService's create method`, () => {
    describe(`2.1.1 If schema is valid `, () => {
      let carService: CarService;

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
        carService = new CarService()
        sinon.stub(carService.model, 'create').resolves(carMock)
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an object equal to carMock', async() => {
        const car = await carService.create(carMock);
        
        expect(car).to.be.deep.equal(carMock);
      })
      it('b) The object must have a "model" property with the value "Ferrari"', async() => {
        const car = await carService.create(carMock) as Car;
        
        expect(car).to.have.a.property('model');
        expect(car.model).to.be.equal('Ferrari');
      })
    })
    describe('2.1.2- If schema is invalid', () => {
      let carService: CarService;

      const carMock = { 
        "_id": "4edd40c86762e0fb12000004",
        "model": "Ferrari",
        "year": "1970",
        "color": "black",
        "buyValue": "4000000",
        "seatsQty": 5,
        "doorsQty": 4
      }
    
      before(() => {
        carService = new CarService()
        sinon.stub(carService.model, 'create').throws(carMock)
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an object equal to carMock', async() => {
        const car = await carService.create(carMock as any) as any;
        
        expect(car.error.name).to.be.equal('ZodError');
      })
    })
  });
  
  describe(`2.2- test carService's read method`, () => {
    let carService: CarService;

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
      carService = new CarService();
      sinon.stub(carService.model, 'read').resolves(carMock)
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an array of objects equal to carMock', async() =>{
      const car = await carService.read();

      expect(car).to.be.deep.equal(carMock);
    });
    it('b) The object must have an object with "model" property with the value "Ferrari"', async() => {
      const car = await carService.read();

      expect(car[0]).to.have.a.property('model');
      expect(car[0].model).to.be.equal('Ferrari');
    })
  })
  describe(`2.3- test carService's readOne method`, () => {
    let carService: CarService;

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
      carService = new CarService();
      sinon.stub(carService.model, 'readOne').resolves(carMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an objects equal to carMock', async() =>{
      const car = await carService.readOne(carMock._id);

      expect(car).to.be.deep.equal(carMock);
    });
    it('b) The object must have an "model" property with the value "Ferrari"', async() => {
      const car = await carService.readOne(carMock._id) as Car;

      expect(car).to.have.a.property('model');
      expect(car.model).to.be.equal('Ferrari');
    })
  });
  describe(`2.4- test carService's update method`, () => {
    describe('2.4.1- if schema is valid', () => {
      let carService: CarService;

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
        carService = new CarService();
        sinon.stub(carService.model, 'update').resolves(udatedCarMock as any);
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an objects equal to carMock', async() =>{
        const car = await carService.update(udatedCarMock._id, udatedCarMock);
  
        expect(car).to.be.deep.equal(udatedCarMock);
      });
      it('b) The object must have an "model" property with the value "Fiat Uno"', async() => {
        const car = await carService.update(udatedCarMock._id, udatedCarMock) as Car;
  
        expect(car).to.have.a.property('model');
        expect(car.model).to.be.equal('Fiat Uno');
      });
    })
    describe('2.4.2- if schema is invalid', () => {
      let carService: CarService;

      const carMock = { 
        "_id": "4edd40c86762e0fb12000004",
        "model": "Ferrari",
        "year": "1970",
        "color": "black",
        "buyValue": "4000000",
        "seatsQty": 5,
        "doorsQty": 4
      }
    
      before(() => {
        carService = new CarService()
        sinon.stub(carService.model, 'update').throws(carMock)
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('a) Should return an object equal to carMock', async() => {
        const car = await carService.update(carMock._id, carMock as any) as any;
        
        expect(car.error.name).to.be.equal('ZodError');
      })
    })
  });
  describe(`2.5- test carService's delete method`, () => {
    let carService: CarService;

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
      carService = new CarService();
      sinon.stub(carService.model, 'delete').resolves(carMock);
    });

    after(() => {
      sinon.restore();
    });

    it('a) Should return an objects equal to carMock', async() =>{
      const car = await carService.delete(carMock._id);

      expect(car).to.be.equal(carMock);
    });
  });
})