import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => (
    <div className="mb-6 bg-gray-800 min-w-full py-6 shadow-md">
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-black mr-8 hover:text-opacity-80"><Link to="/">Chess Cyber-Card</Link></h1>
            <p className="font-light text-opacity-20 leading-5">Create a neat playercard for your Lichess account that you can share on social media.</p>
        </div>
    </div>
)

export default Header