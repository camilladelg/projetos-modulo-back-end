import React from 'react';
import CardSellerOrders from '../templates/cardSellerOrders';
import CardHeader from '../templates/cardHeader';

export default function SellerOrdersPage() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <CardHeader
        userName={ userData.name }
      />
      <CardSellerOrders />
    </>
  );
}
