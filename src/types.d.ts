export type Rating = {
    name: string,
    points: number
}

declare type CardColorState = string | [string, string]  // TODO: specify valid color values
declare type CardIconState = string // TODO: haven't decided the icon choices

export type CustomRadioButton<T> = (
    isActive: boolean,
    value: T
) => {
    className?: string,
    style?: {}
}

export type CustomRadio = {
    className?: string,
    style?: {}
}

