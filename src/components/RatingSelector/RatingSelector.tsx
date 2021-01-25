import React from 'react'
import { Rating } from '../types'

interface RatingSelectorProps {
    ratings: Rating[],   // all available ratings to select from
    value: Rating[]     // controlled value of which ratings are active
    onChange: (v: Rating) => void, // set ratingsToRender in the 
}

function RatingSelector({ratings, value, onChange} : RatingSelectorProps) {
    return (
        <fieldset className="flex flex-row items-center">
            {
                ratings.map((rating: Rating) => {
                    const { name } = rating
                    const id = `rating-checkbox--${name}`
                    return (
                        <label key={id} htmlFor={name} className="mr-8">
                            <input 
                                type="checkbox" 
                                id={id}
                                value={name} 
                                name={name} 
                                className="mr-1" 
                                onClick={() => onChange(rating)}
                                disabled={value.length >= 3 && !value.includes(rating)}
                            />
                            <span>{rating.name}</span>
                        </label>
                    )
                })
            }
        </fieldset>
    )
}

export default RatingSelector
