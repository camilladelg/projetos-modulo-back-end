import React from 'react';
import Table from '../components/table';
import PriceSum from '../components/priceSum';

export default function CardCheckout() {
  return (
    <section>
      <Table />
      <PriceSum
        dataTestId="customer_checkout__element-order-total-price"
      />
    </section>
  );
}
