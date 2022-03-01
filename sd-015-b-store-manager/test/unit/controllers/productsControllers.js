const sinon = require('sinon');
const { expect } = require('chai');

const listProductsModel = require('../../../models/listProductsModel');
const listProductsController = require('../../../controllers/listProductsController');
const req = require('express/lib/request');
const res = require('express/lib/response');

describe('CONTROLLERS TESTS PRODUCTS', () => {
  describe('Lista produtos do banco de dados "StoreManager"', () => {
    describe('Quando a lista completa é exibida com sucesso', () => {
      const request = {};
      const response = {};
      let next = () => {};

      const products = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
        }
      ];
  
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(listProductsModel, 'listProducts').resolves(products)
      });
  
      after(() => {
        listProductsModel.listProducts.restore();
      });

      it('É retornado o código 200', async () => {
        await listProductsController.listProducts(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true)
      })

      it('Retorna um array de objetos com as informações dos produtos', async () => {
        await listProductsController.listProducts(request, response, next);

        expect(response.json.calledWith(products)).to.be.equal(true);
      })
    })
    describe('Quando a lista por id é exibida com sucesso', () => {  
      const request = {};
      const response = {};
      let next = () => {};

      const products = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
      ]

      before(() => {
        request.params = 1;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(listProductsModel, 'listProductsById').resolves(products)
      });

      after(() => {
        listProductsModel.listProductsById.restore();
      });

        it('É retornado o código 200', async () => {

          await listProductsController.listProductsById(request, response, next);
  
          expect(response.status.calledWith(200)).to.be.equal(true);
      })
        it('Retorna um objeto referente ao "id" informado', async () => {
          await listProductsController.listProductsById(request, response, next);
          expect(response.json.calledWith(products[0])).to.be.equal(true);
        })
    });
    describe('Quando o id informado não existe', () => {
      const request = {};
      const response = {};
      let next = () => {};

      before(() => {
        request.params = 10;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next =  sinon.stub().returns();
        sinon.stub(listProductsModel, 'listProductsById').resolves([]);
      });

      after(() => {
        listProductsModel.listProductsById.restore();
      });

      it('Retorna o código 404', async() => {
        await listProductsController.listProductsById(request, response, next);

        expect(response.status.calledWith(404)).to.be.equal(true);
      })
      it('Retorna a mensagem "Product not found"', async() => {
        await listProductsController.listProductsById(request, response, next);

        expect(response.json.calledWith({ message: "Product not found" })).to.be.equal(true);
      })
    });    
  })
})