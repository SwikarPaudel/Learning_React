import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  let newArray = [1, 2, 3, 4, 5]

  return (
    <>
      <h1 className="text-3xl font-bold underline ">Tailwind test</h1>
     <Card username="Bored Ape Yacht Club" productCode={245} price={0.01} />
     <Card username="CryptoPunks" productCode={678} price={0.02} />
     <Card productCode={678} price={0.02} />
    </>
  )
}

export default App
