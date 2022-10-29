import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/button';

export default function CardHeader({ userName }) {
  // const [showProduts, setShowProduts] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </Link>
        {/* {showProduts && } */}
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {userName}
        </p>
        <Button
          dataTestId="customer_products__element-navbar-link-logout"
          type="button"
          name="sair"
          className="button-exit"
          handleClick={ () => logout() }
        />
      </nav>
    </header>
  );
}

CardHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};
