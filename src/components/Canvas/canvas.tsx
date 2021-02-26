import React from 'react'
import Konva from 'konva'
import { Stage } from 'react-konva'

import Background from './Background'
import Card from './Card'
import Button from '../TextInput/Button'

import { useLoginCtx } from '../../state/LoginContext'
import { useCanvasState } from '../../state/CanvasContext'

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
const Canvas = () => {
    const { accessToken } = useLoginCtx()
    const { state } = useCanvasState()
    const { 
        user,
        ratingsToRender,
        cardColor,
        icon,
        bg,
        textColor
     } = state
    
    const stageRef = React.useRef<Konva.Stage>(null!)

    const CANVAS_WIDTH = 375
    const CANVAS_HEIGHT = 667

    // download canvas as image
    const handleExport = () => {
        const uri = stageRef.current.toDataURL({ pixelRatio: window.devicePixelRatio > 2 ? window.devicePixelRatio : 2 });
        console.log(uri);
        downloadURI(uri, `${user}_chess_card.png`);  // todo: change file name
    };

    return (
        <div className="flex-flex-col align-center">
            <div className="flex justify-center" id="stage">
                <Stage
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    ref={stageRef}
                >
                    <Background
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        color={bg}
                    />
                    <Card
                        username={user}
                        ratings={ratingsToRender}
                        color={cardColor}
                        icon={icon}
                        textColor={textColor}
                        x={CANVAS_WIDTH / 2} 
                        y={CANVAS_HEIGHT / 2} 
                    />
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

export default Canvas