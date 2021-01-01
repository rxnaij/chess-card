import * as React from 'react'
import RadioButton, { RadioValue, HTMLInputValue } from './RadioButton'
import { CustomRadio } from '../types'

interface RadioButtonGroupProps<Value> {
    name: string,
    label: string,
    values: RadioValue<Value>[],
    onChange: (val: HTMLInputValue) => void
    customRadioButton?: CustomRadio | ((isActive: boolean, value: any) => CustomRadio)
}

const RadioButtonGroup = <T,>({name, label, values, onChange, customRadioButton}: RadioButtonGroupProps<T>) => {
    const [activeButton, setActiveButton] = React.useState<HTMLInputValue>('')
    return(
        <fieldset id={`${name}-form`} name={name}>
            <legend className="block mb-2 text-lg">
                {label}
            </legend>
            {
                values.map(v => {
                    const { key, value } = v
                    const inputId = `${name}-radio--${key}`
                    const isActive = inputId === activeButton
                    return(
                        <RadioButton
                            key={inputId}
                            name={name}
                            value={key}
                            onChange={onChange}
                            isActive={isActive}
                            setActive={setActiveButton}
                            activeClassName="text-green-500"
                            id={inputId}
                            customStyles={typeof customRadioButton === 'function' ? customRadioButton(isActive, value) : customRadioButton}
                        />
                    )
                })
            }
        </fieldset>
    )
}

export default RadioButtonGroup