import { FC } from 'react'
import { Team } from '../../../core/types/teamTypes'
import { Grid2 } from '@mui/material'

type PropsType = {
    team: string
}

const TeamView: FC<PropsType> = ({ team }) => {
    return (
        <Grid2
            display="flex"
            flexDirection="column"
            alignItems='center'
            justifyContent="center"
            width='200px'
            height='100px'

        >
            <img
                src={`https://official-flc.com/img/default-club-picture.png`}
                width="50"
                alt={`${team}`}
            />
            <span>{team}</span>
        </Grid2>
    )
}

export default TeamView
