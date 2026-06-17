import { useState } from 'react'
import Test from './test'

function App() {
  let [count, setCount] = useState(0)
  const maxValue = 20
  const minValue = 0

  const addValue = () => {
    if (count < maxValue) {
      setCount(count + 1)
    }
  }
  const removeValue = () => {
    if (count > minValue) {
      setCount(count - 1)
    }
  }

  return (
    //React Fragment
    <>  
    <Test />  
    <h1>count is {count}</h1>
    <button onClick={addValue}>
      Add Value
      </button>

    <button onClick={removeValue}>
      Remove Value
      </button>
    </>
  )
}

export default App
