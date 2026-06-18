import { useState, useCallback, useEffect, useRef } from "react"
/*
useCallback is a React hook that lets you
cache a function definition between re-renders.

Syntax:
useCallback(function, dependencies)
*/ 


function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")

    //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let password = ""
    let charactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numbers) charactersSet += "0123456789"
    if(characters) charactersSet += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    for(let i = 1; i <=length; i++){
      let char = Math.floor(Math.random() * charactersSet.length + 1)
      password += charactersSet.charAt(char)
    }

    setPassword(password)

  }, [length, numbers, characters, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, characters, passwordGenerator])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-2 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="Password"
            readOnly 
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='cursor-pointer outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        {/*  Characters length */}
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min="6"
          max="100"
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label htmlFor="lengthInput">Length({length})</label>
        </div>
         {/* Include Numbers */}
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          className='cursor-pointer'
          defaultChecked={numbers}
          id="numberInput"
          onChange={() => setNumbers(prev => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type="checkbox"
          className='cursor-pointer'
          defaultChecked={characters}
          id="characterInput"
          onChange={() => setCharacters(prev => !prev)}
          />
          <label htmlFor="characterInput">Special Characters</label>
        </div>
        
      </div>
    </div>
  )
}

export default App