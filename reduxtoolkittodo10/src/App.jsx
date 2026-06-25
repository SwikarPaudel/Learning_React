import { useState } from 'react'

import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-wrap justify-center item-center h-screen w-full'>
      
      <div className='flex flex-col'>
        <div>
          <AddTodo />
        </div>
      
      <div className='w-full'>
        <Todos />
      </div>

      </div>
      
      
    </div>
  )
}

export default App
