// const sinon = require('sinon');
// const { expect } = require('chai');

// const listSalesModel = require('../../../models/listSalesModel');
// const listSalesService = require('../../../services/listSalesService');

// describe('SERVICES TESTS SALES', () => {
//   describe('Lista as vendas do banco de dados "StoreManager"', () => {
//     describe('Quando a lista completa é exibida com sucesso', () => {
//       const sales = [
//         [
//           {
//             "saleId": 1,
//             "productId": 1,
//             "quantity": 5,
//             "date": "2022-02-24T00:00:01.000Z"
//           },
//           {
//             "saleId": 1,
//             "productId": 2,
//             "quantity": 10,
//             "date": "2022-02-24T00:00:01.000Z"
//           },
//           {
//             "saleId": 2,
//             "productId": 3,
//             "quantity": 15,
//             "date": "2022-02-24T00:00:01.000Z"
//           }
//         ]
//       ];

//       before(() => {
//         sinon.stub(listSalesModel, 'listSales').resolves(sales);
//       });

//       after(() => {
//         listSalesModel.listSales.restore();
//       })

//       it('Retorna um array de objetos com as informações das vendas', async () => {
//         const [serviceResponse] = await listSalesService.listSales();

//         expect(serviceResponse).to.be.an('array');
//         expect(serviceResponse).to.have.length(3);
//       })
//     });
//     describe('Quando a lista por id é exibida com sucesso', () => {
//       const sales = [
//         [
//           {
//             "productId": 1,
//             "quantity": 5,
//             "date": "2022-02-24T00:00:01.000Z"
//           },
//           {
//             "productId": 2,
//             "quantity": 10,
//             "date": "2022-02-24T00:00:01.000Z"
//           }
//         ]
//       ];

//       before(() => {
//         sinon.stub(listSalesModel, 'listSalesById').resolves(sales);
//       });

//       after(() => {
//         listSalesModel.listSalesById.restore();
//       });

//       it('Retorna um array com o objeto referente ao "id" informado', async() => {
//         const serviceResponse = await listSalesModel.listSalesById(1);

//         expect(serviceResponse).to.be.an('array');
//         expect(serviceResponse).to.be.deep.equal(sales);
//       })
//     });
//   })
// })