import React from 'react'

interface TextInputProps {
    name: string,
    className?: string,
    id?: string,
    placeholder?: string,

    label: string,

    // Controllers
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = ({name, className, id, placeholder, label, value, onChange}: TextInputProps) => {

    return (
        <>
            <label className="block mb-2 text-lg" htmlFor={name}>{label}</label>
            <input
                className="rounded-lg py-4 px-8 bg-white bg-opacity-10 hover:bg-opacity-20 text-white"
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
        
    )
}

export default TextInput