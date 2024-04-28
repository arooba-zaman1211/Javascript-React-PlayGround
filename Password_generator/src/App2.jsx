import React from 'react'
import { useState,useCallback,useEffect,useRef } from 'react'

function App2() {

	const [charAllowed, setCharAllowed] = useState(false)
	const [numberAllowed, setNumberAllowed] = useState(false)
	const [length, setlength] = useState(8)
	const [password,setpassword] = useState('')

	// To make the code re-render over and over again
	const generatePassword = useCallback(
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
		setpassword(pass)
	  },
	  [length, charAllowed, numberAllowed],
	)
	
	// To capture the changes happening right now 
	useEffect(() => {
	  generatePassword()
	}, [length, charAllowed, numberAllowed])
	
	const copyPasswordToClipboard = ()=>{
		window.navigator.clipboard.writeText(password)
		//password ref has selected whatever is to be selected or shown selected
		passwordRef.current?.select()
	}

	//Grab anything from the windows
	const passwordRef = useRef(null)

  return (
	<>
		<div className="container mx-auto mt-8 px-4 py-12">
			<h1 className="text-3xl font-bold mb-4">Password Generator (Practice)</h1>
			
			<div className="flex mb-4 ">
				<input type="text" className="border border-gray-300 px-4 py-2 mr-2 w-64" value={password} readOnly
				ref={passwordRef}/>

				<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={copyPasswordToClipboard}>Copy</button>
			</div>
			
			<div className="mb-4">
				<input type="checkbox" id="includeChars" className="mr-2" defaultChecked={charAllowed} onChange={()=> setCharAllowed((prev) => !prev)}/>
				<label htmlFor="includeChars">Include Characters</label>
			</div>
			
			<div className="mb-4">
				<input type="checkbox" id="includeNumbers" className="mr-2" defaultChecked={numberAllowed} onChange={()=> setNumberAllowed((prev) => !prev)}/>
				<label htmlFor="includeNumbers">Include Numbers</label>
			</div>
			
			<div className="mb-4">
				<label htmlFor="passwordLength">Password Length:</label>
				<input type="range" id="passwordLength" min="4" max="20" value={length} className="ml-2" onChange={(e) => setlength(e.target.value)} />
				<span className="ml-2">{length}</span>
			</div>
			
		</div>

	</>
  )
}

export default App2