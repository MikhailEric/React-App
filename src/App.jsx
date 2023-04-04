import { useState, useEffect } from 'react'
import Die from "../src/Components/Die"
import Dots from "./Components/Dots"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0);
  const [dots, setDots] = useState([])
  const [bestTime, setBestTime] = useState(
    () => JSON.parse(localStorage.getItem("bestTime")) || []
  )

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true)
    };
  }, [dice])


  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    } 
    return newDice
  }


  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDice()
      }))
      setCount(prevCount => prevCount + 1)
    } else {
      setTenzies(false);
      setDice(allNewDice())
      setCount(0)
    }
  }


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} : 
          die
    }))
  }

  // function holdDice(id) {
  //   setDice(oldDice => oldDice.forEach(die => {
  //     return die.id === id ? {...die, isHeld: !die.isHeld} : die
  //   }))
  // }


  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      id={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />
  ))

  // const dotsElements = dice.map(die => {
  //   for (let i = 0; i < die.value * 1; i++) {
  //     return <Dots value={die.value}/>
  //   }
  // })

  return (
    <main className='flex justify-center items-center h-screen w-full bg-[#0B2434] p-4 mx-auto'>
      <div className="flex flex-col justify-around items-center mx-auto h-[640px] w-[900px] bg-[#F5F5F5] rounded-lg">
        {tenzies && <Confetti />}
        <h1 className="text-[70px] font-bold">Tenzies</h1>
        <p className="text-[30px] text-stone-500 text-center max-w-[600px]">Roll until all dice are the same. Click each die to freeze it as its current value between rolls.</p>
        <div className="max-h-[250px] max-w-[600px] container grid grid-cols-5 grid-rows-auto gap-[20px] mb-10">
          {diceElements}
        </div>
        <button 
          onClick={rollDice} 
          className="bg-[#5035ff] h-[55px] w-[150px] text-[20px] text-white font-semibold rounded-lg border-none active:shadow-black/80 active:shadow-inner focus:outline-none cursor-pointer"
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="round-info">
          <h1 className="text-black text-[30px] font-bold">
            Number of Rolls: <span className="text-accent text-[30px]">{count}</span>
          </h1>
        </div>
        <h4>{tenzies}</h4>
        <div className="grid grid-rows-2 grid-cols-2">
          {dotsElements}
        </div>
      </div>
    </main>
  )
}

// export default App
