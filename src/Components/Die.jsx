import Dots from "./Dots"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    // const dotsElements = props.die.map(die => {
    //     return <Dots />
    // })
    return (
        <div 
            style={styles} 
            className="die-face h-[60px] w-[60px] flex justify-center items-center shadow-lg shadow-black/40 rounded-lg border-none cursor-pointer"
            onClick={props.holdDice}
        >
            <h2 className="text-black text-[30px] font-bold">
                {props.value}
            </h2>
        </div>
    )
}