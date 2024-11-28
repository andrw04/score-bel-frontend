import { Typography } from '@mui/material'
import { FC } from 'react'

type PropsType = {
    homeTeamScore: number
    awayTeamScore: number
    isStarted: boolean
}

const Result: FC<PropsType> = ({ homeTeamScore, awayTeamScore, isStarted }) => {
    return (
        <Typography fontSize='48px'>
            {isStarted ? `${homeTeamScore} - ${awayTeamScore}` : 'Н/Д' }
        </Typography>
    )
}

export default Result
