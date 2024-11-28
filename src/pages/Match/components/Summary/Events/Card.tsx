import { CropPortraitOutlined, SportsSoccerOutlined } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    cardColor: 'yellow' | 'red'
    flexDirection: 'row' | 'row-reverse'
    player: string
}

const Card: FC<PropsType> = ({ cardColor, flexDirection, player }) => {
    return (
        <>
            <Stack direction={flexDirection} alignItems="center" gap="10px">
                <CropPortraitOutlined htmlColor={cardColor} />
                <Stack direction="column">
                    <Typography fontSize="16px">{player}</Typography>
                </Stack>
            </Stack>
        </>
    )
}

export default Card
