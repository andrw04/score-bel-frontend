import { Match } from '../../../core/types/matchesTypes'
import { Dictionary, keyBy } from 'lodash'
import { useGetTournamentsQuery } from '../../../core/api/tournamentsApi'
import { FC, useMemo } from 'react'
import TournamentListItem from './LeagueComponent'
import { Grid2, Paper } from '@mui/material'
import { useGetTeamsQuery } from '../../../core/api/teamsApi'

type Tournament = {
    name: string
    matches: Match[]
}

type TournamentProps = {
    leagues: Dictionary<Match[]>
}

const FootballLeagues: FC<TournamentProps> = ({ leagues }) => {
    const { data: rawTournaments } = useGetTournamentsQuery()

    const tournaments = useMemo(() => {
        if (!rawTournaments) {
            return []
        }

        return rawTournaments.results.map((result) => result)
    }, [rawTournaments])

    const {data: rawTeams} = useGetTeamsQuery()

    const teams = useMemo(() => {
        if (!rawTeams) {
            return {}
        }

        return keyBy(rawTeams.results, 'codeName')
    }, [rawTeams])

    return (
        <>
            <Grid2 display="flex" flexDirection="column" rowGap='10px'>
                {tournaments.map((key) => (
                    <TournamentListItem
                        name={key.name}
                        matches={leagues[key.codeName]}
                        teams={teams}
                    />
                ))}
            </Grid2>
        </>
    )
}

export default FootballLeagues
