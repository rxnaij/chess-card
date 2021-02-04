/**
 * Customization options for the card design
 */

import { RadioValue } from '../components/RadioButtonGroup/RadioButton'
import { CardColorState, CardIconState } from '../types'

import { knightIcon, bishopIcon, clockIcon, clockIcon2 } from '../assets/useAsset'

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

/**
 * Returns dynamically generated array of text color values, based on the current background color
 * @param {CardColorState} card current background color card, to determine default text color (white/black)
 * @param {CardColorState} color color(s) for themed text color options
 */
const getTextColorOptions = (card: CardColorState, color: CardColorState) => {
    const defaultColor = card === '#EFEFEF' || card[1] === '#EFEFEF' ? '#212121' : '#EFEFEF'
    const primary = color instanceof Array ? color[0] : color
    const secondary = color instanceof Array ? color[1] : null
    const radioValues = [
        {
            key: 'default',
            value: defaultColor
        },
        {
            key: 'primary',
            value: primary
        },
    ]
    if (secondary) 
        radioValues.push({
            key: 'secondary',
            value: secondary
        })
    return radioValues
} 

export {
    cardColorOptions,
    cardIconOptions,
    backgroundColorValues,
    getTextColorOptions
}