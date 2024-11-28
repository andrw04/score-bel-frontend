import { FC, useMemo } from 'react'
import { useGetMatchesQuery } from '../../../core/api/matchesApi'
import { Grid2 } from '@mui/material'
import { MatchCard } from '../../Home/components/MatchCard'
import { useGetTeamsQuery } from '../../../core/api/teamsApi'
import { keyBy } from 'lodash'
import Preloader from '../../components/common/Preloader'

type PropsType = {
    tournament: string
}

const Fixtures: FC<PropsType> = ({ tournament }) => {
    const { data: rawMatches, isLoading: isMatchLoading } = useGetMatchesQuery({
        fullTime: false,
        tournament,
    })
    const { data: rawTeams, isLoading: isTeamsLoading } = useGetTeamsQuery()

    const matches = useMemo(() => {
        if (!rawMatches) {
            return []
        }

        return rawMatches.results
    }, [rawMatches])

    const teams = useMemo(() => {
        if (!rawTeams) {
            return {}
        }

        return keyBy(rawTeams.results, 'codeName')
    }, [rawTeams])

    const isLoading = isMatchLoading || isTeamsLoading

    return (
        <>
            {isLoading && <Preloader />}
            <Grid2 container spacing={2}>
                {matches.map((match) => (
                    <MatchCard match={match} teams={teams} />
                ))}
            </Grid2>
        </>
    )
}

export default Fixtures
