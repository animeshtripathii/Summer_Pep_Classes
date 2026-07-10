import './App.css'
import UseCallbackExample from './component/UseCallback'
import { CounterProvider } from './context/CounterContext'
import CounterDisplay from './components/CounterDisplay'
import CounterControls from './components/CounterControls'

function App() {
  return (
    <>
      <UseCallbackExample />

      <hr />

      <CounterProvider>
        <h2>Context API Counter Example</h2>
        <CounterDisplay />
        <CounterControls />
      </CounterProvider>
    </>
  )
}

export default App
