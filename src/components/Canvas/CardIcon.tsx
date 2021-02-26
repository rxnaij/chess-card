import React from 'react'
import Konva from 'konva'
import { Image } from 'react-konva'
import useImage from 'use-image'
import { useCenteredOffset } from './util/useCenteredOffset'

// Card icon
type CardIconProps = {
    x: number,
    y: number,
    icon: string,
}

const CardIcon = ({ x, y, icon }: CardIconProps) => {
    const [image] = useImage(icon)
    const iconRef = React.useRef<Konva.Image>(null!)
    const [offset] = useCenteredOffset(image, iconRef)

    return <Image ref={iconRef} image={image} x={x} y={y} offsetX={offset[0]} offsetY={offset[1]} />
}

export default CardIcon