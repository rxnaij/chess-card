import classNames from 'classnames'
import { CardIconState, CustomRadio } from '../../../types'

const iconRadioButton = (isActive: boolean, value: CardIconState): CustomRadio => {
    return {
        className: classNames(
            "border-2 border-transparent hover:border-brand-green hover:shadow-lg cursor-pointer mr-3",
            isActive && 'border-brand-green'
        ),
        style: {
            display: 'inline-block',
            minWidth: '60px',
            minHeight: '60px',
            borderRadius: '50%',
            background: `url(${value}) no-repeat`,
            backgroundSize: '50px',
            backgroundPosition: 'center'
        }
    }
}

export { iconRadioButton }