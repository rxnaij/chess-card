import classNames from 'classnames'
import { CardColorState, CustomRadioButton, CustomRadio } from '../../types'

const colorRadioButton = (isActive: boolean, value: CardColorState): CustomRadio => {
    const mainColor = (v: CardColorState) => {
        if (!v) return '#212121'
        if (v instanceof Array) {
            return `linear-gradient(0deg, ${v[0]} 50%, ${v[1]} 50%)`
        } else {
            return v
        }
    }

    return {
        className: classNames(
            'border-2 border-gray-100 hover:border-brand-red hover:shadow-lg cursor-pointer',
            isActive && 'border-brand-red',
        ),
        style: {
            display: 'inline-block',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: mainColor(value)
        }
    }
}

export { colorRadioButton }