import React from 'react'
import classNames from 'classnames'
import {CustomRadio } from '../types'

export type HTMLInputValue = string | number | readonly string[] | undefined
export interface RadioValue<T> {
    key: HTMLInputValue,
    value: T
}
export type RadioButtonProps<T> = {
    name: string,
    value: HTMLInputValue,
    onChange: (value: HTMLInputValue) => void,

    isActive: boolean,
    setActive: (id: string) => void,
    activeClassName?: string | undefined,

    customRadioButton?: CustomRadio | ( (isActive: boolean, value: any) => CustomRadio ),

    id: string,
    className?: string
}

const RadioButton = <T,>(
    { name, value, onChange, isActive, setActive, activeClassName, customRadioButton, id, className }: RadioButtonProps<T>
) => {
    const custom = typeof customRadioButton === 'function' 
    ? customRadioButton(isActive, value) 
    : customRadioButton

    return (
        <label 
            htmlFor={id}
            onClick={() => setActive(id)}
            className={classNames(
                className,
                isActive && activeClassName,
                custom?.className
            )}
            style={custom?.style}
        >
            <input
                type="radio"
                name={name}
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
                id={id}
                className={custom && 'border-0 m-0 appearance-none'}
                required
            />
            { custom ? '' : value }
        </label>
    )
}

export default RadioButton
