import { createContext, useState, ReactNode, useContext } from 'react'

// Login state

interface LoginState {
    accessToken: string | null,
    setAccessToken: (token: string | null) => void
}

// placeholder state values for initialization
const initialState: LoginState = {
    accessToken: null,
    setAccessToken: (val: string | null) => console.warn("No access token state")
}

// Login context object

const LoginCtx = createContext<LoginState>(initialState)
LoginCtx.displayName = 'LoginContext'

export const useLoginCtx = () => useContext(LoginCtx)

// Login context provider

interface LoginContextProps {
    children: ReactNode
}

export function LoginContextProvider({children}: LoginContextProps) {
    const [ accessToken, setAccessToken ] = useState<string | null>(null)
    return(
        <LoginCtx.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </LoginCtx.Provider>
    )
}