const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const lisProductsModel = require('../../../models/listProductsModel');
const { object } = require('joi');

describe('MODEL TESTS PRODUCTS', () => {
  describe('Lista produtos do banco de dados "StoreManager"', () => {
    const products = [
      [
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
      ]
    ];

    describe('Quando a lista completa é exibida com sucesso', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(products);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Retorna um array de objetos com as informações dos produtos', async() => {
        const modelsResponse = await lisProductsModel.listProducts();
        expect(modelsResponse).to.be.an('array');
        expect(modelsResponse).to.be.have.length(3);
        expect(modelsResponse).to.be.deep.equal(products[0])
      })

    });

    describe('Quando a lista por id é exibida com sucesso', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves(products);
      });

      after(() => {
        connection.execute.restore();
      });

        it('Retorna um array com o objeto referente ao "id" informado', async () => {
          const modelsResponse = await lisProductsModel.listProductsById(1)

          expect(modelsResponse).to.be.an('array');
        })
      });

      describe('Lista o novo produto', () => {
        describe('Quando o produto é cadastrado com sucesso', () => {
          const product = {
            "id": 4,
            "name": "Armadura Homem de Ferro",
            "quantity": 10
          }
  
          before(() => {
            sinon.stub(connection, 'execute').resolves([{insertId: product.id}]);
          });
    
          after(() => {
            connection.execute.restore();
          });
          it('Retorna um objeto com as informações do produto', async() => {
            const result = await lisProductsModel.addProducts(product.name, product.quantity);

            expect(result).to.be.an('object');
            expect(result).to.be.deep.equal(product);
          })
        });
      });
      describe('Atualização de um produto', () => {
        describe('Quando o produto é atualizado com sucesso', () => {
          const product = {
            "id": 1,
            "name": "Armadura Homem de Ferro",
            "quantity": 10
          }
          const {id, name, quantity} = product

          before(() => {
            sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
          });
          after(() => {
            connection.execute.restore();
          });

          it('Retorna um objeto', async() => {
            const result = await lisProductsModel.updateProduct(id, name, quantity);
            expect(result).to.be.an('object');
            expect(result).to.be.deep.equal({affectedRows: 1});
          })
        })
      });
      describe('Quando um produto é deletado', () => {
        describe('Quando o produto é deletado com sucesso', () => {
          const product = {
            "id": 1,
            "name": "Armadura Homem de Ferro",
            "quantity": 10
          }
          const {id, name, quantity} = product;

          before(() => {
            sinon.stub(connection, 'execute').resolves([{affectedRows: 1}]);
          });
          after(() => {
            connection.execute.restore();
          });

          it('Retorna um objeto', async() => {
            const result = await lisProductsModel.deleteProduct(id, name, quantity);
            expect(result).to.be.an('object');
            expect(result).to.be.deep.equal({affectedRows: 1});
          })
        })
      })
  });
});