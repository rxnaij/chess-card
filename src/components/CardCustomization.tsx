// Business logic and types
import React from 'react'
import { CardColorState, CardIconState, Rating }  from '../types'
import { Link } from 'react-router-dom'
import { useLoginCtx } from '../state/LoginContext'
import { useCanvasState, useCanvasReducer } from '../state/CanvasContext'
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

  // const [textColorValues, setTextColorValues] = useState(getTextColorOptions(
  //   cardColorOptions[0].value,
  //   backgroundColorValues[0].value
  // ))

  // Resets ratings selector when not logged in
  React.useEffect(() => {
    dispatch({ type: 'update ratings to render', ratingsToRender: [] })
  }, [accessToken, dispatch])

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
        dispatch({ type: 'update user', user: username })
        dispatch({ type: 'update ratings', ratings: newRatings })
      } catch (error) {
        console.error("Error: user is undefined. Token is probably undefined.")
      }
      
    }
    if (accessToken) {
      removeAccessTokenFromUrl()
      fetchData()
    } else {
      dispatch({ type: 'reset' })
    }
  }, [accessToken, setAccessToken, dispatch])

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
