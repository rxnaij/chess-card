import React from 'react'
import Konva from 'konva'
import { Layer, Rect, Text } from 'react-konva'
import { CardColorState } from '../../types'
import { useCenteredOffsetX } from './util/useCenteredOffset'

interface BackgroundProps {
    width: number,
    height: number,
    color: CardColorState,
}

const Background = ({ width, height, color }: BackgroundProps) => {
    const challengeTextRef = React.useRef<Konva.Text>(null!)
    const [textOffset] = useCenteredOffsetX(width, challengeTextRef)
    const [,setFontIsLoaded] = React.useState(false)

    const getFillProps = (v: CardColorState) => {
        if (!v) return { fill: '#212121' }
        if (v instanceof Array) {
            return {
                fillLinearGradientStartPoint: {
                    x: 0,
                    y: 0
                },
                fillLinearGradientEndPoint: {
                    x: width,
                    y: height
                },
                fillLinearGradientColorStops: [0, v[0], 1, v[1]]
            }
        } else {
            return { fill: v }
        }
    }

    // Checks to see that Overpass font has been loaded
    React.useEffect(() => {
        const isLoaded = document.fonts.check("16px Overpass")
        if (!isLoaded) {
            setTimeout(() => {
                setFontIsLoaded(true)
            }, 0);
        }
    }, [])

    return (
        <Layer>
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                cornerRadius={0 }
                {...getFillProps(color)}
            />
            <Text
                ref={challengeTextRef}
                offsetX={textOffset}
                x={width / 2}
                y={560}
                text="Challenge me on lichess.org!"
                fontSize={16}
                fill={"white"}
                fontFamily="Overpass"
            />
        </Layer>
    )
}

export default Background