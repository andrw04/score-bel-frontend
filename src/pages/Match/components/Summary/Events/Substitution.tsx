import { SwapVertOutlined } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    from: string
    to: string
    flexDirection: 'row' | 'row-reverse'
}

const Substitution: FC<PropsType> = ({ from, to, flexDirection }) => {
    return (
        <>
            <Stack direction={flexDirection} alignItems='center' gap='10px'>
                <SwapVertOutlined htmlColor='white'/>
                <Stack direction="column">
                    <Typography fontSize='16px'>{from}</Typography>
                    <Typography fontSize='14px' color='gray'>{to}</Typography>
                </Stack>
            </Stack>
        </>
    )
}

export default Substitution
