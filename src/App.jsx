import Bracket from "./bracket"
import {Scoreboard} from "./scoreboard"
import {Playbyplay} from "./playbyplay"
import { useState, useEffect } from "react"
import {readRemoteFile} from 'react-papaparse'


import { plays } from './playbyplay'

const order = {
  "UConn":0,
  "Purdue":1,
  "Tennesse":2,
  "Illinois":3,
  "Alabama":4,
  "Duke":5,
  "Clemson":6,
  "NC State": 7
}

function getRandomScore() {
  return Math.floor(Math.random() * 100);
}
let val = 5
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
    score:99,
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
    score:99,
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
  const changeTeam = (homeTeam, awayTeam) =>{
    readRemoteFile('./March-Madness-Bracket/data.csv', {
      complete: (results) => {
      
        setHome(previousState => {
          return { ...previousState, name:homeTeam, row:order[homeTeam], score:0 }
        });
        setAway(previousState => {
          return { ...previousState, name:awayTeam, row:order[awayTeam], score:0 }
        });
      },
      })
  }
  const change = () => {
    changeTeam(document.getElementById("homeTeam").value, document.getElementById("awayTeam").value)
  }
  const startGame = () => {
    plays.clearPlays()

    console.log(plays.data)

    // for loop
    for(let i=0; i<val; i++){
      plays.data.push({team:home.name, text:getRandomScore()})
    }
    val -= 1
    
  }
  const reset = () => {
    plays.clearPlays()
    
  }
  

  return (  
    <div className="h-screen flex flex-row">
        <div className="flex-col flex-2 flex">
          <Scoreboard home={home} away={away}/>
          <div className="flex-1 flex flex-row">
            <div className="flex-1"></div>
            <div className="flex-inital text-center w-96 flex flex-col">
              
              <div className="flex-1"></div>
              <div className="flex-1">
                <button onClick={startGame} >{'Run'}</button>
                <button onClick={reset} className="pl-4">{'Reset'}</button>
                <button onClick={change} className="pl-4">{'Change Team'}</button>
              </div>
              <div className="flex-1 text-left">
                <label className="pr-2">
                  Away: 
                  <input id="awayTeam" />
                </label>
                <hr />
                <label className="pr-2">
                  Home: 
                  <input id="homeTeam" />
                </label>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex-inital h-56 flex flex-row">
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