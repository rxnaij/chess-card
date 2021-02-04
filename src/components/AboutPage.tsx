import React from 'react'
import { Link } from 'react-router-dom'

function AboutPage() {
    return (
        <div className="prose prose-red">
          <Link to="/"><span className="inline-block underline text-brand-white mb-4">Back to home page</span></Link>
          <h1>About Chess Cyber-Card</h1>
          <p>So you’ve watched The Queen's Gambit, you've made an online chess account, and you’re ready to move your pieces to glory.</p>
          <p>Chess Cyber-Card lets you create a neat playercard so you can let your friends know that you're ready to throw it down over the board! Load in your player data, customize the card to your liking, and you're ready to show off your chess skills!</p>
          <h2 className="text-brand-white">What kind of data does this site use?</h2>
          <p>Currently, we only use your Lichess account's username and rating, both of which are publicly accessible on Lichess.</p>
          <p>Support for Chess.com accounts will come at some point!</p>
          <h2>Where can I contribute?</h2>
          <p>Check out the source code on <a href="https://github.com/rxnaij/chess-card" className="hover:underline">GitHub</a>.</p>
        </div>
    )
}

export default AboutPage
