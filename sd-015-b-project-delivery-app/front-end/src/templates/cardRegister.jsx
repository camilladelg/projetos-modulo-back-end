import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TextInput from '../components/textInput';
import Button from '../components/button';
import { postRequest } from '../helpers/api';

export default function CardRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);

  function disabled() {
    const re = /\S+@\S+\.\S+/;
    const validEmail = re.test(email);
    const SIX = 6;
    const TWELVE = 12;

    if (validEmail && password.length >= SIX && name.length >= TWELVE) {
      return false;
    }
    return true;
  }

  const registerClick = async (event) => {
    event.preventDefault();

    try {
      await postRequest('/register', { name, email, password });
      const { data } = await postRequest('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data.userData));
      setIsLogged(true);
    } catch (error) {
      setFailedLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => setFailedLogin(false), [email, password, setFailedLogin]);

  if (isLogged) return <Navigate to="/customer/products" />;

  return (
    <section>
      <form>
        <TextInput
          name="name"
          type="text"
          value={ name }
          placeholder="Nome"
          labelText="Nome: "
          onChange={ ({ target }) => setName(target.value) }
          dataTestId="common_register__input-name"
          className="aaaaaa"
        />
        <TextInput
          name="email"
          type="email"
          value={ email }
          placeholder="Email"
          labelText="Email: "
          onChange={ ({ target }) => setEmail(target.value) }
          dataTestId="common_register__input-email"
          className="aaaaaa"
        />
        <TextInput
          name="password"
          type="password"
          value={ password }
          placeholder="Password"
          labelText="Senha: "
          onChange={ ({ target }) => setPassword(target.value) }
          dataTestId="common_register__input-password"
          className="aaaaaa"

        />
        <Button
          handleClick={ registerClick }
          name="register"
          className=""
          disabled={ disabled() }
          type="submit"
          dataTestId="common_register__button-register"
        />
        {
          failedLogin && (
            <p data-testid="common_register__element-invalid_register">
              Dados inválidos!
            </p>
          )
        }
      </form>
    </section>
  );
}
