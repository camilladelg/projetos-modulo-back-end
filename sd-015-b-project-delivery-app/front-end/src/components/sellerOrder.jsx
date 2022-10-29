import React from 'react';
import PropTypes from 'prop-types';

export default function SellerOrder({
  id, status, totalPrice, date, onClick, address }) {
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      <h3
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        {`Pedido:\n ${id}`}
      </h3>
      <h1
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        {status}
      </h1>
      <h3
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        {date}
      </h3>
      <h3
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        {totalPrice}
      </h3>

      <h4>
        {address}
      </h4>
    </button>
  );
}

SellerOrder.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  address: PropTypes.string.isRequired,
};

SellerOrder.defaultProps = {
  onClick: () => {},
};
