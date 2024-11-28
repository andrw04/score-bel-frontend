import { FC } from 'react'
import { LineUpPlayer } from '../../../../core/types/matchesTypes'
import { Grid2, Paper, Typography } from '@mui/material'

const getPosition = (position: string) => {
    switch (position) {
        case 'gkp':
            return 'ВРТ'
        case 'def':
            return 'ЗАЩ'
        case 'mid':
            return 'ПЗЩ'
        case 'fwd':
            return 'НАП'
        default:
            return ''
    }
}

type PropsType = {
    player: LineUpPlayer
}

const PlayerItem: FC<PropsType> = ({ player }) => {
    return (
        <Paper elevation={2} sx={{ height: '50px', width: '100%' }}>
            <Grid2 display="flex" flexDirection="row" gap="20px" p="10px">
                <Typography width="20px">#{player.playerNumber}</Typography>
                <Typography>
                    {player.displayName} ({getPosition(player.position)})
                </Typography>
            </Grid2>
        </Paper>
    )
}

export default PlayerItem
