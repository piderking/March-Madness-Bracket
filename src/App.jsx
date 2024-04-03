import Bracket from "./bracket"
import {Scoreboard} from "./scoreboard"
import {Playbyplay} from "./playbyplay"
import { useState } from "react"
export default function App() {
  const [home, setHome] = useState({
    name: "Lebrawns",
    score:0,
  }) 
  const [away, setAway] = useState({
    name: "Away Lebrawns",
    score:0,
  }) 
  return (
    <div className="h-screen flex flex-row">
        <div className="flex-col flex-2 flex">
          <Scoreboard home={home} away={away}/>
          <div className="flex-1"></div>
          <div className="flex-inital h-[25vh] flex flex-row">
              <div className="flex-1"></div>
              <div className="flex-inital w-[30vw]  flex flex-row outline rounded-2xl outline-slate-300 outline-[1px]">
                    <div className="flex-1 text-left flex pl-3 flex-col">
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 font-medium text-xs">TEAM STATES</p>
                      <div className="flex-inital h-6"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">12/16</p>
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 text-xs">75%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">4/16</p>
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 text-xs">25%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">4</p>
                    </div>
                    <div className="flex-1 text-center flex flex-col ">
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 font-medium text-xs">TEAM STATES</p>
                      <div className="flex-inital h-6"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">2 pointers</p>
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 text-xs">2 pointer%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">3 pointers</p>
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 text-xs">Three point%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">Turnovers</p>
                      

                      
                    </div>
                    <div className="flex-1 text-right pr-3 flex flex-col">
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 font-medium text-xs">TEAM STATES</p>
                      <div className="flex-inital h-6"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">12/16</p>
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 text-xs">75%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">4/16</p>
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 text-xs">25%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-5 text-l font-roboto pt-3 text-xs">4</p>
                    </div>
              </div>
              <div className="flex-1"></div>
          </div>
          <div className="flex-inital h-8"></div>
    
        </div>
        <Playbyplay home={home} away={away}/>
        
      


    </div>
  )
}