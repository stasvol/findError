import React, {useState} from "react";

const CountNew =()=> {

  const [count,setCount] = useState(0)
  const [step, setStep] = useState(1)

    const handleChange =(e)=> {

        const value =+(e.target.value)
        setStep( value)
  }

    return(
        <div className={'count'}  >
            <h2>{count}</h2>

            <button type={"button"} onClick={()=>setCount(0)}>clear</button>
            <input type={'range'} value={count}  name={'step'} onChange={handleChange} min={0} max={10} />
            <input className={'inp1'} type={'text'} value={step} name={'step'} onChange={handleChange}/>
            <button type={"button"} onClick={()=>setCount(count-step)}>-</button>
            <button type={"button"} onClick={()=>setCount(count+step)}>+</button>
        </div>
    )

}


export default CountNew

// class Provider extends React.Component {
//     componentDidMount() {
//         const {store} = this.props;
//         store.subscribe(this.handleUpdate);
//     }
//
//     handleUpdate = () => {
//         this.forceUpdate();
//     }
//
//     render() {
//         const {store, children} = this.props;
//
//         return <Context.Provider value={{ store }}>{children}</Context.Provider>
//     }
//
// }