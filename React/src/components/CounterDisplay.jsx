import React, { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

export default function CounterDisplay() {
  const { count } = useContext(CounterContext)
  return (
    <div style={{ margin: '8px 0', fontSize: 20 }}>
      <strong>Count:</strong> {count}
    </div>
  )
}
