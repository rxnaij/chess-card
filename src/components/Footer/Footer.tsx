import React from 'react'
import classNames from 'classnames'

interface FooterProps {
    className?: string,
}

const Footer = ({className}: FooterProps) => {
    return (
        <div className="container mx-auto relative bottom-0">
            <div className={classNames(
                "text-sm text-white flex flex-row py-8",
                className
            )}>
                <nav>
                    <ul className="flex flex-row space-x-8">
                        <li>About</li>
                        <li>Privacy</li>
                        <li>Asset credits</li>
                        <li className="text-white text-opacity-50">Made by @rxnaij</li>
                        <li className="text-white text-opacity-50">This app is not affiliated with lichess.org.</li>
                    </ul>
                </nav>
            </div>
        </div>
        
    )
}

export default Footer
