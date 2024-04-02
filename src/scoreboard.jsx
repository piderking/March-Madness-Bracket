import React, { useState } from 'react';
function getRandomScore() {
    return Math.floor(Math.random() * 140);
  }
export function Scoreboard() {
    
    const [gameNumber, setGameNumber] = useState(0);

    const playGame = () =>{
        setGameNumber(gameNumber + 1)
        if (gameNumber > 7){
            setGameNumber(1)   
            home.wins = 0
            away.wins = 0
        }
        console.log("Simulate Game #" + gameNumber)
        away.score = getRandomScore()
        home.score = getRandomScore() * 1.5

        if (away.score > home.score){
            away.wins += 1
        } else if (home.score > away.score){
            home.wins += 1
        } 

        if (home.wins >= 4 || away.wins >= 4){
            setGameNumber(0)   
            home.wins = 0
            away.wins = 0
            console.log("Home or AWay Won!")
        }
        
        
        
    }
    const [away, setAway] = useState({
        name: "Away",
        wins:0,
        score: 0,
    });
    const [home, setHome] = useState({
        name: "Home",
        wins: 0,
        score: 0,
    });
    
    
    const getStatus = () => {
        if(home.wins === 0 && away.wins === 0){
            return "Bracket Starting"
        }else if(home.wins === away.wins){
            return "Tied at " + home.wins + " wins"
        }else if (home.wins > away.wins){
            return home.name + " is ahead at " + home.wins + "-" + away.wins
        }
        else if (away.wins > home.wins){
            return away.name + " is ahead at " + away.wins + "-" + home.wins
        }
    }
    
      
    return (
        <div className="flex-1 border-t-[1px] border-slate-200 flex flex-row">
            <div className="flex-inital w-12"></div>
            <div className="flex-1 flex flex-row">
                <div className="flex-1"></div>
                <div className="flex-3 flex flex-col ">
                    <div className="flex-1 text-center flex flex-col">
                        <div className="flex-1"></div>
                        <div className="flex-1">
                            <p>Game { gameNumber } — {getStatus()}</p>
                        </div>
                    </div>
                    <div className="flex-4 bg-slate-700 rounded-2xl text-white text-center flex flex-col">
                        <div className="flex-1"></div>
                        <div className="flex-2 flex flex-row">
                            <div className="flex-2"></div>
                            <div className="flex-3">
                                <p className="font-scoreboard text-2xl">{ away.name }</p>
                            </div>
                            <div className="flex-2"></div>
                            <div className="flex-3">
                                <p className="font-scoreboard text-2xl"> { home.name }</p>
                            </div>
                            <div className="flex-2"></div>
                        </div>
                        
                        <div className="flex-3 flex flex-row">
                            <div className="flex-1"></div>
                            <div className="flex-inital w-24 flex flex-col text-center bg-black rounded-xl text-orange-600 font-scoreboard">
                            <div className="flex-1"></div>
                            <div className="flex-1">
                                <p className="text-4xl">{ away.score }</p>
                            </div>
                            <div className="flex-1"></div>
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex-inital w-24 flex flex-col text-center bg-black rounded-xl text-orange-600 font-scoreboard">
                            <div className="flex-1"></div>
                            <div className="flex-1">
                                <p className="text-4xl">{ home.score }</p>
                            </div>
                            <div className="flex-1"></div>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                        <div className="flex-2"></div>
                    </div>
                    <div className="flex-1"></div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-inital w-12"></div>
            

        </div>
    )
}