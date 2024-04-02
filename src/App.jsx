import Bracket from "./bracket"
import {Scoreboard} from "./scoreboard"
import {Playbyplay} from "./playbyplay"
export default function App() {
  return (
    <div className="h-screen flex flex-row">
        <div className="flex-col flex-2 flex">
          <Scoreboard />
          <div className="flex-1"></div>
        </div>
        <Playbyplay />
        
      


    </div>
  )
}