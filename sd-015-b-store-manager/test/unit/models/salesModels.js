const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const listSalesModel = require('../../../models/listSalesModel');

describe('MODEL TESTS SALES', () => {
  describe('Lista as vendas do banco de dados "StoreManager"', () => {
    describe('Quando a lista completa é exibida com sucesso', () => {
      const sales = [
        [
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
        ]
      ];
      before(() => {
        sinon.stub(connection, 'execute').resolves(sales);
      });

      after(() => {
        connection.execute.restore();
      })

      it('Retorna um array de objetos com as informações das vendas', async () => {
        const modelSucess = await listSalesModel.listSales();
  
        expect(modelSucess).to.be.an('array');
      })
    })
    describe('Quando a lista por id é exibida com sucesso', () => {
      const sales = [
        [
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
      ]
      before(() => {
        sinon.stub(connection, 'execute').resolves(sales);
      });

      after(() => {
        connection.execute.restore();
      })
      
      it('Retorna um array com o objeto referente ao "id" informado', async () => {
        const modelSucess = await listSalesModel.listSalesById(1);

        expect(modelSucess).to.be.an('array');
        expect(modelSucess).to.be.deep.equal(sales[0]);
      })
    })
  })
})