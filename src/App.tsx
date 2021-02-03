import React from 'react';
import Routes from './components/routes'
import { LoginContextProvider } from './state/LoginContext'

export default function App() {
  return (
    <LoginContextProvider>
      <div className="App bg-brand-background text-white min-h-screen">
        <Routes />
      </div>
    </LoginContextProvider>
  );
}
