import React, { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

export default function CounterControls() {
  const { increment, decrement, reset } = useContext(CounterContext)
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
