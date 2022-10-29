import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardHeader from '../templates/cardHeader';
import { getData } from '../helpers/api';
import CardProduct from '../templates/cardProduct';
import PriceSum from '../components/priceSum';
import Button from '../components/button';
import ContextGeneral from '../context/contextGeneral';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { total } = useContext(ContextGeneral);
  const userData = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  useEffect(() => {
    getData('/customer/products', userData.token)
      .then(({ data }) => setProducts(data));
  }, [userData.token]);

  return (
    <main>
      <CardHeader
        userName={ userData.name }
      />

      <section>
        {products && products.map(({ name, urlImage, price, id }) => (
          <CardProduct
            name={ name }
            imageURL={ urlImage }
            price={ +price }
            id={ id }
            key={ id }
          />
        ))}
      </section>

      <Button
        name="Ver Carrinho:"
        handleClick={ () => navigate('/customer/checkout') }
        className="total-price"
        dataTestId="customer_products__button-cart"
        type="button"
        price={
          <PriceSum
            dataTestId="customer_products__checkout-bottom-value"
          />
        }
        disabled={ total <= 0 }
      />
    </main>
  );
}
