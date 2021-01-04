import classNames from 'classnames'
import { CardIconState, CustomRadio } from '../../types'

const iconRadioButton = (isActive: boolean, value: CardIconState): CustomRadio => {
    return {
        className: classNames(
            "bg-black border-2 border-gray-100 hover:border-brand-red hover:shadow-lg cursor-pointer mr-2",
            isActive && 'border-brand-red'
        ),
        style: {
            display: 'inline-block',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
        }
    }
}

export { iconRadioButton }