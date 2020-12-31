import React from "react"
import Sketch from "react-p5"
import p5Types from 'p5'

type ChessCardProps = {
    // parentRef: React.Ref<HTMLDivElement>,

    username: string,
    ratings: {}[],

    colorScheme: 'w'|'b'|'bw'|'wb'|undefined,
    icon: string | undefined,
}

const ChessCard: React.FC<ChessCardProps> = ({username, ratings, colorScheme, icon}: ChessCardProps) => {
    const user = '@' + username
    
    let overpassRegular: p5Types.Font, 
        overpassBlack: p5Types.Font,
        lichess: p5Types.Font

    const preload = (p5: p5Types) => {
        overpassRegular = p5.loadFont(`${process.env.PUBLIC_URL}/fonts/Overpass-Regular.ttf`)
        overpassBlack = p5.loadFont(`${process.env.PUBLIC_URL}/fonts/Overpass-Black.ttf`)
        lichess = p5.loadFont("http://db.onlinewebfonts.com/t/1926835283cbd17d05331a50e3039ada.ttf")
    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        console.log(username)
        p5.createCanvas(320, 320).parent(canvasParentRef)
        p5.colorMode(p5.HSL)
        p5.noStroke()

        p5.fill('green')
        p5.background(p5.color(0, 100, 0, 0))
        p5.rect(0, 0, 320, 320, 10, 10, 10, 10)
        p5.fill('black')
        p5.rect(0, p5.height * (2/3), p5.width, p5.height / 3)

        p5.textFont(overpassRegular)
        p5.textSize(32)
        p5.fill(0, 102, 153)
        p5.text(user, 20, 250)

        // Format text
        p5.textFont(lichess)
        p5.text('T', 50, 50)
    }

    const draw = (p5: p5Types) => {
    }

    return <Sketch preload={preload} setup={setup} draw={draw} />
}

export default ChessCard