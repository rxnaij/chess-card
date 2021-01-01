export type LichessRating = {
    name: string,
    points: Array<number[]>
}
export type CardColorState = string | [string, string]  // TODO: specify valid color values
export type CardIconState = string // TODO: haven't decided the icon choices

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