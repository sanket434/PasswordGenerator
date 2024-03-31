import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLenght] = useState(8);
  const [numAllowed, setNumAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const passwordref= useRef(null);

  const PasswordGenerator=useCallback(()=>{  // useCallback is a hook 
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers="0123456789";
    let char="!@#$%^&*~";
    if(numAllowed){
      str+=numbers;
    }
    if(charAllowed){
      str+=char;
    }

    for (let i = 1; i <=length; i++) {
      let index=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(index);
    }
    setPassword(pass)

  },[length,numAllowed,charAllowed,setPassword])

  const CopyPassword= useCallback(()=> {
     passwordref.current?.select()
     window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{                  // hook
     PasswordGenerator();
  },[length,numAllowed,charAllowed,PasswordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-slate-600'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-10">
       <input type="text" value={password}
       className='outline-none w-full py-1 px-3'
       placeholder='password'
       readOnly
       ref={passwordref}
      />
      <button onClick={CopyPassword} className='outline-none bg-white mx-4 rounded-md shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e)=>{setLenght(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
           defaultChecked={numAllowed}
           id="numberInput"
           onChange={()=>{
              setNumAllowed((prev)=>!prev);
           }}
          />
          <label>IsNumberAllowed</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
           defaultChecked={charAllowed}
           id="charInput"
           onChange={()=>{
              setCharAllowed((prev)=>!prev);
           }}
          />
          <label>IsCharAllowed</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
