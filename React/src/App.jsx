import { useState } from 'react'
import './App.css'
import Form from './component/Form'
import ClassComponent from './component/ClassComponent'

function App() {
  const [count, setCount] = useState(0)
  const Decrement = () => {
    if(count>0){
      setCount((count) => count - 1);
    }
  }

  return (
    <>
    {/* <h1>Counter</h1>

    <p>{count}</p>
    <button onClick={() => setCount((count) => count + 1)}>Increment</button>
    <button onClick={Decrement}>Decrement</button>
    <button onClick={() => setCount(0)}>Reset</button> */}
    <Form/>
    <ClassComponent/>
    </>
  )
}

export default App
