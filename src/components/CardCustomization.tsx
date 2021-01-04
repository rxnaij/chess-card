import React from 'react'
import { LichessRating, CardColorState, CardIconState }  from './types'
import Canvas from './Canvas/canvas'
import Button from './TextInput/Button'
import TextInput from './TextInput/TextInput'
import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup'
import { RadioValue, HTMLInputValue } from './RadioButtonGroup/RadioButton'
import knightIcon from '../assets/icons/icons8-knight-100-2.png'
import clockIcon from '../assets/icons/icons8-chess-clock-100.png'
import { colorRadioButton } from './RadioButtonGroup/ColorIcon/ColorIcon'
import { iconRadioButton } from './RadioButtonGroup/ColorIcon/IconRadioButton'
import ColorRadioButton from './RadioButtonGroup/ColorIcon/ColorRadioButton'

export default function CardCustomization() {
    const [user, setUser] = React.useState<string>('')
    const [ratings, setRatings] = React.useState<LichessRating[]>([])
    const [cardColor, setCardColor] = React.useState<CardColorState>('#212121')
    const [cardIcon, setCardIcon] = React.useState<CardIconState>('')

    const [usersearchErrorMessage, setUsersearchErrorMessage] = React.useState<string>('')
    const [usersearchErrorMessageIsActive, setUsersearchErrorMessageIsActive] = React.useState<boolean>(false)

    const [test, setTest] = React.useState<number>(0)
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
    const cardIconOptions = [
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

    /**
     * @param username username of user
     */
    const getRatingData = async (username: string) => {
        // Make the API request
        const url = `https://lichess.org/api/user/${username}/rating-history`
        const response = await fetch(url)

        if (response.status === 200) {
          if (usersearchErrorMessageIsActive) setUsersearchErrorMessageIsActive(false)

          const ratings = await response.json() as Array<LichessRating>
          // We only want to get bullet, blitz, and rapid ratings (for now)
          const rapidRatings = ratings.slice(0, 3).map((r: LichessRating) => {
              return({
              ...r,
              points: r.points.slice(r.points.length - 1) // get the most recent rating
              }) 
          })
          console.log(rapidRatings)
          setRatings(rapidRatings)
        } else {
          if (response.status === 404) {
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
            <fieldset className="space-y-6">
              <fieldset className="">
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
              {usersearchErrorMessageIsActive && <p>{usersearchErrorMessage}</p>}
              <RadioButtonGroup<CardColorState>
                name="cardColor"
                label="Select a color for your card."
                values={cardColorOptions}
                onChange={(v: HTMLInputValue) => setCardColor(cardColorOptions.find(c => c.key === v)!.value)}
                customButton={<ColorRadioButton bg={}/>}
              />     
              <RadioButtonGroup<CardIconState>
                name="cardIcon"
                label="Select an icon for your card."
                values={cardIconOptions}
                onChange={(v: HTMLInputValue) => setCardIcon(cardIconOptions.find(i => i.key === v)!.value)}
                customRadioButton={iconRadioButton}
              />      
            </fieldset>
          </form>
          <div className="flex flex-col align-center">
            <div className="flex justify-center">
              <Canvas 
                username={user}
                ratings={ratings}
                color={cardColor}
                icon={cardIcon}
              />
            </div>
            <div className="flex flex-row justify-center mt-8">
              <Button className="mr-4">Download card</Button>
              <Button>Instagram story...</Button>
            </div>
          </div>
        </div>
    )
}
