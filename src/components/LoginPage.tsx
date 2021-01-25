import React from 'react'
import requestAuth from './oauthConfig'

export default function LoginPage() {
    React.useEffect(() => {
        requestAuth()
    }, [])
    return (
        <div>
            <p>
                Log in to your Lichess account
            </p>
        </div>
    )
}
