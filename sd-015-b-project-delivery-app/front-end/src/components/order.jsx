import React from 'react';
import PropTypes from 'prop-types';

export default function Order({
  id, status, totalPrice, date, onClick }) {
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      <h3
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        {`Pedido:\n ${id}`}
      </h3>
      <h1
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </h1>
      <h3
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        {date}
      </h3>
      <h3
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        {totalPrice}
      </h3>
    </button>
  );
}

Order.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Order.defaultProps = {
  onClick: () => {},
};
