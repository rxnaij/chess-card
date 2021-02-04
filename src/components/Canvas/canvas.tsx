import React from 'react'
import Konva from 'konva'
import Button from '../TextInput/Button'
import { Stage, Layer, Rect, Text, Group, Image } from 'react-konva'
import useImage from 'use-image'
import { useCenteredOffset, useCenteredOffsetX } from './useCenteredOffset'
import { Rating, CardColorState, CardIconState } from '../../types'
import { getLichessIconChar } from './getLichessIconChar'
import { useLoginCtx } from '../../state/LoginContext'

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
                cornerRadius={10}
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

// Complete playercard component
type CardProps = {
    username: string,
    ratings: Rating[],
    color: CardColorState,
    icon?: CardIconState | undefined,
    textColor: CardColorState
}

type CardLocation = {
    x: number,
    y: number
}

function Card({ username="Your username", ratings, color, icon = '', x, y, textColor }: CardProps & CardLocation) {
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
                    y={CARD_WIDTH * 2 / 3}
                    width={CARD_WIDTH}
                    height={CARD_WIDTH / 3}
                    fill={foreground}
                    cornerRadius={[0, 0, 10, 10]}
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

// Download handler function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Main canvas component
export default function Canvas (props: CardProps & { bg: CardColorState }) {
    const { accessToken } = useLoginCtx()
    const stageRef = React.useRef<Konva.Stage>(null!)
    const CANVAS_WIDTH = 375
    const CANVAS_HEIGHT = 667

    // download canvas as image
    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        console.log(uri);
        downloadURI(uri, 'stage.png');  // todo: change file name
    };

    return (
        <div className="flex-flex-col align-center">
            <div className="flex justify-center">
                <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={stageRef}>
                    <Background width={CANVAS_WIDTH} height={CANVAS_HEIGHT} color={props.bg} />
                    <Card {...props} x={CANVAS_WIDTH / 2} y={CANVAS_HEIGHT / 2} />
                </Stage>
            </div>
            {
                accessToken &&
                <div className="flex flex-row justify-center mt-8">
                    <Button className="mr-4" onClick={handleExport}>Download</Button>
                </div>
            }
        </div>
    )
}