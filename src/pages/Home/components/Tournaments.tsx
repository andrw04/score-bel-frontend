import { Match } from '../../../core/types/matchesTypes'
import { Dictionary, keyBy } from 'lodash'
import { useGetTournamentsQuery } from '../../../core/api/tournamentsApi'
import { FC, useMemo, useState } from 'react'
import TournamentListItem from './LeagueComponent'
import { Grid2, Paper, TextField } from '@mui/material'
import { useGetTeamsQuery } from '../../../core/api/teamsApi'

type TournamentProps = {
    leagues?: Dictionary<Match[]>
}

const FootballLeagues: FC<TournamentProps> = ({ leagues }) => {
    const { data: rawTournaments } = useGetTournamentsQuery()

    const tournaments = useMemo(() => {
        if (!rawTournaments) {
            return []
        }

        return rawTournaments.results.map((result) => result)
    }, [rawTournaments])

    const { data: rawTeams } = useGetTeamsQuery()

    const teams = useMemo(() => {
        if (!rawTeams) {
            return {}
        }

        return keyBy(rawTeams.results, 'codeName')
    }, [rawTeams])

    return (
        <>
            <Grid2 display="flex" flexDirection="column" rowGap="10px">
                {leagues && tournaments.map((key) => (
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
