import React from 'react';
import Footer from './components/Footer/Footer'
import CardCustomization from './components/CardCustomization'
import Description from './components/Description'

export default function App() {
  return (
    <div className="App bg-brand-background text-white min-h-screen pt-8 px-4">
      <div className="container mx-auto text-center mb-8">
        <h1 className="text-6xl font-black mb-4">Chess Cyber-Card</h1>
        <p className="text-2xl font-regular">Create a neat playercard for your Lichess account that you can share on social media.</p>
      </div>
      <div className="container mx-auto">
        <CardCustomization />
        <Description />
      </div>
      <Footer className="" />
    </div>
  );
}
