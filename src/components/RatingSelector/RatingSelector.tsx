import { Rating } from '../types'
import classNames from 'classnames'

interface RatingSelectorProps {
    ratings: Rating[],   // all available ratings to select from
    value: Rating[]     // controlled value for active rating values
    onChange: (v: Rating) => void, // set ratingsToRender in the 
}

function RatingSelector({ratings, value, onChange} : RatingSelectorProps) {
    return (
        <fieldset className="flex flex-row items-center flex-wrap space-y-2">
            <legend>Pick up to three ratings to show on your card.</legend>
            {
                ratings.map((rating: Rating) => {
                    const { name } = rating
                    const id = `rating-checkbox--${name}`
                    const isSelected = value.includes(rating)
                    const isDisabled = value.length >= 3 && !isSelected // limit up to 3 active ratings
                    const label = name[0].toUpperCase() + name.substring(1)
                    return (
                        <RatingCheckbox
                            key={id}
                            id={id}
                            className="mr-1"
                            name={name}
                            value={name}
                            onChange={() => onChange(rating)}
                            checked={isSelected}
                            disabled={isDisabled}
                            label={label}
                        />
                    )
                })
            }
        </fieldset>
    )
}

interface RatingCheckboxProps {
    id?: string,
    className?: string,
    value: string,
    onChange: () => void,
    name: string,
    checked: boolean,
    disabled: boolean,
    label: string
}


function RatingCheckbox({id, className, value, onChange, name, checked, disabled, label}: RatingCheckboxProps) {
    const labelClasses = classNames(
        "mr-8 p-4 rounded-sm",
        !disabled && 'hover:bg-green-300 cursor-pointer',
        disabled && 'text-gray-400',
        checked && 'bg-green-600',
        className
    )
    const inputClasses = classNames(
        `insivible mr-2 p-4`
    )

    return(
        <label
            htmlFor={name}
            className={labelClasses}
            onClick={onChange}
        >
            <input 
                type="checkbox"
                id={id}
                className={inputClasses}
                value={value}
                name={name}
                checked={checked}
                disabled={disabled}
            />
            <span>{label}</span>
        </label>
    )
}

export default RatingSelector
