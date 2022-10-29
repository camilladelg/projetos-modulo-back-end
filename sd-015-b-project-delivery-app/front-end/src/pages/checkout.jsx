import React from 'react';
import CardAddress from '../templates/cardAddress';
import CardCheckout from '../templates/cardCheckout';
import CardHeader from '../templates/cardHeader';

export default function Checkout() {
  const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <CardHeader
        userName={ userData.name }
      />
      <CardCheckout />
      <CardAddress />
    </>
  );
}
