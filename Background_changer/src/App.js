import './App.css';
import {useState} from 'react'

function App() {
  const [color, setColor] = useState('bg-slate-600')

  /*Instead of these functions used an inline arrow function
  
  const green=()=>{
    setColor('bg-green-400')
  }

  const red=()=>{
    setColor('bg-red-400')
  }*/

  return (
    <div className={`h-screen w-full duration-200 ${color}`}>
       <div className="fixed flex justify-center bottom-12 inset-x-0 px-2">
         <div className="flex justify-center shadow-lgpx-3 py-2 rounded-3xl">

          <button onClick={()=> setColor('bg-blue-400')}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
           Button 1
          </button>

          <button onClick={()=> setColor('bg-green-400')} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
            Button 2
          </button>

          <button onClick={()=> setColor('bg-red-400')}  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
            Button 3
          </button>
         </div>
       </div>
      </div>
  );
}

export default App;
