import { FC } from 'react'
import { Team } from '../../../core/types/teamTypes'
import { Grid2 } from '@mui/material'

const defaultLogo = 'https://official-flc.com/img/default-club-picture.png'

type PropsType = {
    team: string
    logo?: string
}

const TeamView: FC<PropsType> = ({ team, logo }) => {
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
                src={logo ?? defaultLogo}
                width="80px"
                height="80px"
                alt={`${team}`}
            />
            <span>{team}</span>
        </Grid2>
    )
}

export default TeamView
