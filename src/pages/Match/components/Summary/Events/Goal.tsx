import { SportsSoccerOutlined, SwapVertOutlined } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    scorrer: string
    assister: string
    flexDirection: 'row' | 'row-reverse'
}

const Goal: FC<PropsType> = ({ scorrer, assister, flexDirection }) => {
    return (
        <>
            <Stack direction={flexDirection} alignItems='center' gap='10px'>
                <SportsSoccerOutlined/>
                <Stack direction="column">
                    <Typography fontSize='16px'>{scorrer}</Typography>
                    <Typography fontSize='14px' color='gray'>{assister}</Typography>
                </Stack>
            </Stack>
        </>
    )
}

export default Goal
