import {
    Grid2,
    IconButton,
    Paper,
    Typography,
} from '@mui/material'
import { Match } from '../../../core/types/matchesTypes'
import TeamView from './TeamView'
import Result from './Result'
import { ru } from 'date-fns/locale'
import { Team } from '../../../core/types/teamTypes'
import { Dictionary } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

type PropsType = {
    match: Match
    teams: Dictionary<Team>
    onClick?: () => void
}

export const MatchCard: React.FC<PropsType> = ({ match, teams, onClick }) => {
    const formattedTime = format(new Date(match.startTime), 'dd MMM HH:mm', {
        locale: ru,
    })

    const navigate = useNavigate()

    return (
        <IconButton
            disableRipple
            sx={{ width: '100%' }}
            onClick={() => {
                navigate(`/matches/${match.id}`)
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    padding: '10px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid2 display="flex" flexDirection="row" gap="20px">
                    <TeamView team={teams[match.homeTeam]?.name} />
                    <Grid2
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Result
                            homeTeamScore={match.homeTeamGoals}
                            awayTeamScore={match.awayTeamGoals}
                            isStarted={Boolean(match.fullTime)}
                        />

                        <Typography>{formattedTime}</Typography>
                    </Grid2>
                    <TeamView team={teams[match.awayTeam]?.name} />
                </Grid2>
            </Paper>
        </IconButton>
    )
}
