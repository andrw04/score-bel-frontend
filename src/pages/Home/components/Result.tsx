import { Typography } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    homeTeamScore: number
    awayTeamScore: number
}

const Result: FC<PropsType> = ({ homeTeamScore, awayTeamScore }) => {
    return (
        <Typography fontSize='48px'>
            {homeTeamScore} - {awayTeamScore}
        </Typography>
    )
}

export default Result
