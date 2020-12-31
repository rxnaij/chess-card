import React from 'react'
import { LichessRating } from '../types'

import knightIcon from "./assets/icons/icons8-knight-100-2.png"
import styles from './CardEditor.module.css'

interface CardEditorProps {
    username: string,
    ratings: Array<LichessRating>
}

/**
 * Returns the coresponding icon for a given time control/game type.
 * The returned icon should be rendered in the Lichess font.
 * @param name the name of the time control
 */
const getIcon = (name: string) => {
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

export default function CardEditor(props: CardEditorProps) {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img className={styles.coverimage} src={knightIcon} alt="knight chess piece" />
            </div>
            <div className={styles.profile}>
                <div className={styles.username}>
                    @{props.username}
                </div>
                <div className={styles.ratings}>
                    <ul>
                        {
                            props.ratings.map(rating => (
                                <li key={rating.name}>
                                    <i className="icon">{getIcon(rating.name)}</i> <span>{rating.points[0][3]}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
