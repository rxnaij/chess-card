import React from 'react'
import Konva from 'konva'
import Button from '../TextInput/Button'
import { Stage, Layer, Rect, Text, Group, Image } from 'react-konva'
import useImage from 'use-image'
import { useCenteredOffset, useCenteredOffsetX } from './useCenteredOffset'
import { LichessRating, CardColorState, CardIconState } from '../types'

interface BackgroundProps {
    width: number,
    height: number,
    color: CardColorState,
}
const Background = ({ width, height, color }: BackgroundProps) => {
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

    return (
        <Layer>
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                {...getFillProps(color)}
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
/**
 * Returns the coresponding icon for a given time control/game type.
 * The returned icon should be rendered in the Lichess font.
 * @param name the name of the time control
 */
const getRatingIcon = (name: string) => {
    const check = name.toLowerCase()
    switch (check) {
        case 'bullet':
            return 'T'
        case 'blitz':
            return ')'
        case 'rapid':
            return '#'
    }
}

type CardRatingTextProps = {
    ratings: LichessRating[]
    x: number,
    y: number,
    fill: string,
}

const CardRatingText = ({ ratings, x, y, fill }: CardRatingTextProps) => {
    const ratingTextRef = React.useRef<Konva.Group>(null!)
    const [offset] = useCenteredOffsetX<typeof ratings>(ratings, ratingTextRef)
    const textProps = {
        fontFamily: 'Overpass',
        fontSize: 16,
        fill,
        y
    }

    return (
        <Group
            ref={ratingTextRef}
            offsetX={offset}
        >
            {
                ratings.map((rating, i) => {
                    const newX = x + (i * 90)   // positioning of ratings
                    return (
                        <Group key={rating.name} x={newX}>
                            <Text {...textProps} fontFamily="lichess" text={getRatingIcon(rating.name)} />
                            <Text {...textProps} x={20} text={rating.points[0][3].toString()} />
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
    ratings: LichessRating[],
    color: CardColorState,
    icon?: CardIconState | undefined,
}

function Card({ username = "Your username", ratings, color, icon = '' }: CardProps) {
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

    return (
        <Layer
            offset={{ x: CARD_WIDTH / 2, y: CARD_WIDTH / 2 }}
            x={375 / 2}
            y={667 / 2}
            width={CARD_WIDTH}
            height={CARD_WIDTH}
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
                    shadowBlur={24}
                    shadowOpacity={0.5}
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
                        fill={foreground === "#EFEFEF" ? "#212121" : "#EFEFEF"}
                        align="center"
                        offsetX={usernameOffset}  // sets origin point to center of element to allow for horizontal centering
                        fontSize={24}
                    />
                    <CardRatingText ratings={ratings} x={CARD_WIDTH / 2} y={280} fill={foreground === "#EFEFEF" ? "#212121" : "#EFEFEF"} />
                </Group>
            </Group>
        </Layer>
    )
}

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function Canvas (props: CardProps & { bg: CardColorState }) {
    const [modalIsActive, setModalIsActive] = React.useState(false)
    const stageRef = React.useRef<Konva.Stage>(null!)

    // download canvas as image
    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        console.log(uri);
        downloadURI(uri, 'stage.png');  // todo: change file name
    };

    return (
        <div className="flex-flex-col align-center">
            <div className="flex justify-center">
                <Stage width={375} height={667} ref={stageRef}>
                    <Background width={375} height={667} color={props.bg} />
                    <Card {...props} />
                </Stage>
            </div>
            <div className="flex flex-row justify-center mt-8">
                <Button className="mr-4" onClick={handleExport}>Download card</Button>
                <Button onClick={() => setModalIsActive(!modalIsActive)}>Instagram story...</Button>
            </div>
        </div>
    )
}