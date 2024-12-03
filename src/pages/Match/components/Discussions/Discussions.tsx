import { FC } from "react"
import Vote from "./Vote"
import { Match } from "../../../../core/types/matchesTypes"

type PropsType = {
    match: Match
    homeTeamName: string
    awayTeamName: string
}

const Discussions: FC<PropsType> = ({ match, homeTeamName, awayTeamName }) => {
    return (<Vote match={match} homeTeam={homeTeamName} awayTeam={awayTeamName}></Vote>)
}

export default Discussions