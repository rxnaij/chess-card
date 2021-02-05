// Business logic and types
import React, { useState } from 'react'
import { CardColorState, CardIconState, Rating }  from '../types'
import { Link } from 'react-router-dom'
import { useLoginCtx } from '../state/LoginContext'
import { removeAccessTokenFromUrl } from '../utils/fetchLogin'

// Custom components
import Canvas from './Canvas/canvas'
import Button from './TextInput/Button'
import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup'
import { HTMLInputValue } from './RadioButtonGroup/RadioButton'
import RatingSelector from './RatingSelector/RatingSelector'

// Radio button styling
import { colorRadioButton, iconRadioButton, backgroundColorRadioButton, textColorRadioButton } from './RadioButtonGroup/customRadioButtons/customRadioButtons'

// Card customization options
import { cardColorOptions, cardIconOptions, backgroundColorValues, getTextColorOptions } from '../state/options'

// const authURL = 'https://chess-card-backend.herokuapp.com/'
const authURL = 'http://localhost:8000'

// Main card customization component
export default function CardCustomization() {
  const { accessToken, setAccessToken } = useLoginCtx()

  // Card data states
  const [user, setUser] = useState('')
  const [ratings, setRatings] = useState<Rating[]>([])
  const [ratingsToRender, setRatingsToRender] = useState<Rating[]>([])

  // Card canvas customization states
  const [cardColor, setCardColor] = useState<CardColorState>(cardColorOptions[0].value)
  const [cardIcon, setCardIcon] = useState<CardIconState>(cardIconOptions[0].value)
  const [bg, setBg] = useState<CardColorState>(backgroundColorValues[0].value)
  const [textColorValues, setTextColorValues] = useState(getTextColorOptions(
    cardColorOptions[0].value,
    backgroundColorValues[0].value
  ))
  const [textColor, setTextColor] = useState<CardColorState>('#EFEFEF')

  // Updates text color options based on current card and bg color
  React.useEffect(() => {
    const newColors = getTextColorOptions(cardColor, bg)
    const newDefault = newColors.find(c => c.key === 'default')!.value
    setTextColorValues(newColors)
    if (cardColor !== newDefault) setTextColor(newDefault)
  }, [cardColor, bg])

  // Resets ratings selector when not logged in
  React.useEffect(() => {
    setRatingsToRender([])
  }, [accessToken])

  // Retrieve data when logged in
  React.useEffect(() => {
    // Check for access token
    const token = new URLSearchParams(window.location.search).get('access-token') || null
    if (!accessToken) setAccessToken(token)

    // Retrieve account data
    async function fetchData() {
      const user = await fetch('https://lichess.org/api/account', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => res.json())
      try {
        const { username, perfs } = user
        const newRatings: Rating[] = Object.getOwnPropertyNames(perfs)
          .filter(p => perfs[p].games > 0)
          .map((p: string) => ({
            name: p,
            points: perfs[p].rating
          }))
        setUser(username)
        setRatings(newRatings)
      } catch (error) {
        console.error("Error: user is undefined. Token is probably undefined.")
      }
      
    }
    if (accessToken) {
      removeAccessTokenFromUrl()
      fetchData()
    } else {
      setUser('')
      setRatings([])
    }
  }, [accessToken, setAccessToken])

  return (
    <div className="grid grid-cols-2 space-y-4">
      <div>
        <div className="">
          <h1 className="text-6xl mb-4">Create a Chess Card</h1>
          <div className="flex justify-between items-center self-stretch mb-12">
            {
              accessToken
              ? <>
                  <div className="mr-4">
                    <span>You're logged in as {user}.</span>
                  </div>
                  <Link to="/">
                    <Button onClick={() => setAccessToken(null)}>Log out</Button>
                  </Link>
                </>
              : <>
                  <p>Log in using your Lichess account to start personalizing your chess card.</p>
                  <a href={authURL}>
                    <Button>Log in</Button>
                  </a>
                </>
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
                      setRatingsToRender(prev => prev.filter(toStay => toStay !== v))
                    } else {
                      setRatingsToRender(prev => prev.concat([v]))
                    }
                  }} 
                />
              }
              <RadioButtonGroup<CardColorState>
                name="cardColor"
                label="Card color"
                values={cardColorOptions}
                onChange={(v: HTMLInputValue) => setCardColor(cardColorOptions.find(c => c.key === v)!.value)}
                customRadioButton={colorRadioButton}
              />     
              <RadioButtonGroup<CardIconState>
                name="cardIcon"
                label="Icon"
                values={cardIconOptions}
                onChange={(v: HTMLInputValue) => setCardIcon(cardIconOptions.find(i => i.key === v)!.value)}
                customRadioButton={iconRadioButton}
              />
              <RadioButtonGroup<CardColorState>
                name="cardBackgroundColor"
                label="Background color"
                values={backgroundColorValues}
                onChange={(v: HTMLInputValue) => setBg(backgroundColorValues.find(c => c.key === v)!.value)}
                customRadioButton={backgroundColorRadioButton}
              />
              <RadioButtonGroup<CardColorState>
                name="textColor"
                label="Text color"
                values={textColorValues}
                onChange={(v: HTMLInputValue) => setTextColor(textColorValues.find(c => c.key === v)!.value)}
                customRadioButton={textColorRadioButton}
              />
            </fieldset>
          </form>
        </div>
      </div>
      <Canvas 
        username={user}
        ratings={ratingsToRender}
        color={cardColor}
        icon={cardIcon}
        bg={bg}
        textColor={textColor}
      />
    </div>
  )
}
