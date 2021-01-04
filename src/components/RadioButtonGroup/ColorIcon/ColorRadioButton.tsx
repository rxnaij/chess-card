import React from 'react'
import classNames from 'classnames'
import RadioButton, { RadioButtonProps } from '../RadioButton'
import { CardColorState, CustomRadio } from '../../types'

type ColorRadioButtonProps<T> = RadioButtonProps<T> & {
    bg?: CardColorState
}

const ColorRadioButton = <T,>(props: ColorRadioButtonProps<T>) => {
    const mainColor = (v: CardColorState) => {
        if (!v) return '#212121'
        if (v instanceof Array) {
            return `linear-gradient(to top, ${v[0]} 50%, ${v[1]} 50%)`
        } else {
            return v
        }
    }

    return (
        <RadioButton
            {...props}
            className={classNames(
                'inline-block w-20 h-20 rounded-full border-2 border-gray-100 hover:border-brand-red hover:shadow-lg cursor-pointer mr-2',
                props.isActive && 'border-brand-red',
            )}
            // style={{
            //     background: mainColor(props.value)
            // }}
        />
    )
}

export default ColorRadioButton