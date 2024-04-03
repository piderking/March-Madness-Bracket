import React, { useState } from 'react';
const plays = [{team: "Sunshiners", text: "You're my sunshisdsunshisdsunshisdsund shisdsunshisdsunshisdn!"}, {team: "Sunshiners", text: "You're my sunshin!"}]


const ParentComponent = ({ children }) => {
    return (
        <div className="flex-1">
            { children }
        </div>
    )
  }
  
  const Play = ({ children, pos}) => {
    return <div className='flex-1 flex flex-col mt-4'>
            <div className="flex-1 ml-8 text-left text-blue-600">{plays[pos].team}</div>
            <div className="flex-2 ml-8 text-left text-wrap" >{plays[pos].text} </div>
        </div>
  }


export function Playbyplay(){
    const [hidden, setHidden] = useState(false)
    const [numChildren, setNumChildren] = useState(0)
    
    const children = []

    for (let i = 0; i < numChildren; i++) {
        children.push(<Play key={i} number={i} pos={i} />)
    }

    const addComponent = () => {
        if (numChildren > plays.length - 1 ){
            console.log("No more plays to add.")
        }else {setNumChildren((count) => count + 1)}
        
        
    }
    const hide = () => {
        setHidden(!hidden)
        console.log(children)
    }
    return (
        <>
            <div className="">
                <button  className='top-2 absolute right-2' onClick={hide}>
                    <img src={hidden ? '/open.png' : "cancel.png"} height={"20px"} width={"20px"}></img>
                </button>
            </div>
            
            <div className={  hidden ? 'hidden ' : ' '  +  "flex-inital w-96 bg-slate-100  overflow-y-auto"}>
                <div className='flex flex-col-reverse bottom-8 absolute '>
                    <div className="flex-inital h-8">
                        
                    </div>
                    <ParentComponent addComponent={addComponent}>{children}</ParentComponent>
                
                </div>
                <button className='ml-8 bg-slate-300 bottom-2 absolute'  onClick={addComponent}>Add another component</button>
            </div>
            
        </>
        
    )
}