import React from 'react'
import { LichessRating, CardColorState, CardIconState, Rating }  from './types'
import { Link } from 'react-router-dom'

import Canvas from './Canvas/canvas'
import Button from './TextInput/Button'
import TextInput from './TextInput/TextInput'
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
    const [user, setUser] = React.useState('')
    const [ratings, setRatings] = React.useState<Rating[]>([])
    const [ratingsToRender, setRatingsToRender] = React.useState<Rating[]>([])

    const [cardColor, setCardColor] = React.useState<CardColorState>(cardColorOptions[0].value)
    const [cardIcon, setCardIcon] = React.useState<CardIconState>(cardIconOptions[0].value)
    const [bg, setBg] = React.useState<CardColorState>(backgroundColorValues[0].value)

    const [usersearchErrorMessage, setUsersearchErrorMessage] = React.useState<string>('')
    const [usersearchErrorMessageIsActive, setUsersearchErrorMessageIsActive] = React.useState<boolean>(false)

    /**
     * Fetches user's rating data on Lichess
     * @param username username of user
     */
    const getRatingData = async (username: string) => {
        // Make the API request
        const url = `https://lichess.org/api/user/${username}/rating-history`
        const response = await fetch(url)

        if (response.status === 200) {
          const ratings = await response.json() as Array<LichessRating>
          // Retrieves up-to-date list of valid ratings from user's rating history
          const cleanedRatings: Rating[] = ratings.filter((r: LichessRating) =>   // Only include existing ratings
            r.points.length
          ).map((r: LichessRating) => ({  // Retrieve most recent entry in ratings
              ...r,
              points: r.points[r.points.length - 1][3]
          }))
          setRatings(cleanedRatings)

          // Deactivate error message
          if (usersearchErrorMessageIsActive) setUsersearchErrorMessageIsActive(false)
        } else {
          if (response.status >= 400 && response.status < 500) {
            setUsersearchErrorMessage(`We couldn't find a user with that name. Please check your spelling and try again.`)
            setUsersearchErrorMessageIsActive(true)
          } else if (response.status >= 500) {
            setUsersearchErrorMessage(`There was a problem connecting to Lichess's servers. Please wait and try again.`)
            setUsersearchErrorMessageIsActive(true)
          }
          console.log(`Error: user not found: ${username}`)
        }    
    }

    return (
        <div className="grid grid-cols-2">
          <form action="">
            <fieldset className="space-y-10">
              <Link to="/login">
                <Button className="ml-4">Log in</Button>
              </Link>
              <fieldset>
                <TextInput
                  name="username" 
                  id="username" 
                  placeholder="Username" 
                  label="Enter your lichess.org username" 
                  value={user} 
                  onChange={ e => setUser(e.target.value) } 
                />
                <Button className="ml-4" onClick={() => getRatingData(user)}>Submit</Button>
              </fieldset>
              {usersearchErrorMessageIsActive && <span className="pt-5">{usersearchErrorMessage}</span>}
              <RatingSelector 
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
