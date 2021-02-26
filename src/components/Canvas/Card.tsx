import React from 'react'
import Konva from 'konva'
import { Layer, Rect, Text, Group } from 'react-konva'
import { CardColorState, CardIconState, Rating } from '../../types'
import CardIcon from './CardIcon'
import CardRatingText from './CardRatingText'

// Complete playercard component
type CardProps = {
    username: string,
    ratings: Rating[],
    color: CardColorState,
    icon?: CardIconState,
    textColor: CardColorState
    x: number,
    y: number
}

const Card = ({ username="Your username", ratings, color, icon='', x, y, textColor }: CardProps) => {
    const layerRef = React.useRef<Konva.Layer>(null!)
    const usernameRef = React.useRef<Konva.Text>(null!)
    const [usernameOffset, setUsernameOffset] = React.useState<number>(0)
    const CARD_WIDTH = 320
    const background = color instanceof Array ? color[0] : color
    const foreground = color instanceof Array ? color[1] : color

    // Center-offsets username text
    React.useEffect(() => {
        setUsernameOffset(usernameRef.current ? usernameRef.current.getClientRect().width / 2 : 0)
    }, [username])

    // Check to see that username font has been loaded

    return (
        <Layer
            offset={{ x: CARD_WIDTH / 2, y: CARD_WIDTH / 2 }}
            x={x}
            y={y}
            ref={layerRef}
        >
            <Group>
                <Rect
                    x={0}
                    y={0}
                    width={CARD_WIDTH}
                    height={CARD_WIDTH}
                    fill={background}
                    cornerRadius={16}
                    shadowOffsetY={16}
                    shadowBlur={24}
                    shadowOpacity={0.25}
                />
                <CardIcon
                    x={CARD_WIDTH / 2}
                    y={CARD_WIDTH / 3}
                    icon={icon}
                />
            </Group>
            <Group>
                <Rect
                    x={0}
                    y={CARD_WIDTH * 2 / 3 + 1}
                    width={CARD_WIDTH}
                    height={CARD_WIDTH / 3}
                    fill={foreground}
                    cornerRadius={[0, 0, 16, 16]}
                />
                <Group>
                    <Text
                        ref={usernameRef}
                        fontFamily="Overpass"
                        fontStyle="bold"
                        fontWeight={900}
                        text={username && '@' + username}
                        x={CARD_WIDTH / 2}
                        y={240}
                        fill={textColor instanceof Array ? textColor[0] : textColor}
                        align="center"
                        offsetX={usernameOffset}
                        fontSize={24}
                    />
                    <CardRatingText ratings={ratings} x={CARD_WIDTH / 2} y={280} fill={textColor instanceof Array ? textColor[0] : textColor} />
                </Group>
            </Group>
        </Layer>
    )
}

export default Card