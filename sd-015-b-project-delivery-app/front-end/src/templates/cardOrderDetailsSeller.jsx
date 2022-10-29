import React from 'react';
import PropTypes from 'prop-types';

export default function OrderDetailsSeller(props) {
  const {
    id,
    date,
    status,
    products,
    totalPrice,
    dataTestIdStatus,
    handleClick,
    disabledDispatch,
    disabledPreparing,
  } = props;
  const heads = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-Total',
  ];
  if (id) {
    return (
      <section>
        <div>
          <h1 data-testid="seller_order_details__element-order-details-label-order-id">
            {id}
          </h1>
          <h1
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {date}
          </h1>
          <h1 data-testid={ dataTestIdStatus }>{status}</h1>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            onClick={ handleClick }
            disabled={ disabledPreparing }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            onClick={ handleClick }
            disabled={ disabledDispatch }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
        <table>
          <thead>
            <tr>
              {heads.map((head, i) => (
                <th key={ i }>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={ product.id }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${i}`
                  }
                >
                  {i + 1}
                </td>
                <td
                  data-testid={ `seller_order_details__element-order-table-name-${i}` }
                >
                  {product.name}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${i}`
                  }
                >
                  {product.SalesProduct.quantity}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${i}`
                  }
                >
                  {(1 * product.price).toFixed(2).replace('.', ',')}
                </td>
                <td
                  data-testid={ `seller_order_details__element-order-total-price-${i}` }
                >
                  {(Number(product.price) * product.SalesProduct.quantity)
                    .toFixed(2)
                    .replace('.', ',')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 data-testid="seller_order_details__element-order-total-price">
          {`Total: R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}`}
        </h1>
      </section>
    );
  }
  return <h1>Sem retorno</h1>;
}

OrderDetailsSeller.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  disabledDispatch: PropTypes.func.isRequired,
  disabledPreparing: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      SalesProducts: PropTypes.objectOf(PropTypes.number),
    }),
  ).isRequired,
  dataTestIdStatus: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
