// const sinon =  require('sinon');
// const { expect } = require('chai');

// const listProductsModel = require('../../../models/listProductsModel');
// const lisProductsService = require('../../../services/listProductsService');

// describe('SERVICES TESTS PRODUCTS', () => {
//   describe('Lista produtos do banco de dados "StoreManager"', () => {
//     const products = [
//       {
//         "id": 1,
//         "name": "Martelo de Thor",
//         "quantity": 10
//       },
//       {
//         "id": 2,
//         "name": "Traje de encolhimento",
//         "quantity": 20
//       },
//       {
//         "id": 3,
//         "name": "Escudo do Capitão América",
//         "quantity": 30
//       }
//     ];

//     describe('Quando a lista completa é exibida com sucesso', () => {
//       before(() => {
//         sinon.stub(listProductsModel, 'listProducts').resolves(products);
//       });
  
//       after(() => {
//         listProductsModel.listProducts.restore();
//       });
//       it('Retorna um array de objetos com as informações dos produtos', async () => {
//         const serviseResponse = await lisProductsService.listProducts();
//         expect(serviseResponse).to.be.an('array');
//         expect(serviseResponse).to.have.length(3);
//         expect(serviseResponse).to.be.deep.equal(products)
//       })
//     })
//     describe('Quando a lista por id é exibida com sucesso', () => {

//       before(() => {
//         sinon.stub(listProductsModel, 'listProductsById').resolves(products);
//       });
  
//       after(() => {
//         listProductsModel.listProductsById.restore();
//       });
  
//       it('Retorna um array com o objeto referente ao "id" informado', async() => {
//         const serviseResponse = await lisProductsService.listProductsById(1);
//         expect(serviseResponse).to.be.an('array');
//       })
//     })
//   })
// })