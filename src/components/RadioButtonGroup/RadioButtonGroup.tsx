import * as React from 'react'
import RadioButton, { RadioValue, HTMLInputValue } from './RadioButton'
import { CustomRadio } from '../../types'

interface RadioButtonGroupProps<Value> {
    name: string,
    label: string,
    values: RadioValue<Value>[],
    onChange: (val: HTMLInputValue) => void
    customRadioButton?: CustomRadio | ((isActive: boolean, value: any) => CustomRadio)
}

const RadioButtonGroup = <T,>({name, label, values, onChange, customRadioButton}: RadioButtonGroupProps<T>) => {
    const [activeButton, setActiveButton] = React.useState<HTMLInputValue>(`${name}-radio--${values[0].key}`)   // sets the first value in the values array as active by default
    return(
        <fieldset id={`${name}-form`} name={name}>
            <legend className="block mb-2">
                {label}
            </legend>
            {
                values.map((v, i) => {
                    const { key, value } = v
                    const inputId = `${name}-radio--${key}`
                    const isActive = inputId === activeButton
                    const crb = typeof customRadioButton === 'function' ? customRadioButton(isActive, value) : customRadioButton
                    return(
                        <RadioButton
                            key={inputId}
                            name={name}
                            value={key}
                            onChange={onChange}
                            isActive={isActive}
                            setActive={setActiveButton}
                            id={inputId}
                            customRadioButton={crb}
                        />
                    )
                })
            }
        </fieldset>
    )
}

export default RadioButtonGroup