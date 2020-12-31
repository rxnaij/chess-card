import * as React from 'react'
import RadioButton, { RadioValue, HTMLInputValue } from './RadioButton'

interface RadioButtonGroupProps<T> {
    name: string,
    label: string,
    values: RadioValue<T>[],
    onChange: (val: HTMLInputValue) => void
}

const RadioButtonGroup = <T,>({name, label, values, onChange}: RadioButtonGroupProps<T>) => {
    const [activeButton, setActiveButton] = React.useState<HTMLInputValue>('')
    return(
        <fieldset id={`${name}-form`} name={name}>
            <legend className="block mb-2 text-lg">
                {label}
            </legend>
            {
                values.map(value => {
                    const inputId = `${name}-radio--${value.key}`
                    return(
                        <RadioButton
                            key={inputId}
                            name={name}
                            value={value.key}
                            onChange={onChange}
                            isActive={inputId === activeButton}
                            setActive={setActiveButton}
                            activeClassName="text-green-500"
                            id={inputId}
                            className=""
                        />
                    )
                })
            }
        </fieldset>
    )
}

export default RadioButtonGroup