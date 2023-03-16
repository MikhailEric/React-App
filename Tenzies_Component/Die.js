import React from "react"
import Dots from "./Dots"

export default function Die(props) {
    const [dots, setDots] = React.useState(Math.ceil(Math.random() * 6))
    
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    /*------------------------*/
    // This is meant to put Real Dots on the dice
    const dotElements = props.die.map(die => {
        for (let i = 0; i < props.value.length; i++) {
            return <Dots />
        }
    })

    /*--------------------------*/
    
    return (
        <div 
            style={styles} 
            className="die-face" 
            onClick={props.holdDice}
        >
            {/*<h2 className="die-num">{props.value}</h2>*/}
            {dotElements}
        </div>
    )
}