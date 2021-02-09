import React from 'react';
import Routes from './components/routes'
import { LoginContextProvider } from './state/LoginContext'
import { CanvasContextProvider } from './state/CanvasContext'

export default function App() {
  return (
    <LoginContextProvider>
      <CanvasContextProvider>
        <div className="App bg-brand-background text-white min-h-screen">
          <Routes />
        </div>
      </CanvasContextProvider>
    </LoginContextProvider>
  );
}
