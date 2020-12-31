import React from 'react'
import classNames from 'classnames'
import { CardColorState } from '../../types'

interface ColorIconProps<T> {
    name: string,
    value: T,
    onChange: (value: T) => void,

    isActive: boolean,
    setActive: (id: string) => void,

    id: string,
    className?: string
}

const ColorIcon = ({name, value, onChange, isActive, setActive, id, className}: ColorIconProps<CardColorState>) => {
    const mainColor = (v: CardColorState) => {
        if (!v) return '#212121'
        if (v instanceof Array) {
            return `linear-gradient(0deg, ${v[0]} 50%, ${v[1]} 50%)`
        } else {
            return v
        }
    }

    return (
        <label 
            className={classNames(
                'border-2 border-gray-100 hover:border-brand-red hover:shadow-lg cursor-pointer',
                isActive && 'border-brand-red',
                className ? className : '',
            )}
            style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: mainColor(value)
            }}
            htmlFor={id}
            onClick={() => setActive(id)}
        >
            <input
                type="radio"
                id={id}
                className=""
                name={name}
                value={value}
                onChange={(e: React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
            />
        </label>
    )
}

export default ColorIcon
