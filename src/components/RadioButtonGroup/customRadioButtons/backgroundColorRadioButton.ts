import classNames from 'classnames'
import { CardColorState, CustomRadio } from '../../types'

const backgroundColorRadioButton = (isActive: boolean, value: CardColorState): CustomRadio => {
    const mainColor = (v: CardColorState) => {
        if (!v) return '#212121'
        if (v instanceof Array) {
            return `linear-gradient(-242.5deg, ${v[0]} 0%, ${v[1]} 100%)`
        } else {
            return v
        }
    }

    return {
        className: classNames(
            'hover:shadow-lg cursor-pointer mr-2',
            isActive && 'border-2 border-brand-red',
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

export { backgroundColorRadioButton }