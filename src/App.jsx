import Bracket from "./bracket"
import {Scoreboard} from "./scoreboard"
import {Playbyplay} from "./playbyplay"
import { useState, useEffect } from "react"
import {readRemoteFile} from 'react-papaparse'

let results;


function getRandomScore() {
  return Math.floor(Math.random() * 100);
}

export default function App() {
  const handleBasicFiles = () => {
    readRemoteFile('./March-Madness-Bracket/data.csv', {
    complete: (results) => {
    
      setHome(previousState => {
        return { ...previousState, name:String(results.data[home.row][0]) }
      });
      setAway(previousState => {
        return { ...previousState, name:String(results.data[away.row][0]) }
      });
    },
    })}

  const [home, setHome] = useState({
    name: "",
    row:1,
    score:getRandomScore(),
    twoPointers:0,
    twoPointerAttempts:0,
    threePointers:0,
    threePointerAttempts:0,
    turnovers:0,
    values:{
      "FG%": .500,
      "3P%": .380,
      "Pace": 75.0,
      "3PAr": .400,
      "AST%":50.0,
      "BLK%":8.0,
      "TOV%": 12.0,
    },
    data:{
      
    }
  }) 
  const [away, setAway] = useState({
    name: "",
    row:2,
    score:getRandomScore(),
    twoPointers:0,
    twoPointerAttempts:0,
    threePointers:0,
    threePointerAttempts:0,
    turnovers:0,
    values:{
      "FG%": .500,
      "3P%": .380,
      "Pace": 75.0,
      "3PAr": .400,
      "AST%":50.0,
      "BLK%":8.0,
      "TOV%": 12.0,
    },
  }) 
  useEffect(()=>{
    // Run Once
    handleBasicFiles()
  }, [])

  return (  
    <div className="h-screen flex flex-row">
        <div className="flex-col flex-2 flex">
          <Scoreboard home={home} away={away}/>
          <div className="flex-1 flex flex-row">
            <div className="flex-1"></div>
            <div className="flex-inital text-center w-96">
              <button onClick={handleBasicFiles}>Run</button>
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex-2 flex flex-row">
              <div className="flex-1"></div>
              <div className="flex-inital w-[45vw]  flex flex-row outline rounded-2xl outline-slate-300 outline-[1px]">
                    <div className="flex-1 text-left flex pl-3 flex-col">
                    <p className=" flex-inital h-6 text-l font-roboto pt-3 pl-6 font-medium text-md">{away.name}</p>
                      <div className="flex-inital h-6"></div>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                    </div>
                    <div className="flex-1 text-center flex flex-col ">
                      <p className=" flex-inital h-6 text-l font-roboto pt-3 font-medium text-md">TEAM STATS</p>
                      <div className="flex-inital h-6"></div>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Feild Goal%</p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">3 Point%</p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Free Throw%</p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Offensive Rebound%</p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Defensive Rebound%</p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Assists</p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Blocks</p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs">Turnovers</p>

                      

                      
                    </div>
                    <div className="flex-1 text-right pr-3 flex flex-col">
                    <p className=" flex-inital h-6 text-l font-roboto pt-3 font-medium text-md pr-6">{home.name}</p>
                      <div className="flex-inital h-6"></div>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <div className="flex-inital h-4"></div>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
                      <p className=" flex-inital h-4 text-l font-roboto pt-3 text-xs"></p>
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