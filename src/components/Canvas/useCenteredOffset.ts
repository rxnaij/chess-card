import Konva from 'konva';
import { useState, useEffect, MutableRefObject } from 'react';

function useCenteredOffset<T,>(value: T, nodeRef: MutableRefObject<Konva.Node>) {
    const [ offset, setOffset ] = useState<number[]>([0, 0])
    useEffect(() => {
        setOffset([
            nodeRef.current ? nodeRef.current.getClientRect().width / 2 : 0,
            nodeRef.current ? nodeRef.current.getClientRect().height / 2 : 0
        ])
    }, [ value, nodeRef ]);
    return [ offset ];
}

function useCenteredOffsetX<T,>(value: T, nodeRef: MutableRefObject<Konva.Node>) {
    const [ offset, setOffset ] = useState<number>(0)
    useEffect(() => {
        setOffset(nodeRef.current ? nodeRef.current.getClientRect().width / 2 : 0)
    }, [ value, nodeRef ]);
    return [ offset ];
}

export { useCenteredOffset, useCenteredOffsetX };