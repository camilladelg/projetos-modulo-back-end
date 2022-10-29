import React from 'react';
import './App.css';
import ProviderGeneral from './provider/providerGeneral';
// import rockGlass from './images/rockGlass.svg';
import Router from './routes/routers';

function App() {
  return (
    <ProviderGeneral>
      <Router />
    </ProviderGeneral>
  );
}

export default App;
