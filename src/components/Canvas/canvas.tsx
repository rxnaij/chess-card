import React from 'react'
import Konva from 'konva'
import { Stage, Layer, Rect, Text, Group, Image } from 'react-konva'
import useImage from 'use-image'
import { LichessRating, CardColorState, CardIconState } from '../types'

type IconProps = {
    x: number,
    y: number,
    icon: string,
}
const PieceIcon = ({ x, y, icon }: IconProps) => {
    const [image] = useImage(icon)
    if (image === undefined) console.log("Image was undefined. God damn it.")
    return <Image image={image} x={x} y={y} offsetX={50} offsetY={50} />
}

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

type RatingTextProps = {
    ratings: LichessRating[]
    x: number,
    y: number,
    fill: string,
}
/**
 * @param ratings
 */
const RatingText = ({ ratings, x, y, fill }: RatingTextProps ) => {
    const ratingTextRef = React.useRef<Konva.Group>(null!)
    const textProps = {
        fontFamily: 'Overpass',
        fontSize: 16,
        fill,
        y: y
    }
    return(
        <Group
            ref={ratingTextRef}
            offsetX={ratingTextRef.current ? ratingTextRef.current.getClientRect().width / 2 : 0}
        >
            {
                ratings.map((rating, i) => {
                    const newX = x + (i * 80)   // positioning of ratings
                    console.log('i: ' + i, 'x: ' + newX, 'y: ' + y )
                    return (
                        <Group key={rating.name} x={newX}>
                            <Text {...textProps} fontFamily="lichess" text={getRatingIcon(rating.name)}/>
                            <Text {...textProps} x={18} text={rating.points[0][3].toString()}/>
                        </Group>
                    )
                })
            }
        </Group>
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

type CardProps = {
    username: string,
    ratings: LichessRating[],
    color: CardColorState,
    icon?: CardIconState | undefined,
}

export default function Canvas({ username="Your username", ratings, color, icon='' }: CardProps) {
    const stageRef = React.useRef<Konva.Stage>(null!)
    const CARD_WIDTH = 320
    const background = color instanceof Array ? color[0] : color
    const foreground = color instanceof Array ? color[1] : color

    /**
     * handle downloading of image
     */
    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        console.log(uri);
        downloadURI(uri, 'stage.png');
    };

    const usernameRef = React.useRef<Konva.Text>(null!)

    React.useEffect(() => {

    }, [])

    return (
        <Stage
            ref={stageRef}
            width={CARD_WIDTH}
            height={CARD_WIDTH}
        >
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={CARD_WIDTH}
                    height={CARD_WIDTH}
                    fill={background}
                    cornerRadius={10}
                />
                <PieceIcon
                    x={CARD_WIDTH / 2}
                    y={CARD_WIDTH / 3}
                    icon={icon}
                />
            </Layer>
            <Layer>
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
                        y={230}
                        fill={foreground === "#EFEFEF" ? "#212121" : "#EFEFEF"}
                        align="center"
                        offsetX={usernameRef.current ? usernameRef.current.getTextWidth() / 2 : 0}  // sets origin point to center of element to allow for horizontal centering
                        fontSize={28}
                    />
                    <RatingText ratings={ratings} x={CARD_WIDTH / 2} y={280} fill={foreground === "#EFEFEF" ? "#212121" : "#EFEFEF"} />
                </Group>
            </Layer>
        </Stage>
    )
}
