import React, { useContext } from 'react';
import ContextGeneral from '../context/contextGeneral';
import Button from './button';

export default function Table() {
  const { cart, setCart } = useContext(ContextGeneral);
  const heads = ['Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-Total',
    'Remover Item'];
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <table>
      <thead>
        <tr>
          {heads.map((head, i) => (
            <th
              key={ i }
            >
              {head}

            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cart.map((sale, i) => (
          <tr
            key={ sale.id }
          >
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              {i + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              {sale.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              {sale.quantity}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              {sale.price.toFixed(2).replace('.', ',')}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              {(sale.price * sale.quantity).toFixed(2).replace('.', ',')}
            </td>
            <td>
              <Button
                name="Remover"
                handleClick={ () => removeFromCart(sale.id) }
                className="remove-button"
                dataTestId={ `customer_checkout__element-order-table-remove-${i}` }
                type="button"
              />
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}
