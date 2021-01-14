import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => (
    <div className="container mx-auto text-center mb-8">
        <h1 className="text-6xl font-black mb-4"><Link to="/">Chess Cyber-Card</Link></h1>
        <p className="text-2xl font-regular">Create a neat playercard for your Lichess account that you can share on social media.</p>
    </div>
)

export default Header