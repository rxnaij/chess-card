import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

interface FooterProps {
    className?: string,
}

const Footer = ({className}: FooterProps) => (
    <div className="relative bottom-0">
        <div className={classNames(
            "text-sm text-white flex flex-row py-8",
            className
        )}>
            <nav>
                <ul className="flex flex-row flex-wrap space-x-8">
                    <li><Link to="/about">About</Link></li>
                    <li className="text-white text-opacity-50"><a href="https://github.com/rxnaij/chess-card" className="hover:underline">GitHub</a> · Made by <a href="https://github.com/rxnaij" className="hover:underline">@rxnaij</a></li>
                    <li className="text-white text-opacity-50">This app is not affiliated with Lichess.</li>
                </ul>
            </nav>
        </div>
    </div>
)

export default Footer
