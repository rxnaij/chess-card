import { ReactNode, createContext, useContext, useReducer } from 'react'
import { RadioValue } from '../components/RadioButtonGroup/RadioButton'
import { CardColorState, CardIconState, Rating } from '../types'
import { cardColorOptions, cardIconOptions, backgroundColorValues, getTextColorOptions } from './options'

// State

// State typing
interface CanvasState {
    user: string,
    ratings: Rating[],
    ratingsToRender: Rating[],

    cardColor: CardColorState,
    icon: CardIconState,
    bg: CardColorState,
    textColor: CardColorState
    textColorOptions: RadioValue<CardColorState>[]
}

const initialState: CanvasState = {
    user: 'your-username',
    ratings: [],
    ratingsToRender: [],

    cardColor: cardColorOptions[0].value,
    icon: cardIconOptions[0].value,
    bg: backgroundColorValues[0].value,
    textColor: '#EFEFEF',
    textColorOptions: getTextColorOptions(cardColorOptions[0].value, backgroundColorValues[0].value)
}

// Reducer

// Action types
type Action = 
    | { type: 'update user', user: string }
    | { type: 'update ratings', ratings: Rating[] }
    | { type: 'update ratings to render', ratingsToRender: Rating[] }
    | { type: 'update card color', cardColor: CardColorState } 
    | { type: 'update icon', icon: CardIconState }
    | { type: 'update bg', bg: CardColorState }
    | { type: 'update text color', textColor: CardColorState }
    | { type: 'reset' }

// Reducer function
const canvasStateReducer = (state: CanvasState, action: Action): CanvasState => {
    switch (action.type) {

    case 'update user':
        return {
             ...state, 
             user: action.user
        }
    case 'update ratings':
        return {
            ...state,
            ratings: action.ratings
        }
    case 'update ratings to render':
        return {
            ...state,
            ratingsToRender: action.ratingsToRender
        }
    case 'update card color': {
        const newTextColorOptions = getTextColorOptions(action.cardColor, state.bg)
        return {
            ...state,
            cardColor: action.cardColor,
            textColor: newTextColorOptions.find(c => c.key === 'default')!.value,
            textColorOptions: newTextColorOptions
        }
    }
    case 'update icon':
        return {
            ...state,
            icon: action.icon
        }
    case 'update bg': {
        const newTextColorOptions = getTextColorOptions(state.cardColor, action.bg)
        return {
            ...state,
            bg: action.bg,
            textColor: newTextColorOptions.find(c => c.key === 'default')!.value,
            textColorOptions: newTextColorOptions
        }
    }
    case 'update text color':
        return {
            ...state,
            textColor: action.textColor
        }
    
    case 'reset':
        return initialState
    default:
        return state

    }
}

// Context

// Initialize context type

// Create context
const CanvasCtx = createContext<{
    state: CanvasState,
    dispatch: React.Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null
})
CanvasCtx.displayName = 'CanvasContext'

// State management hooks

export function useCanvasState() {
    return useContext(CanvasCtx)!.state
}

export function useCanvasReducer() {
    return useContext(CanvasCtx)!.dispatch
}

// Context provider component

interface CanvasContextProps {
    children: ReactNode
}

export function CanvasContextProvider({children}: CanvasContextProps) {
    const [state, dispatch] = useReducer(canvasStateReducer, initialState)
    return (
        <CanvasCtx.Provider value={{ state, dispatch }}>
            {children}
        </CanvasCtx.Provider>
    )
}
