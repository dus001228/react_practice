import React,{useState} from "react";
import OddEventResult from "./OddEvenResult";


const Counter = (props) => {

    const[count, setCount] = useState(props.initialValue);
    const onIncress = () =>{
        setCount(count + 1);
    }
    const onDecrease = () =>{
        setCount(count - 1);
    }
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncress}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEventResult count = {count}/>
        </div>
    )
};

Counter.defaultProps={
    initialValue:0
}

export default Counter