import React, { useState } from 'react';

export function Scoreboard({children, home, away}) {
    
    
    
    
    
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
        <div className="flex-3 border-t-[1px] border-slate-200 flex flex-row">
            <div className="flex-inital w-12"></div>
            <div className="flex-1 flex flex-row">
                <div className="flex-1"></div>
                <div className="flex-inital w-[40vw] flex flex-col ">
                    <div className="flex-1 text-center flex flex-col">
                        <div className="flex-1"></div>
                        <div className="flex-1">
                            
                        </div>
                    </div>
                    <div className="flex-4 bg-slate-700 rounded-2xl  text-white text-center flex flex-row">
                        <div className="flex-1 flex flex-row">
                            <div className="flex-1"></div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex-1"></div>
                                <div className="flex-2 text-l">{away.name}</div>
                                <div className="flex-inital h-24 bg-slate-900 rounded-md flex flex-col ">
                                    <div className="flex-1"></div>
                                    <div className="flex-1 text-orange-600 text-4xl font-scoreboard">{away.score}</div>
                                    <div className="flex-1"></div>
                                </div>
                                <div className="flex-2"></div>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                        <div className="flex-1 flex flex-row">
                            <div className="flex-1"></div>
                            <div className="flex-1 flex flex-col">
                                <div className="flex-1"></div>
                                <div className="flex-2 text-l">{home.name}</div>
                                <div className="flex-inital h-24 bg-slate-900 rounded-md flex flex-col ">
                                    <div className="flex-1"></div>
                                    <div className="flex-1 text-orange-600 text-4xl font-scoreboard">{home.score}</div>
                                    <div className="flex-1"></div>
                                </div>
                                <div className="flex-2"></div>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                        
                    </div>
                    <div className="flex-1"></div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-inital w-12"></div>
            

        </div>
    )
}