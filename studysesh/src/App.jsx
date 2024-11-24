import React from 'react';
import { useState, createContext } from 'react';
import './App.css';
import LoginPage from './LoginPage';
import PetPage from './PetPage';

export const PageContext = createContext();

function App() {
  const [page, setPage] = useState('Login');

  function renderPage() {
    console.log('Current context: ', { page });
    if (page === 'PetPage') {
      return <PetPage />;
    }
     else return <LoginPage />;
  };

  return (
      <div className="App">
        <PageContext.Provider value={{page, setPage}}>
          { renderPage() }
        </PageContext.Provider>
      </div>
  );
}

export default App;