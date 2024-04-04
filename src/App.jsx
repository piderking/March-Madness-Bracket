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
      posessions:0,
      total_posessions:0,
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
  const changeTeam = (isHome, teamName) =>{
    console.log(teamName)
    if(order[teamName] === undefined || teamName === home.name || teamName === away.name ){
      if(teamName === home.name || teamName === away.name){
        alert("new name is the same as an exisiting one")
      }
      console.log("Unknown")
      return
    }
    readRemoteFile('./March-Madness-Bracket/data.csv', {
      complete: (results) => {
        plays.clearPlays()
        if(isHome){
          setHome((previous)=>{
            return {...previous, name:teamName, row:order[teamName], score:0, values:{...previous.values, "FG%":results.data[order[teamName]+1][1], "3P%":results.data[order[teamName]+1][2]}}
          })
          
        }else{
        
          setAway((previous)=>{
            return {...previous, name:teamName, row:order[teamName], score:0, values:{...previous.values, "FG%":results.data[order[teamName]+1][1], "3P%":results.data[order[teamName]+1][2]}}
          })
        }
      },
      })
      
  }
  
  const startGame = () => {
    plays.clearPlays()

    console.log(plays.data)

    // for loop
    for(let i=0; i<val; i++){
      plays.data.push({team:home.name, text:getRandomScore()+" "+home.values["FG%"]+" "+home.row})
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
              <div className="flex-1 flex flex-row">
                <div className="flex-1">
                  <button onClick={startGame} className="rounded-md bg-slate-200 p-2" >{'Run'}</button>
                </div>
                <div className="flex-1">
                  <button onClick={reset} className="rounded-md bg-slate-200 p-2">{'Reset'}</button>

                </div>
                
              </div>
              <div className="flex-1 text-left flex flex-col bg-slate-400 rounded-md">
                <label className="ml-2 pr-2 pt-2 flex-1">
                  Away: 
                  <input id="awayTeam" onChange={e => {changeTeam(false, e.target.value)}} className=" bg-slate-200 w-80 rounded-sm"/>
                </label>
                <hr />
                <label className="pr-2 ml-2 mt-1 flex-1">
                  Home: 
                  <input id="homeTeam"onChange={e => {changeTeam(true, e.target.value)}} className=" bg-slate-200 w-80 rounded-sm" />
                </label>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex-inital h-10"></div>
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
        <Playbyplay home={home} away={away} />
        
      


    </div>
  )
}