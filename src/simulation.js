import { plays } from './playbyplay'

function random(min, max) { // assumes equally likely
    return Math.floor(Math.random() * max) + min
}

function prob(pct) { // out of 100
    return random(1, 100) <= pct
}

function simFT(bstats, times) {
    let FTstats = { FTM: 0, FTA: 0, pts: 0 }
    for (let i = 1; i <= times; i++) {
        FTstats.FTA += 1
        let ftm = prob(bstats["FT%"] * 100)
        if (ftm) {
            // TODO Replace console.log with this structure and make nice and prettier 
            plays.data.push({team: bstats["School"], text: `Team made free throw ${i} of ${times}` })
            FTstats.FTM += 1
            FTstats.pts += 1
        } else {
            plays.data.push({team: bstats["School"], text: `missed the free throw ${i} of ${times}` })
        }
    }
    return FTstats
}

function simPossession([ot, otadv], [dt, dtadv]) {
    // each teams stats in this possession
    let ostats = { points: 0, orebounds: 0, assists: 0, turnovers: 0, FGM: 0, FGA: 0, FTM: 0, FTA: 0 }
    let dstats = { drebounds: 0, steals: 0, blocks: 0, pf: 0 }

    // amount of passes made during possesion
    let passes = random(0, 3)

    // chance to turnover during possesion
    let tov = prob(otadv["TOV%"] + passes)
    if (tov) { // ball turned over
        ostats.turnovers += 1
        dstats.steals += 1
        console.log(`${ot["School"]} turned the ball over`)
        console.log(`${dt["School"]} stole the ball`)
        return [ostats, dstats]
    }

    // probability to shoot 2 or 3
    let fga3 = prob(otadv["3PAr"] * 100)

    // calculate if shot was made + fouls
    let fgm, pts
    let blk, ast, orb
    ostats.FGA += 1
    let foul = false
    if (!fga3) { // 2pt FGA
        console.log(`${ot["School"]} attempts a 2`)

        // chance for shot to be blocked
        blk = prob(dtadv["BLK%"])
        if (blk) {
            dstats.blocks += 1
            console.log(`${dt["School"]} blocked the shot`)
            return [ostats, dstats]
        }

        fgm = prob(ot["FG%"] * 100)
        pts = 2
        foul = prob((2 / otadv["FTr"]) * 2)
    } else { // 3pt FGA
        console.log(`${ot["School"]} attempts a 3`)

        fgm = prob(ot["3P%"] * 100)
        pts = 3
    }

    // if shot was made or missed...
    if (fgm) { // field goal made
        ostats.FGM += 1
        if (foul) {
            dstats.pf += 1
            console.log(`${ot["School"]} made the shot and got fouled`)
            let { FTM, FTA, pts } = simFT(ot, 1)
            ostats.FTM += FTM
            ostats.FTA += FTA
            ostats.points += pts
        } else {
            console.log(`${ot["School"]} made the shot`)
        }
        // find assists
        if (passes >= 1) {
            ast = prob(otadv["AST%"])
            if (ast) ostats.assists += 1
        }

        // add points
        ostats.points += pts

        // end possession
        return [ostats, dstats]
    } else { // field goal missed
        if (foul) {
            dstats.pf += 1
            console.log(`${ot["School"]} missed the shot and got fouled`)
            let { FTM, FTA, pts } = simFT(ot, 2)
            ostats.FTM += FTM
            ostats.FTA += FTA
            ostats.points += pts
            // return [ostats, dstats]
    } else {
            console.log(`${ot["School"]} missed the shot`)
        }

        // add offensive rebounds
        orb = prob(otadv["ORB%"])
        if (orb) {
            console.log(`${ot["School"]} got the rebound`)
            let [ros, rds] = simPossession([ot, otadv], [dt, dtadv])
            ros.orebounds += 1
            return [ros, rds]
        } else {
            dstats.drebounds += 1
            console.log(`${dt["School"]} got the rebound`)    
        }

        return [ostats, dstats]
    }
}

let team1 = {
    basic: {
        "School": "UCONN",
        "FG%": .500,
        "3P%": .380,
        "FT%": .700
    },
    advanced: {
        "Pace": 70.0,
        "FTr": .375,
        "3PAr": .400,
        "AST%": 50.0,
        "BLK%": 8.0,
        "TOV%": 12.0,
        "ORB%": 25.0
    }
}

let team2 = {
    basic: {
        "School": "NC State",
        "FG%": .500,
        "3P%": .380,
        "FT%": .700
    },
    advanced: {
        "Pace": 70.0,
        "FTr": .375,
        "3PAr": .400,
        "AST%": 50.0,
        "BLK%": 8.0,
        "TOV%": 12.0,
        "ORB%": 25.0
    }
}

export function simGame([t1, t1adv,], [t2, t2adv]) { // each team's normal and advanced stats
    let averagePace = Math.floor((t1adv["Pace"] + t2adv["Pace"]) / 2)
    let totalPosessions = (averagePace % 2 === 0 ? averagePace : averagePace - 1) * 2 // make even
   
    let t1stats = {
        points: 0,
        orebounds: 0,
        assists: 0,
        turnovers: 0,
        FGM: 0,
        FGA: 0,
        FTM: 0,
        FTA: 0,
        drebounds: 0,
        steals: 0,
        blocks: 0,
        pf: 0
    }
    
    let t2stats = {
        points: 0,
        orebounds: 0,
        assists: 0,
        turnovers: 0,
        FGM: 0,
        FGA: 0,
        FTM: 0,
        FTA: 0,
        drebounds: 0,
        steals: 0,
        blocks: 0,
        pf: 0
    }
    
    console.log("Start of first half")
    console.log("Tipoff")
    console.log(`${t1["School"]} has possession`)

    for (let pos = 0; pos <= totalPosessions; pos++) {   
        if (pos % 2 === 1) { // Team 1
            let [os, ds] = simPossession([t1, t1adv], [t2, t2adv])
            t1stats.points += os.points
            t1stats.orebounds += os.orebounds
            t1stats.assists += os.assists
            t1stats.turnovers += os.turnovers
            t1stats.FGM += os.FGM
            t1stats.FGA += os.FGA
            t1stats.FTM += os.FTM
            t1stats.FTA += os.FTA
            t2stats.drebounds += ds.drebounds
            t2stats.steals += ds.steals
            t2stats.blocks += ds.blocks
            t2stats.pf += ds.pf
        } else { // Team 2
            let [os, ds] = simPossession([t2, t2adv], [t1, t1adv])
            t2stats.points += os.points
            t2stats.orebounds += os.orebounds
            t2stats.assists += os.assists
            t2stats.turnovers += os.turnovers
            t2stats.FGM += os.FGM
            t2stats.FGA += os.FGA
            t2stats.FTM += os.FTM
            t2stats.FTA += os.FTA
            t1stats.drebounds += ds.drebounds
            t1stats.steals += ds.steals
            t1stats.blocks += ds.blocks
            t1stats.pf += ds.pf
        }
        if (pos === totalPosessions/20) {
            console.log("End of first half")
            console.log("Start of second half")
            console.log(`${t2["School"]} has possession`)
        }
    }

    console.log("End of second half")
   
    return [t1stats, t2stats, totalPosessions]
}

