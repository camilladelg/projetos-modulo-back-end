import React from 'react';
import CardHeader from '../templates/cardHeader';
import CardSaleDetails from '../templates/cardSaleDetails';

export default function OrderDetails() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <CardHeader
        userName={ userData.name }
      />
      <CardSaleDetails />
    </>
  );
}
