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
            plays.data.push({ team: bstats["School"], text: `made free throw ${i} of ${times}` })
            FTstats.FTM += 1
            FTstats.pts += 1
        } else {
            plays.data.push({ team: bstats["School"], text: `missed free throw ${i} of ${times}` })
        }
    }
    return FTstats
}

function simPossession([ot, otadv], [dt, dtadv]) {
    // each teams stats in this possession
    let ostats = { points: 0, orebounds: 0, assists: 0, turnovers: 0, FGM: 0, FGA: 0, TPM: 0, TPA: 0, FTM: 0, FTA: 0 }
    let dstats = { drebounds: 0, steals: 0, blocks: 0, pf: 0 }

    // amount of passes made during possesion
    let passes = random(0, 4)

    // chance to turnover during possesion
    let tov = prob(otadv["TOV%"] + passes - 5)
    if (tov) { // ball turned over
        ostats.turnovers += 1
        plays.data.push({ team: ot["School"], text: "turns the ball over" })
        let stl = prob(50)
        if (stl) {
            dstats.steals += 1
            plays.data.push({ team: dt["School"], text: "steals the ball" })
        }
        return [ostats, dstats]
    }

    // probability to shoot 2 or 3
    let fga3 = prob((otadv["3PAr"] * 100) - 2)

    // calculate if shot was made + fouls
    let fgm, pts
    let blk, ast, orb
    ostats.FGA += 1
    let foul = false
    if (!fga3) { // 2pt FGA
        plays.data.push({ team: ot["School"], text: "takes a shot from the field" })

        // chance for shot to be blocked
        blk = prob(dtadv["BLK%"])
        if (blk) {
            dstats.blocks += 1
            plays.data.push({ team: dt["School"], text: "blocks the shot" })
            return [ostats, dstats]
        }

        fgm = prob(ot["FG%"] * 100)
        pts = 2
        foul = prob((2 / otadv["FTr"]) * 4)
    } else { // 3pt FGA
        ostats.TPA += 1
        plays.data.push({ team: ot["School"], text: "takes a shot from beyond the arc" })

        fgm = prob(ot["3P%"] * 100)
        pts = 3
    }

    // if shot was made or missed...
    if (fgm) { // field goal made
        ostats.FGM += 1
        if (pts === 3) ostats.TPM += 1
        if (foul) {
            dstats.pf += 1
            plays.data.push({ team: ot["School"], text: "makes the shot and gets fouled" })
            let { FTM, FTA, pts } = simFT(ot, 1)
            ostats.FTM += FTM
            ostats.FTA += FTA
            ostats.points += pts
        } else {
            plays.data.push({ team: ot["School"], text: "makes the shot" })
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
            plays.data.push({ team: ot["School"], text: "misses the shot and gets fouled" })
            let { FTM, FTA, pts } = simFT(ot, 2)
            ostats.FTM += FTM
            ostats.FTA += FTA
            ostats.points += pts
            // return [ostats, dstats]
    } else {
            plays.data.push({ team: ot["School"], text: "misses the shot" })
        }

        // out of bounds
        let oob = prob(5)
        if (oob) {
            ostats.turnovers += 1
            plays.data.push({ team: ot["School"], text: "ball goes out of bounds" })
            return [ostats, dstats]
        }

        // add offensive rebounds
        orb = prob(otadv["ORB%"])
        if (orb) {
            plays.data.push({ team: ot["School"], text: "gets the rebound" })
            let [ros, rds] = simPossession([ot, otadv], [dt, dtadv])
            ros.orebounds += 1
            return [ros, rds]
        } else {
            dstats.drebounds += 1
            plays.data.push({ team: dt["School"], text: "gets the rebound" })
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
        TPM: 0,
        TPA: 0,
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
        TPM: 0,
        TPA: 0,
        FTM: 0,
        FTA: 0,
        drebounds: 0,
        steals: 0,
        blocks: 0,
        pf: 0
    }
    
    plays.data.push({ team: "Start of first half", text: `${t1["School"]} gets possession` })

    for (let pos = 0; pos <= totalPosessions; pos++) {   
        if (pos % 2 === 1) { // Team 1
            let [os, ds] = simPossession([t1, t1adv], [t2, t2adv])
            t1stats.points += os.points
            t1stats.orebounds += os.orebounds
            t1stats.assists += os.assists
            t1stats.turnovers += os.turnovers
            t1stats.FGM += os.FGM
            t1stats.FGA += os.FGA
            t1stats.TPM += os.TPM
            t1stats.TPA += os.TPA
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
            t2stats.TPM += os.TPM
            t2stats.TPA += os.TPA
            t2stats.FTM += os.FTM
            t2stats.FTA += os.FTA
            t1stats.drebounds += ds.drebounds
            t1stats.steals += ds.steals
            t1stats.blocks += ds.blocks
            t1stats.pf += ds.pf
        }
        if (pos === totalPosessions/2) {
            plays.data.push({ team: "End of first half", text: "" })
            plays.data.push({ team: "Start of second half", text: `${t1["School"]} gets possession` })
        }
    }

    plays.data.push({ team: "End of second half", text: "" })

    return [t1stats, t2stats, totalPosessions]
}

