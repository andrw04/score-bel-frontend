import { Grid2, Paper, Stack, Typography } from '@mui/material'
import { MatchEvent, MatchSummary } from '../../../../core/types/matchesTypes'
import { FC, ReactNode } from 'react'
import Goal from './Events/Goal'
import Card from './Events/Card'
import Substitution from './Events/Substitution'

const getEventComponent = (
    event: MatchEvent,
    flexDirection: 'row' | 'row-reverse'
) => {
    if (event.action === 'goal') {
        return (
            <Goal
                scorrer={event.majorEventPlayerName}
                assister={event.minorEventPlayerName!}
                flexDirection={flexDirection}
            />
        )
    } else if (event.action === 'yellow_card') {
        return (
            <Card
                cardColor="yellow"
                flexDirection={flexDirection}
                player={event.majorEventPlayerName}
            />
        )
    } else if (event.action === 'red_card') {
        return (
            <Card
                cardColor="red"
                flexDirection={flexDirection}
                player={event.majorEventPlayerName}
            />
        )
    } else {
        return (
            <Substitution
                from={event.majorEventPlayerName}
                to={event.minorEventPlayerName!}
                flexDirection={flexDirection}
            />
        )
    }
}

type PropsType = {
    homeTeamEvent?: MatchEvent
    awayTeamEvent?: MatchEvent
    minute: number
}

const Event: FC<PropsType> = ({ homeTeamEvent, awayTeamEvent, minute }) => {
    return (
        <Paper
            elevation={2}
            sx={{
                height: '50px',
                width: '100%',
            }}
        >
            <Stack direction="row" height='100%' alignItems='center'>
                <Grid2 width='40%'>
                    {homeTeamEvent &&
                        getEventComponent(homeTeamEvent, 'row-reverse')}
                </Grid2>
                <Grid2 width='20%' display='flex' justifyContent='center'>
                    <Typography>{minute}'</Typography>
                </Grid2>
                <Grid2 width='40%'>
                    {awayTeamEvent && getEventComponent(awayTeamEvent, 'row')}
                </Grid2>
            </Stack>
        </Paper>
    )
}

export default Event
