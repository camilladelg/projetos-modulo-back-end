const sinon = require('sinon');
const { expect } = require('chai');

const listSalesModel = require('../../../models/listSalesModel');
const listSalesController = require('../../../controllers/listSalesController');

describe('CONTROLLERS TESTS SALES', () => {
  describe('Lista produtos do banco de dados "StoreManager', () => {
    describe('Quando a lista completa é exibida com sucesso', () => {
      const request = {};
      const response = {};
      let next = () => {};

      const sales = [
        {
          "saleId": 1,
          "productId": 1,
          "quantity": 5,
          "date": "2022-02-24T00:00:01.000Z"
        },
        {
          "saleId": 1,
          "productId": 2,
          "quantity": 10,
          "date": "2022-02-24T00:00:01.000Z"
        },
        {
          "saleId": 2,
          "productId": 3,
          "quantity": 15,
          "date": "2022-02-24T00:00:01.000Z"
        }
      ];

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(listSalesModel, 'listSales').resolves(sales);
      });

      after(() => {
        listSalesModel.listSales.restore();
      });

      it('É retornado o código 200', async () => {
        await listSalesController.listSales(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true)
      });

      it('Retorna um array de objetos com as informações dos produtos', async () => {
        await listSalesController.listSales(request, response, next);

        expect(response.json.calledWith(sales)).to.be.equal(true);
      })

    });
    describe('Quando a lista por id é exibida com sucesso', () => {
      const request = {};
      const response = {};
      let next = () => {};

      const sales = [
        {
          "productId": 1,
          "quantity": 5,
          "date": "2022-02-24T00:00:01.000Z"
        },
        {
          "productId": 2,
          "quantity": 10,
          "date": "2022-02-24T00:00:01.000Z"
        }
      ]

      before(() => {
        request.params = 1;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(listSalesModel, 'listSalesById').resolves(sales);
      });

      after(() => {
        listSalesModel.listSalesById.restore();
      });

      it('É retornado o código 200', async () => {

        await listSalesController.listSalesById(request, response, next);

        expect(response.status.calledWith(200)).to.be.equal(true);
      })
      
      it('Retorna um array de objetos referente ao "id" informado', async() => {
        await listSalesController.listSalesById(request, response, next);

        expect(response.json.calledWith(sales)).to.be.equal(true);
      })

    })
    describe('Quando o id informado não existe', () => {
      const request = {};
      const response = {};
      let next = () => {};

      before(() => {
        request.params = 10;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(listSalesModel, 'listSalesById').resolves([])
      });

      after(() => {
        listSalesModel.listSalesById.restore();
      });

      it('Retorna o código 404', async() => {
        await listSalesController.listSalesById(request, response, next);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('Retorna a mensagem "Sale not found"', async() => {
        await listSalesController.listSalesById(request, response, next);

        expect(response.json.calledWith({ message: "Sale not found" })).to.be.equal(true);
      })
    })
  })
})