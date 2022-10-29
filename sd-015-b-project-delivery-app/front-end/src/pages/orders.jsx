import React from 'react';
import CardOrders from '../templates/cardOrders';
import CardHeader from '../templates/cardHeader';

export default function OrdersPage() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <CardHeader
        userName={ userData.name }
      />
      <CardOrders />
    </>
  );
}
