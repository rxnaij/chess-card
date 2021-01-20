import React from 'react'


function AboutPage() {
    return (
        <div className="prose text-brand-white">
          <h1>What is this?</h1>
          <p>So you’ve made an online chess account, and you’re ready to throw it down on the board with friends!</p>
          <p>Chess Card is a simple app that creates a playercard that you can share with friends. Simply customize your playercard and add it to your Instagram story!</p>
          <h1 className="text-brand-white">How does this work?</h1>
          <p>I ask the <a className="text-brand-white" href="https://lichess.org/api">Lichess API</a> to send me data about your ratings. It's all publicly accessible. </p>
          <p></p> 
        </div>
    )
}

export default AboutPage
