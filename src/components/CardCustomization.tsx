// Business logic and types
import React from 'react'
import { CardColorState, CardIconState, Rating }  from './types'
import { Link } from 'react-router-dom'
import { useLoginCtx } from '../state/LoginContext'
import { removeAccessTokenFromUrl } from '../utils/fetchLogin'

// Custom components
import Canvas from './Canvas/canvas'
import Button from './TextInput/Button'
import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup'
import { RadioValue, HTMLInputValue } from './RadioButtonGroup/RadioButton'
import RatingSelector from './RatingSelector/RatingSelector'

// Icons
import { knightIcon, bishopIcon, clockIcon, clockIcon2 } from '../assets/useAsset'

// Radio button styling
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
    value: bishopIcon
  },
  {
    key: 'clock',
    value: clockIcon
  },
  {
    key: 'clock-2',
    value: clockIcon2
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
  },
  {
    key: 'sunset',
    value: ['#FFF503', '#FB6EB2']
  }
]

// Main card customization component
export default function CardCustomization() {
    const { accessToken, setAccessToken } = useLoginCtx()

    const [user, setUser] = React.useState('')
    const [ratings, setRatings] = React.useState<Rating[]>([])
    const [ratingsToRender, setRatingsToRender] = React.useState<Rating[]>([])

    const [cardColor, setCardColor] = React.useState<CardColorState>(cardColorOptions[0].value)
    const [cardIcon, setCardIcon] = React.useState<CardIconState>(cardIconOptions[0].value)
    const [bg, setBg] = React.useState<CardColorState>(backgroundColorValues[0].value)

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
              {
                accessToken
                ? <div className="flex justify-between items-center mb-12"> 
                    <div className="mr-4">
                      <span>You're logged in as {user}.</span>
                    </div>
                    <Link to="/">
                      <Button onClick={() => {
                        setAccessToken(null)
                      }}>
                        Log out
                      </Button>
                    </Link>
                  </div>
                : <div className="flex justify-between items-center self-stretch mb-12">
                    <p>Log in using your Lichess account to start personalizing your chess card.</p>
                    <a href="http://localhost:8000/">
                      <Button>Log in</Button>
                    </a>
                  </div>
              }
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
          />
        </div>
    )
}
