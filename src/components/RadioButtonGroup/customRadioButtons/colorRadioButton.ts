import classNames from 'classnames'
import { CardColorState, CustomRadio } from '../../../types'

const colorRadioButton = (isActive: boolean, value: CardColorState): CustomRadio => {
    const mainColor = (v: CardColorState) => {
        if (!v) return '#212121'
        if (v instanceof Array) {
            return `linear-gradient(to bottom, ${v[0]} 50%, ${v[1]} 50%)`
        } else {
            return v
        }
    }

    return {
        className: classNames(
            'border-2 hover:border-brand-green hover:shadow-lg cursor-pointer mr-3',
            isActive && 'border-2 border-brand-green',
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