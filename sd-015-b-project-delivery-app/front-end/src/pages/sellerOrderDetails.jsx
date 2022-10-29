import React from 'react';
import CardHeader from '../templates/cardHeader';
import CardSellerOrdersDetails from '../templates/cardSellerOrdersDetails';

export default function SellerOrderDetailsPage() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <CardHeader
        userName={ userData.name }
      />
      <CardSellerOrdersDetails />
    </div>
  );
}
