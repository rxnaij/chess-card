import React from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect, Text, Group, Image } from 'react-konva'
import { CardColorState } from '../types'
import Canvas from './canvas'

interface IGStoryProps {
    width: number,
    height: number,
    color: CardColorState,
}

const IGStory = ({width, height, color}: IGStoryProps) => {

    return (
        <Layer>
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="#212121"
            />
        </Layer>
    )
}

export default IGStory
