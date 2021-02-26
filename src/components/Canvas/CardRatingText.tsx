import React from 'react'
import Konva from 'konva'
import { Group, Text } from 'react-konva'
import { Rating } from '../../types'
import { useCenteredOffsetX } from './util/useCenteredOffset'
import { getLichessIconChar } from './util/getLichessIconChar'

// Player rating information
type CardRatingTextProps = {
    ratings: Rating[]
    x: number,
    y: number,
    fill: string,
}

const CardRatingText = ({ ratings, x, y, fill }: CardRatingTextProps) => {
    const [, setFontIsLoaded] = React.useState(false)
    const ratingTextRef = React.useRef<Konva.Group>(null!)
    const [offset] = useCenteredOffsetX<typeof ratings>(ratings, ratingTextRef)
    const textProps = {
        fontFamily: 'Overpass',
        fontSize: 16,
        fill,
        y
    }

    // Checks to see that lichess font has been loaded
    React.useEffect(() => {
        const isLoaded = document.fonts.check("16px lichess")
        if (!isLoaded) {
            setTimeout(() => {
                setFontIsLoaded(true)
            }, 0);
        }
    }, [ratings])

    return (
        <Group
            ref={ratingTextRef}
            offsetX={offset}
        >
            {
                ratings.map((rating, i) => {
                    const key = `rating-text--${rating.name}`
                    const newX = x + (i * 90)   // positioning of ratings
                    return (
                        <Group key={key} x={newX}>
                            <Text {...textProps} fontFamily="lichess" text={getLichessIconChar(rating.name)} />
                            <Text {...textProps} x={20} text={rating.points.toString()} />
                        </Group>
                    )
                })
            }
        </Group>
    )
}

export default CardRatingText