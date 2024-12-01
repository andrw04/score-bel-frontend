import { FC, useMemo } from 'react'
import { useGetMatchLineUpByIdQuery } from '../../../../core/api/matchesApi'
import Preloader from '../../../components/common/Preloader'
import { Match } from '../../../../core/types/matchesTypes'
import { Grid2, Stack, Typography } from '@mui/material'
import PlayerItem from './PlayerItem'
import { camelCase } from 'lodash'

type PropsType = {
    matchId: string
    homeTeamName: string
    awayTeamName: string
}

const LineUps: FC<PropsType> = ({ matchId, homeTeamName, awayTeamName }) => {
    const { data, isLoading: isLineUpsLoading } =
        useGetMatchLineUpByIdQuery(matchId)

    const homeTeam = useMemo(() => {
        if (data === undefined) {
            return {
                start: [],
                bench: [],
            }
        }

        return data[camelCase(homeTeamName)]
    }, [data])

    const awayTeam = useMemo(() => {
        if (!data) {
            return {
                start: [],
                bench: [],
            }
        }

        return data[camelCase(awayTeamName)]
    }, [data])

    return (
        <>
            {isLineUpsLoading && <Preloader />}
            <Stack gap="20px">
                <Typography variant="h5">Стартовый состав</Typography>
                <Stack direction="row" gap="20px">
                    <Stack width="100%" gap="20px">
                        {homeTeam?.start?.map((player, index) => (
                            <PlayerItem player={player} key={index} />
                        ))}
                    </Stack>
                    <Stack width="100%" gap="20px">
                        {awayTeam?.start?.map((player, index) => (
                            <PlayerItem player={player} key={index} />
                        ))}
                    </Stack>
                </Stack>
                <Typography variant="h5">Игроки в запасе</Typography>
                <Stack direction="row" gap="20px">
                    <Stack width="100%" gap="20px">
                        {homeTeam?.bench?.map((player, index) => (
                            <PlayerItem player={player} key={index} />
                        ))}
                    </Stack>
                    <Stack width="100%" gap="20px">
                        {awayTeam?.bench?.map((player, index) => (
                            <PlayerItem player={player} key={index} />
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default LineUps
