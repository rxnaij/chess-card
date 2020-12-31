import React from 'react'

function Description() {
    return (
        <div>
          <p><a className="hover:underline hover:text-color-blue" href="#">How does it work?</a></p>
          <p className="hidden">I ask the <a href="https://lichess.org/api">Lichess API</a> to send me data about your ratings. It's all publicly accessible. </p>
        </div>
    )
}

export default Description
