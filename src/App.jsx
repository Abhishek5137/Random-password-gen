import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] =useState(false);
  const [charAllowed , setCharAllowed]  = useState(false);
  const [password , setPassword] = useState("");
 // const [copyText,setCopyText] = useState("copy")
  

// use hook useRef
     const passwordRef = useRef(null)
  // use of useCallback hook
  const passwordGenerator = useCallback(()=>{

                  let pass=""
                  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
              
            if (numberAllowed) str +="0123456789";
                if(charAllowed) str +="~!@#$%^&*(){}[]";

                for (let i = 0; i <= length; i++) {
                    let char= Math.floor(Math.random()*str.length+1);
                      pass +=str.charAt(char)
    
                    }
                     setPassword(pass)
     } ,[length,numberAllowed,charAllowed,setPassword ])
 
  const  copyPassword = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password) 
    
    

  }, [password ])


     useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator ])



  return (
    <>
      
      <div className='w-full max-w-md  mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden p-4 '>
    
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3  rounded '
          placeholder='Password'
          readOnly
          ref={passwordRef}
          
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500'
           onClick={copyPassword}
          
          >  copyText</button> 

        </div>

        <div className='flex text-sm gap-x-2 pb-3'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={20}
            value={length}
            className=' cursor-pointer'
            onChange={(e) =>{ setLength(e.target.value)}}
            />
            <label > lenght:{length}</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked= {numberAllowed}
            
            onChange={(e) =>{ setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor='numberInput' > Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked= {charAllowed}
            
            onChange={(e) =>{ setCharAllowed((prev) => !prev)}}
            />
            <label htmlFor='charactorInput' > Charactors</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
