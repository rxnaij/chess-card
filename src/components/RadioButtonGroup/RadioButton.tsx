import React from 'react'
import classNames from 'classnames'

export type HTMLInputValue = string | number | readonly string[] | undefined
export interface RadioValue<T> {
    key: HTMLInputValue,
    value: T
}
type RadioButtonProps<T> = {
    name: string,
    value: HTMLInputValue,
    onChange: (value: HTMLInputValue) => void,

    isActive: boolean,
    setActive: (id: string) => void,
    activeClassName?: string | undefined,

    id: string,
    className?: string
}

const RadioButton = <T,>(
    { name, value, onChange, isActive, setActive, activeClassName, id, className }: RadioButtonProps<T>
) => {
    return (
        <label 
            htmlFor={id}
            onClick={() => {
                setActive(id)
            }}
            className={classNames(
                className,
                isActive && activeClassName
            )}
        >
            <input
                type="radio"
                checked={isActive}
                name={name}
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
                id={id}
                className=""
                required
            />
            { value }
        </label>
    )
}

export default RadioButton