import { FC } from 'react'
import Vote from './Vote'
import { Match } from '../../../../core/types/matchesTypes'
import { Stack } from '@mui/material'
import Chat from './Chat'

type PropsType = {
    match: Match
    homeTeamName: string
    awayTeamName: string
}

const Discussions: FC<PropsType> = ({ match, homeTeamName, awayTeamName }) => {
    return (
        <Stack gap="10px" sx={{ height: '100%' }}>
            <Vote
                match={match}
                homeTeam={homeTeamName}
                awayTeam={awayTeamName}
            />
            <Chat matchId={match.id} />
        </Stack>
    )
}

export default Discussions
