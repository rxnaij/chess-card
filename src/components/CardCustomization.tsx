import React from 'react'
import { CardColorState, CardIconState, Rating }  from './types'
import { Link } from 'react-router-dom'

import Canvas from './Canvas/canvas'
import Button from './TextInput/Button'
import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup'
import { RadioValue, HTMLInputValue } from './RadioButtonGroup/RadioButton'
import RatingSelector from './RatingSelector/RatingSelector'

import knightIcon from '../assets/icons/icons8-knight-100-2.png'
import clockIcon from '../assets/icons/icons8-chess-clock-100.png'

import { colorRadioButton } from './RadioButtonGroup/customRadioButtons/colorRadioButton'
import { iconRadioButton } from './RadioButtonGroup/customRadioButtons/iconRadioButton'
import { backgroundColorRadioButton } from './RadioButtonGroup/customRadioButtons/backgroundColorRadioButton'

// Card customization options
const cardColorOptions: RadioValue<CardColorState>[] = [
  {
    key: 'white',
    value: '#EFEFEF'
  },
  {
    key: 'black',
    value: '#212121'
  },
  {
    key: 'black-white',
    value: ['#212121', '#EFEFEF']
  },
  {
    key: 'white-black',
    value: ['#EFEFEF', '#212121']
  }
]

const cardIconOptions: RadioValue<CardIconState>[] = [
  {
    key: 'knight',
    value: knightIcon
  },
  {
    key: 'bishop',
    value: ''
  },
  {
    key: 'clock',
    value: clockIcon
  }
]

const backgroundColorValues: RadioValue<CardColorState>[] = [
  {
    key: 'cotton-candy',
    value: ['#FF64CA', '#35AED4']
  },
  {
    key: 'fresh',
    value: ['#62C370', '#008DD5']
  },
  {
    key: 'red',
    value: ['#FB66CB', '#FF5A5F']
  }
]

// Main card customization component
export default function CardCustomization() {
    const [accessToken, setAccessToken] = React.useState<string | null>(null)
    const [user, setUser] = React.useState('')
    const [ratings, setRatings] = React.useState<Rating[]>([])
    const [ratingsToRender, setRatingsToRender] = React.useState<Rating[]>([])

    const [cardColor, setCardColor] = React.useState<CardColorState>(cardColorOptions[0].value)
    const [cardIcon, setCardIcon] = React.useState<CardIconState>(cardIconOptions[0].value)
    const [bg, setBg] = React.useState<CardColorState>(backgroundColorValues[0].value)

    // Resets ratings selector when not logged in
    React.useEffect(() => {
      setRatingsToRender([])
    }, [ratings])

    // Retrieve data when logged in
    React.useEffect(() => {
      // Check for access token
      const token = new URLSearchParams(window.location.search).get('access-token') || null
      setAccessToken(token)

      // Retrieve account data
      async function fetchData() {
        const user = await fetch('https://lichess.org/api/account', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        }).then(res => res.json())
        const { username, perfs } = user
        const newRatings: Rating[] = Object.getOwnPropertyNames(perfs)
          .filter(p => perfs[p].games > 0)
          .map((p: string) => ({
            name: p,
            points: perfs[p].rating
          }))
        setUser(username)
        setRatings(newRatings)
      }
      if (accessToken) fetchData()
    }, [accessToken])

    return (
        <div className="grid grid-cols-2 space-y-4">
          <div className="col-span-2 flex justify-between">
            {
              accessToken
              ? <> 
                  <h3 className="text-2xl font-bold">Customizing {user}'s chess card!</h3>
                  <a href="http://localhost:3000">
                    <Button className="ml-4" onClick={() => {
                      setAccessToken(null)
                    }}>Log out</Button>
                  </a>
                </>
              : <a href="http://localhost:8000">
                  <Button className="ml-4">Log in</Button>
                </a>
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
                label="Pick a color."
                values={cardColorOptions}
                onChange={(v: HTMLInputValue) => setCardColor(cardColorOptions.find(c => c.key === v)!.value)}
                customRadioButton={colorRadioButton}
              />     
              <RadioButtonGroup<CardIconState>
                name="cardIcon"
                label="Pick an icon."
                values={cardIconOptions}
                onChange={(v: HTMLInputValue) => setCardIcon(cardIconOptions.find(i => i.key === v)!.value)}
                customRadioButton={iconRadioButton}
              />
              <RadioButtonGroup<CardColorState>
                name="cardBackgroundColor"
                label="Pick a background color."
                values={backgroundColorValues}
                onChange={(v: HTMLInputValue) => setBg(backgroundColorValues.find(c => c.key === v)!.value)}
                customRadioButton={backgroundColorRadioButton}
              /> 
            </fieldset>
          </form>
          <Canvas 
            username={user}
            ratings={ratingsToRender}
            color={cardColor}
            icon={cardIcon}
            bg={bg}
          />
        </div>
    )
}
