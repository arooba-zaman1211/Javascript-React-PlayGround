import './App.css'
import { useState,useCallback,useEffect } from 'react'
import App2 from './App2.jsx'

function App() {

  //States that are changing
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useCallback hook:cache a function definition between re-renders cause this is happening over and over again
  const generatePassword= useCallback(
    () => {
      let pass = ""
      let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

      if(charAllowed) str += '!@#$%^&*()-_+=[]{}|;:,.<>?'

      if(numberAllowed) str += '0123456789'
      
      for(let i=1; i< length; i++)
      {
        const char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)
    },[length, numberAllowed,charAllowed]
  )
  
  // Use Effect hook: to capture anything changing at the time of change 

  useEffect(() => {
    generatePassword()
  },
  [length, charAllowed, numberAllowed])
  
  // copying the password
  const copyPasswordToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Password Generator</h1>
        
        <div className="flex mb-4">
          <input type="text" className="border border-gray-300 px-4 py-2 mr-2 w-64" value={password} readOnly/>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick = {copyPasswordToClipboard}>Copy</button>
        </div>
        
        <div className="mb-4">
          <input type="checkbox" id="includeChars" className="mr-2"
          defaultChecked={charAllowed}
          onChange={
            ()=>{setCharAllowed(
              (prev) => !prev
            )}
          }/>
          <label htmlFor="includeChars">Include Characters</label>
        </div>
        
        <div className="mb-4">

          <input type="checkbox" id="includeNumbers" className="mr-2" 
          defaultChecked={numberAllowed}
          onChange={() => {setNumberAllowed((prev)=> !prev)}}/>

          <label htmlFor="includeNumbers">Include Numbers</label>

        </div>
        
        <div className="mb-4">

          <label htmlFor="passwordLength">Password Length:</label>

          <input type="range" id="passwordLength" min={6} max={20} value={length} className="ml-2 cursor-pointer"
          onChange={(e) => setlength(e.target.value)}/>

          <span className="ml-2">{length}</span>
        </div>

      </div>
      <App2/>
    </>
  );
}

export default App
