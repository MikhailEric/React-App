import React from "react"
import Die from "/.Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(
        () => JSON.parse(localStorage.getItem("bestTime")) || []
    )

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true)
        };

        if (tenzies) {
            localStorage.setItem("bestTime", JSON.stringify(trackWinTime()))
        }
    }, [dice]);

    /*--- A Helper Function ---*/
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const time = new Date();
    const startTime= time;
    const endTime = time;
    let winTime;

    function trackWinTime() {
        if (!tenzies) {
            return startTime.getUTCMinutes();
        } else {
            winTime = startTime - endTime;
        }
        return winTime
    }

    // function trackWinTime() {
    //     const currentTime = startTime
    //     if (!tenzies) {
    //         return currentTime;
    //     } else if(tenzies) {
    //         winTime = endTime - currentTime
    //     }
    //     return winTime
    // }

    /*-------------------------*/

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice;
    }


    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
            setCount(prevCount => prevCount + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setCount(0)
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                { ...die, isHeld: !die.isHeld } : 
                die 
        }))
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
            die={die}
        />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it as its current value between rolls</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            <div className="round-info">
                <h1>You Rolled {count} Times</h1>
                <h2>You start time was {startTime} - Your end time was {endTime}. You won in {trackWinTime()} time</h2>
            </div>
        </main>
    )
}