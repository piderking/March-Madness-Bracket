import React, { useState } from 'react';

function Plays(){
    const [plays, setPlays] = useState([{name: "Troy", team: "NBA"}])

    const getPlays = () => {
        return plays.map((play) => <div className='flex-1 flex flex-col'>
            <div className="flex-1 ml-8 text-left text-blue-600">{play.team}</div>
            <div className="flex-2 ml-8 text-left">{play.name} scored a half-court</div>
        </div>);
    }
    return (
        <div className='flex flex-col'>
            <div className="flex-inital h-4"></div>
            { getPlays() }
            <div className="flex-inital h-12">
                <button onClick={()=>{
                    plays.push({name: "Tray", team: "NBA"})
                }}> Go! </button>
            </div>
        </div>
    )
}
export function Playbyplay(){
    const [hidden, setHidden] = useState(false)

    const hide = () => {
        setHidden(!hidden)
    }
    return (
        <>
            <div className="">
                <button  className='top-2 absolute right-2' onClick={hide}>
                    <img src={hidden ? '/open.png' : "cancel.png"} height={"20px"} width={"20px"}></img>
                </button>
            </div>
            
            <div className={  hidden ? 'hidden ' : ' '  +  "flex-1 bg-slate-100"}>
                <Plays />
            </div>
            
        </>
        
    )
}