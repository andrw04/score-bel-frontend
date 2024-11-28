import { Grid2, Paper, Typography } from '@mui/material'
import { MatchCard } from './MatchCard'
import { Match } from '../../../core/types/matchesTypes'
import _, { Dictionary } from 'lodash'
import { Team } from '../../../core/types/teamTypes'

type PropsType = {
    name: string
    matches: Match[]
    teams: Dictionary<Team>
}

const TournamentListItem: React.FC<PropsType> = ({ name, matches, teams }) => {
    return (
        <Paper elevation={0} sx={{padding: '10px'}}>
            <Typography variant="h4" gutterBottom>
                {name}
            </Typography>
            <Grid2 container spacing={2}>
                {matches && matches.map((match) => (
                    <MatchCard match={match} teams={teams}/>
                ))}
            </Grid2>
        </Paper>
    )
}

export default TournamentListItem
