import { useGetMatchSummaryByIdQuery } from '../../../../core/api/matchesApi'
import { FC, useMemo } from 'react'
import { Match, MatchEvent } from '../../../../core/types/matchesTypes'
import Preloader from '../../../components/common/Preloader'
import { Stack } from '@mui/material'
import Event from './Event'
import camelcaseKeys from 'camelcase-keys'
import { camelCase } from 'lodash'

type PropsType = {
    matchId: string
    homeTeamName: string
    awayTeamName: string
}

const Summary: FC<PropsType> = ({ matchId, homeTeamName, awayTeamName }) => {
    const { data, isLoading } = useGetMatchSummaryByIdQuery(matchId)

    console.log(homeTeamName)

    const homeTeam = useMemo(() => {
        if (data === undefined) {
            return []
        }

        return data[camelCase(homeTeamName)]
    }, [data])

    const awayTeam = useMemo(() => {
        if (!data) {
            return []
        }

        return data[camelCase(awayTeamName)]
    }, [data])

    const events = useMemo(() => {
        const bothTeamEvents = homeTeam.reduce((result, item1) => {
            const match = awayTeam.find(
                (item2) => item1.minute === item2.minute
            )

            if (match) {
                result.push({
                    minute: item1.minute,
                    homeTeamEvent: item1,
                    awayTeamEvent: match,
                })
            }

            return result
        }, [] as Array<{ minute: number; homeTeamEvent: MatchEvent; awayTeamEvent: MatchEvent }>)

        const mappedHomeTeam = homeTeam.map((item) => ({
            minute: item.minute,
            homeTeamEvent: item,
            awayTeamEvent: undefined,
        }))

        const mappedAwayTeam = awayTeam.map((item) => ({
            minute: item.minute,
            homeTeamEvent: undefined,
            awayTeamEvent: item,
        }))

        return [...mappedHomeTeam, ...mappedAwayTeam, ...bothTeamEvents]
    }, [homeTeam, awayTeam])

    return (
        <>
            {isLoading && <Preloader />}
            {events && (
                <Stack gap="5px">
                    {events.sort((a,b) => a.minute - b.minute).map((event, index) => (
                        <Event
                            key={index}
                            homeTeamEvent={event.homeTeamEvent}
                            awayTeamEvent={event.awayTeamEvent}
                            minute={event.minute}
                        />
                    ))}
                </Stack>
            )}
        </>
    )
}

export default Summary
