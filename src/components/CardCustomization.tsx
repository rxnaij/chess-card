// Business logic and types
import React from 'react'
import { CardColorState, CardIconState, Rating }  from '../types'
import { Link } from 'react-router-dom'
import { useLoginCtx } from '../state/LoginContext'
import { useCanvasState, useCanvasReducer } from '../state/CanvasContext'
import { fetchData, removeAccessTokenFromUrl } from '../utils/fetchLogin'

// Custom components
import Canvas from './Canvas/canvas'
import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup'
import { HTMLInputValue } from './RadioButtonGroup/RadioButton'
import RatingSelector from './RatingSelector/RatingSelector'

// Radio button styling
import { colorRadioButton, iconRadioButton, backgroundColorRadioButton, textColorRadioButton } from './RadioButtonGroup/customRadioButtons/customRadioButtons'

// Card customization options
import { cardColorOptions, cardIconOptions, backgroundColorValues } from '../state/options'

const authURL = 'https://chess-card-backend.herokuapp.com/'
// const authURL = 'http://localhost:8000'

// Main card customization component
export default function CardCustomization() {
  const { accessToken, setAccessToken } = useLoginCtx()
  const { 
    user,
    ratings,
    ratingsToRender,
    cardColor,
    icon,
    bg,
    textColor,
    textColorOptions
  } = useCanvasState()
  const dispatch = useCanvasReducer()

  // Resets ratings selector when not logged in
  React.useEffect(() => {
    dispatch({ type: 'update ratings to render', ratingsToRender: [] })
  }, [accessToken, dispatch])

  // Retrieve data when logged in
  React.useEffect(() => {
    // Check for access token
    const token = new URLSearchParams(window.location.search).get('access-token') || null
    if (!accessToken) setAccessToken(token)

    if (accessToken) {
      removeAccessTokenFromUrl()
      fetchData(accessToken, (username: string, ratings: Rating[]) => {
        dispatch({ type: 'update user', user: username })
        dispatch({ type: 'update ratings', ratings: ratings })
      })
    } else {
      dispatch({ type: 'reset' })
    }
  }, [accessToken, setAccessToken, dispatch])

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <div className="flex justify-between items-center self-stretch mb-12">
          {
            accessToken
            ? <div className="font-light text-opacity-80">
                <span className="mr-8">You're logged in as {user}.</span>
                <Link to="/" className="text-blue-400 underline hover:text-blue-300" onClick={() => setAccessToken(null)}>Log out</Link>
              </div>
            : <div className="font-light text-opacity-80">
                <p>You can play around with the card's design here!</p>
                <p><a href={authURL} className="text-blue-400 underline hover:text-blue-300">Log in using your Lichess account</a> to add your username and ratings.</p>
              </div>
          }
        </div>
        <form action="">
          <fieldset className="space-y-10">
            {
              ratings.length > 0 && <RatingSelector 
                ratings={ratings} 
                value={ratingsToRender} 
                onChange={(v: Rating) => {
                  if (ratingsToRender.includes(v)) {
                    dispatch({ type: 'update ratings to render', ratingsToRender: ratingsToRender.filter(toStay => toStay !== v) })
                  } else {
                    dispatch({ type: 'update ratings to render', ratingsToRender: ratingsToRender.concat([v]) })
                  }
                }} 
              />
            }
            <RadioButtonGroup<CardColorState>
              name="cardColor"
              label="Card color"
              values={cardColorOptions}
              onChange={(v: HTMLInputValue) => dispatch({ type: 'update card color', cardColor: cardColorOptions.find(c => c.key === v)!.value })}
              customRadioButton={colorRadioButton}
            />     
            <RadioButtonGroup<CardIconState>
              name="cardIcon"
              label="Icon"
              values={cardIconOptions}
              onChange={(v: HTMLInputValue) => dispatch({ type: 'update icon', icon: cardIconOptions.find(i => i.key === v)!.value })}
              customRadioButton={iconRadioButton}
            />
            <RadioButtonGroup<CardColorState>
              name="cardBackgroundColor"
              label="Background color"
              values={backgroundColorValues}
              onChange={(v: HTMLInputValue) => dispatch({ type: 'update bg', bg: backgroundColorValues.find(c => c.key === v)!.value })}
              customRadioButton={backgroundColorRadioButton}
            />
            <RadioButtonGroup<CardColorState>
              name="textColor"
              label="Text color"
              values={textColorOptions}
              onChange={(v: HTMLInputValue) => dispatch({ type: 'update text color', textColor: textColorOptions.find(c => c.key === v)!.value })}
              customRadioButton={textColorRadioButton}
            />
          </fieldset>
        </form>
      </div>
      <Canvas 
        username={user}
        ratings={ratingsToRender}
        color={cardColor}
        icon={icon}
        bg={bg}
        textColor={textColor}
      />
    </div>
  )
}
