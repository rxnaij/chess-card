import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => (
    <div className="mb-8">
        <h1 className="text-3xl font-black mb-4 mr-8 inline-block"><Link to="/">Chess Cyber-Card</Link></h1>
        <p className="font-regular text-opacity-80 inline-block">Create a neat playercard for your Lichess account that you can share on social media.</p>
    </div>
)

export default Header