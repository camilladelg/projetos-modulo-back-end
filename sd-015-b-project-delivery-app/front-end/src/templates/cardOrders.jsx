import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Order from '../components/order';
import { getData } from '../helpers/api';

export default function CardOrders() {
  const [orders, setOrders] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    async function getSales() {
      const { data } = await getData('/sales', userData.token);
      setOrders(data);
    }
    getSales();
  }, [userData.token]);
  return (
    <div>
      {orders.map((order) => (
        <Order
          key={ order.id }
          id={ order.id }
          status={ order.status }
          totalPrice={ `R$ ${order.totalPrice.replace('.', ',')}` }
          date={ order.saleDate.split('T')[0].split('-').reverse().join('/') }
          onClick={ () => navigate(`/customer/orders/${order.id}`) }
        />
      ))}
    </div>
  );
}
